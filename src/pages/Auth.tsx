import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Code, Video, ShoppingBag } from "lucide-react";

const DEMO_ACCOUNTS = {
  creator: { email: "creator1@demo.com", password: "demo1234", label: "Creator (Sarah Chen)" },
  brand: { email: "brand1@demo.com", password: "demo1234", label: "Brand (GlowUp Beauty)" },
};

const Auth = () => {
  const { user, onboardingCompleted, loading, signUp, signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [tab, setTab] = useState<string>("signup");
  const [devMode, setDevMode] = useState(false);
  const [devPassword, setDevPassword] = useState("");
  const [devUnlocked, setDevUnlocked] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate(onboardingCompleted ? "/feed" : "/onboarding/role", { replace: true });
    }
  }, [user, loading, onboardingCompleted, navigate]);

  const handleGoogle = async () => {
    setSubmitting(true);
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (error) {
      toast({ title: "Error", description: String(error), variant: "destructive" });
      setSubmitting(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      toast({ title: "Name required", description: "Please enter your name.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await signUp(email, password, displayName);
      toast({ title: "Check your email", description: "We sent you a verification link." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signIn(email, password);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };
  const handleDevLogin = async (role: "creator" | "brand") => {
    setSubmitting(true);
    try {
      // Generate a unique test email each time
      const timestamp = Date.now();
      const testEmail = `test-${role}-${timestamp}@dev.local`;
      const testPassword = "devtest1234";

      // Sign up with auto-confirm enabled — account is immediately active
      const { error: signUpError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: { display_name: `Test ${role.charAt(0).toUpperCase() + role.slice(1)}` },
        },
      });
      if (signUpError) throw signUpError;

      // Small delay to let the trigger create the profile
      await new Promise((r) => setTimeout(r, 500));

      // Navigate to onboarding
      navigate("/onboarding/role");
    } catch (err: any) {
      toast({ title: "Dev login failed", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDevUnlock = () => {
    if (devPassword === "123") {
      setDevUnlocked(true);
    } else {
      toast({ title: "Wrong password", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <Link to="/" className="mb-8 text-2xl font-bold text-foreground">🤩 gmv.live</Link>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to VibeHost</CardTitle>
          <CardDescription>Connect brands with creators for TikTok Live shopping</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            onClick={handleGoogle}
            disabled={submitting}
            variant="outline"
            className="w-full min-h-[48px] text-base gap-3"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="login">Log In</TabsTrigger>
            </TabsList>

            <TabsContent value="signup">
              <form onSubmit={handleEmailSignUp} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Name</Label>
                  <Input
                    id="signup-name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="min-h-[44px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="min-h-[44px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="min-h-[44px]"
                  />
                </div>
                <Button type="submit" disabled={submitting} className="w-full min-h-[44px]">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="login">
              <form onSubmit={handleEmailSignIn} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="min-h-[44px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="min-h-[44px]"
                  />
                </div>
                <Button type="submit" disabled={submitting} className="w-full min-h-[44px]">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Log In"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dev Tool */}
      <Card className="w-full max-w-md mt-4 border-dashed border-muted-foreground/30">
        {!devMode ? (
          <CardContent className="flex justify-center py-3">
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1" onClick={() => setDevMode(true)}>
              <Code className="h-3 w-3" /> Dev Access
            </Button>
          </CardContent>
        ) : !devUnlocked ? (
          <CardContent className="space-y-3 pt-4">
            <p className="text-sm font-medium text-muted-foreground text-center">Enter dev password</p>
            <div className="flex gap-2">
              <Input
                type="password"
                value={devPassword}
                onChange={(e) => setDevPassword(e.target.value)}
                placeholder="Password"
                onKeyDown={(e) => e.key === "Enter" && handleDevUnlock()}
                className="flex-1"
              />
              <Button size="sm" onClick={handleDevUnlock}>Unlock</Button>
            </div>
          </CardContent>
        ) : (
          <CardContent className="space-y-3 pt-4">
            <p className="text-sm font-medium text-center text-muted-foreground">Quick login as…</p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="flex flex-col items-center gap-1 h-auto py-3"
                onClick={() => handleDevLogin("creator")}
                disabled={submitting}
              >
                <Video className="h-5 w-5 text-primary" />
                <span className="text-xs">Creator</span>
                <span className="text-[10px] text-muted-foreground">Sarah Chen</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-1 h-auto py-3"
                onClick={() => handleDevLogin("brand")}
                disabled={submitting}
              >
                <ShoppingBag className="h-5 w-5 text-primary" />
                <span className="text-xs">Brand</span>
                <span className="text-[10px] text-muted-foreground">GlowUp Beauty</span>
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default Auth;
