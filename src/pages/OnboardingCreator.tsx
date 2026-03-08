import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import ChipSelector from "@/components/onboarding/ChipSelector";
import ImageUploader from "@/components/onboarding/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Pencil, Loader2 } from "lucide-react";

const PLATFORM_OPTIONS = ["TikTok", "Instagram", "YouTube"];
const NICHE_OPTIONS = [
  "Beauty", "Fashion", "Lifestyle", "Food", "Gaming", "Fitness",
  "Comedy", "Tech", "Travel", "Education", "Finance", "Other",
];
const AUDIENCE_OPTIONS = ["Gen Z", "Millennials", "Parents", "Professionals", "Mixed"];

const OnboardingCreator = () => {
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  // Step 1
  const [displayName, setDisplayName] = useState("");
  const [platforms, setPlatforms] = useState<string[]>(["TikTok"]);
  const [tiktokHandle, setTiktokHandle] = useState("");

  // Step 2
  const [niches, setNiches] = useState<string[]>([]);
  const [audience, setAudience] = useState<string[]>([]);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (profile) {
        setDisplayName(profile.display_name || "");
        setBio(profile.bio || "");
        if (profile.avatar_url) setAvatarPreview(profile.avatar_url);
        if (profile.onboarding_step) {
          const s = parseInt(profile.onboarding_step.replace("creator-", ""));
          if (s > 1 && s <= 3) setStep(s);
        }
      }
      const { data: cp } = await supabase.from("creator_profiles").select("*").eq("user_id", user.id).single();
      if (cp) {
        setPlatforms(cp.platforms || ["TikTok"]);
        setNiches(cp.niches || []);
        if ((cp as any).tiktok_handle) setTiktokHandle((cp as any).tiktok_handle);
        if ((cp as any).instagram_handle) setInstagramHandle((cp as any).instagram_handle);
        if ((cp as any).youtube_handle) setYoutubeHandle((cp as any).youtube_handle);
        if ((cp as any).twitter_handle) setTwitterHandle((cp as any).twitter_handle);
        if ((cp as any).facebook_handle) setFacebookHandle((cp as any).facebook_handle);
        if ((cp as any).audience_type) setAudience([(cp as any).audience_type]);
      }
    };
    load();
  }, [user]);

  const uploadImage = async (file: File, bucket: string, path: string): Promise<string> => {
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  };

  const saveStep1 = async () => {
    if (!user || !displayName.trim()) {
      toast({ title: "Display name required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      await supabase.from("profiles").update({ display_name: displayName, onboarding_step: "creator-2" }).eq("id", user.id);
      const { data: existing } = await supabase.from("creator_profiles").select("id").eq("user_id", user.id).single();
      const payload = { platforms, tiktok_handle: tiktokHandle || null } as any;
      if (existing) {
        await supabase.from("creator_profiles").update(payload).eq("user_id", user.id);
      } else {
        await supabase.from("creator_profiles").insert({ user_id: user.id, ...payload });
      }
      setStep(2);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const saveStep2 = async () => {
    if (!user) return;
    setSaving(true);
    try {
      let avatarUrl = avatarPreview;
      if (avatarFile) {
        avatarUrl = await uploadImage(avatarFile, "avatars", `creators/${user.id}`);
      }
      await supabase.from("profiles").update({
        bio, avatar_url: avatarUrl, onboarding_step: "creator-3",
      }).eq("id", user.id);
      await supabase.from("creator_profiles").update({
        niches, audience_type: audience[0] || null,
      } as any).eq("user_id", user.id);
      setStep(3);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const finish = async (destination: string) => {
    if (!user) return;
    await supabase.from("profiles").update({ onboarding_completed: true, onboarding_step: null }).eq("id", user.id);
    await refreshProfile();
    navigate(destination, { replace: true });
  };

  return (
    <OnboardingLayout
      currentStep={step}
      totalSteps={3}
      showSkip={step === 2}
      onSkip={() => {
        supabase.from("profiles").update({ onboarding_step: "creator-3" }).eq("id", user!.id);
        setStep(3);
      }}
    >
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Creator Basics</h2>
            <p className="text-muted-foreground">Set up your creator profile</p>
          </div>
          <div className="space-y-2">
            <Label>Display Name / Handle *</Label>
            <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your creator name" className="min-h-[44px]" />
          </div>
          <div className="space-y-2">
            <Label>Platforms</Label>
            <ChipSelector options={PLATFORM_OPTIONS} selected={platforms} onChange={setPlatforms} />
          </div>
          <div className="space-y-2">
            <Label>TikTok Handle</Label>
            <Input value={tiktokHandle} onChange={(e) => setTiktokHandle(e.target.value)} placeholder="@yourhandle" className="min-h-[44px]" />
          </div>
          <Button onClick={saveStep1} disabled={saving} className="w-full min-h-[44px]">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continue"}
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Your Vibe</h2>
            <p className="text-muted-foreground">Help brands understand your content</p>
          </div>
          <div className="space-y-2">
            <Label>What content do you make?</Label>
            <ChipSelector options={NICHE_OPTIONS} selected={niches} onChange={setNiches} />
          </div>
          <div className="space-y-2">
            <Label>What's your typical audience?</Label>
            <ChipSelector options={AUDIENCE_OPTIONS} selected={audience} onChange={setAudience} multiSelect={false} />
          </div>
          <ImageUploader
            value={avatarPreview}
            onChange={(file, url) => { setAvatarFile(file); setAvatarPreview(url); }}
            circular
            label="Profile Photo"
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Short Bio</Label>
              <span className="text-xs text-muted-foreground">{bio.length}/160</span>
            </div>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 160))}
              placeholder="Tell brands about yourself..."
              className="min-h-[80px] resize-none"
              maxLength={160}
            />
          </div>
          <Button onClick={saveStep2} disabled={saving} className="w-full min-h-[44px]">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continue"}
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">You're all set! 🎉</h2>
            <p className="text-muted-foreground">What would you like to do first?</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              onClick={() => finish("/feed")}
              className="group flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-xl border-2 border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10"
            >
              <Search className="h-10 w-10 text-primary" />
              <span className="text-lg font-semibold text-foreground">Browse Brand Deals</span>
            </button>
            <button
              onClick={() => finish("/settings/profile")}
              className="group flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-xl border-2 border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10"
            >
              <Pencil className="h-10 w-10 text-accent" />
              <span className="text-lg font-semibold text-foreground">Complete My Profile</span>
            </button>
          </div>
        </div>
      )}
    </OnboardingLayout>
  );
};

export default OnboardingCreator;
