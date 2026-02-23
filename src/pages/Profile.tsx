import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppLayout from "@/components/AppLayout";

const Profile = () => {
  const { user, role } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .single();
      return data;
    },
    enabled: !!user,
  });

  const { data: extended } = useQuery({
    queryKey: ["my-extended-profile"],
    queryFn: async () => {
      if (role === "creator") {
        const { data } = await supabase.from("creator_profiles").select("*").eq("user_id", user!.id).single();
        return data;
      } else {
        const { data } = await supabase.from("brand_profiles").select("*").eq("user_id", user!.id).single();
        return data;
      }
    },
    enabled: !!user && !!role,
  });

  return (
    <AppLayout>
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <Badge variant="secondary" className="w-fit capitalize">{role}</Badge>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p><strong>Name:</strong> {profile?.display_name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          {profile?.bio && <p><strong>Bio:</strong> {profile.bio}</p>}
          {role === "creator" && extended && (
            <>
              <p><strong>Niches:</strong> {(extended as any).niches?.join(", ")}</p>
              <p><strong>Platforms:</strong> {(extended as any).platforms?.join(", ")}</p>
              <p><strong>Followers:</strong> {(extended as any).follower_count?.toLocaleString()}</p>
              <p><strong>Location:</strong> {(extended as any).location}</p>
            </>
          )}
          {role === "brand" && extended && (
            <>
              <p><strong>Company:</strong> {(extended as any).company_name}</p>
              <p><strong>Website:</strong> {(extended as any).website}</p>
              <p><strong>Industry:</strong> {(extended as any).industry}</p>
            </>
          )}
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Profile;
