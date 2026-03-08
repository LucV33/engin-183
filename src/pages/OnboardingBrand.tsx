import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import ChipSelector from "@/components/onboarding/ChipSelector";
import ImageUploader from "@/components/onboarding/ImageUploader";
import MultiImageUploader from "@/components/onboarding/MultiImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Package, Search, Loader2 } from "lucide-react";

const INDUSTRY_OPTIONS = [
  "Beauty", "Fashion", "Food & Beverage", "Tech", "Sports", "Home",
  "Health", "Entertainment", "Gaming", "Pet", "Finance", "Other",
];

const OnboardingBrand = () => {
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  // Step 1
  const [brandName, setBrandName] = useState("");
  const [website, setWebsite] = useState("");
  const [industries, setIndustries] = useState<string[]>([]);

  // Step 2
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [campaignImages, setCampaignImages] = useState<{ file: File | null; previewUrl: string }[]>([]);
  const [bio, setBio] = useState("");

  useEffect(() => {
    // Load existing data for resume
    if (!user) return;
    const load = async () => {
      const { data: profile } = await supabase.from("profiles").select("onboarding_step, bio").eq("id", user.id).single();
      if (profile?.bio) setBio(profile.bio);
      if (profile?.onboarding_step) {
        const s = parseInt(profile.onboarding_step.replace("brand-", ""));
        if (s > 1 && s <= 3) setStep(s);
      }
      const { data: bp } = await supabase.from("brand_profiles").select("*").eq("user_id", user.id).single();
      if (bp) {
        setBrandName(bp.company_name || "");
        setWebsite(bp.website || "");
        setIndustries((bp as any).industries || []);
        if (bp.logo_url) setLogoPreview(bp.logo_url);
        if ((bp as any).campaign_images?.length) {
          setCampaignImages((bp as any).campaign_images.map((url: string) => ({ file: null, previewUrl: url })));
        }
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
    if (!user || !brandName.trim()) {
      toast({ title: "Brand name required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      // Upsert brand profile
      const { data: existing } = await supabase.from("brand_profiles").select("id").eq("user_id", user.id).single();
      if (existing) {
        await supabase.from("brand_profiles").update({
          company_name: brandName, website: website || null, industries: industries as any,
        }).eq("user_id", user.id);
      } else {
        await supabase.from("brand_profiles").insert({
          user_id: user.id, company_name: brandName, website: website || null, industries: industries as any,
        });
      }
      await supabase.from("profiles").update({ onboarding_step: "brand-2" }).eq("id", user.id);
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
      let logoUrl = logoPreview;
      if (logoFile) {
        logoUrl = await uploadImage(logoFile, "avatars", `brand-logos/${user.id}`);
      }
      const uploadedCampaign: string[] = [];
      for (let i = 0; i < campaignImages.length; i++) {
        const item = campaignImages[i];
        if (item.file) {
          const url = await uploadImage(item.file, "product-images", `campaign/${user.id}/${i}`);
          uploadedCampaign.push(url);
        } else {
          uploadedCampaign.push(item.previewUrl);
        }
      }
      await supabase.from("brand_profiles").update({
        logo_url: logoUrl, campaign_images: uploadedCampaign as any,
      }).eq("user_id", user.id);
      await supabase.from("profiles").update({ bio, onboarding_step: "brand-3" }).eq("id", user.id);
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
        supabase.from("profiles").update({ onboarding_step: "brand-3" }).eq("id", user!.id);
        setStep(3);
      }}
    >
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Brand Basics</h2>
            <p className="text-muted-foreground">Tell us about your brand</p>
          </div>
          <div className="space-y-2">
            <Label>Brand Name *</Label>
            <Input value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="Your brand name" className="min-h-[44px]" />
          </div>
          <div className="space-y-2">
            <Label>Website (optional)</Label>
            <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://yourbrand.com" className="min-h-[44px]" />
          </div>
          <div className="space-y-2">
            <Label>What industry are you in?</Label>
            <ChipSelector options={INDUSTRY_OPTIONS} selected={industries} onChange={setIndustries} />
          </div>
          <Button onClick={saveStep1} disabled={saving} className="w-full min-h-[44px]">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continue"}
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Brand Profile</h2>
            <p className="text-muted-foreground">Make your profile stand out</p>
          </div>
          <ImageUploader
            value={logoPreview}
            onChange={(file, url) => { setLogoFile(file); setLogoPreview(url); }}
            label="Brand Logo"
          />
          <MultiImageUploader
            value={campaignImages}
            onChange={setCampaignImages}
            max={3}
            label="Product / Campaign Images (up to 3)"
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Short Bio</Label>
              <span className="text-xs text-muted-foreground">{bio.length}/160</span>
            </div>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 160))}
              placeholder="Tell creators about your brand..."
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
            <h2 className="text-2xl font-bold text-foreground">What do you want to do first?</h2>
            <p className="text-muted-foreground">Pick your starting point</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              onClick={() => finish("/products/new")}
              className="group flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-xl border-2 border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10"
            >
              <Package className="h-10 w-10 text-primary" />
              <span className="text-lg font-semibold text-foreground">Upload a Product</span>
            </button>
            <button
              onClick={() => finish("/feed")}
              className="group flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-xl border-2 border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10"
            >
              <Search className="h-10 w-10 text-accent" />
              <span className="text-lg font-semibold text-foreground">Browse Creators</span>
            </button>
          </div>
        </div>
      )}
    </OnboardingLayout>
  );
};

export default OnboardingBrand;
