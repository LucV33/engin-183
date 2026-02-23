import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/AppLayout";
import { ArrowLeft, MessageSquare } from "lucide-react";

const CreatorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: creator, isLoading } = useQuery({
    queryKey: ["creator", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("creator_profiles")
        .select("*, profiles!creator_profiles_user_id_fkey(display_name, avatar_url, bio)")
        .eq("user_id", id!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const handleStartConversation = async () => {
    if (!user || !creator) return;
    const { data: existing } = await supabase
      .from("conversations")
      .select("id")
      .eq("brand_user_id", user.id)
      .eq("creator_user_id", creator.user_id)
      .maybeSingle();

    if (existing) {
      navigate(`/messages/${existing.id}`);
      return;
    }

    const { data: convo, error } = await supabase
      .from("conversations")
      .insert({ brand_user_id: user.id, creator_user_id: creator.user_id })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    navigate(`/messages/${convo.id}`);
  };

  if (isLoading) return <AppLayout><p>Loading…</p></AppLayout>;
  if (!creator) return <AppLayout><p>Creator not found.</p></AppLayout>;

  return (
    <AppLayout>
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{(creator as any).profiles?.display_name}</CardTitle>
          <p className="text-muted-foreground">{creator.location}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{(creator as any).profiles?.bio}</p>
          <div className="flex flex-wrap gap-2">
            {creator.niches?.map((n: string) => <Badge key={n}>{n}</Badge>)}
            {creator.platforms?.map((p: string) => <Badge key={p} variant="outline">{p}</Badge>)}
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div><strong>Followers</strong><br />{creator.follower_count?.toLocaleString()}</div>
            <div><strong>Avg GMV</strong><br />${Number(creator.avg_gmv).toLocaleString()}</div>
            <div><strong>Rating</strong><br />{Number(creator.rating).toFixed(1)}/5</div>
          </div>
          <Button onClick={handleStartConversation} className="mt-4">
            <MessageSquare className="mr-2 h-4 w-4" /> Message Creator
          </Button>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default CreatorDetail;
