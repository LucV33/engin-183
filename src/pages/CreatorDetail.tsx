import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/AppLayout";
import { ArrowLeft, MessageSquare, Send } from "lucide-react";
import OfferModal from "@/components/deals/OfferModal";
import { useState } from "react";

const CreatorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [offerOpen, setOfferOpen] = useState(false);

  const { data: creator, isLoading } = useQuery({
    queryKey: ["creator", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("creator_profiles")
        .select("*, profiles!creator_profiles_profile_fkey(display_name, avatar_url, bio)")
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

  const sendOfferMutation = useMutation({
    mutationFn: async (offer: { rate: number; deliverables: string; liveDate: string; usageRights: string[]; note: string }) => {
      if (!user || !creator) return;
      // Find or create conversation
      let convoId: string;
      const { data: existing } = await supabase
        .from("conversations")
        .select("id")
        .eq("brand_user_id", user.id)
        .eq("creator_user_id", creator.user_id)
        .maybeSingle();

      if (existing) {
        convoId = existing.id;
      } else {
        const { data: convo, error } = await supabase
          .from("conversations")
          .insert({ brand_user_id: user.id, creator_user_id: creator.user_id })
          .select()
          .single();
        if (error) throw error;
        convoId = convo.id;
      }

      // Create deal
      const { data: deal, error: dealErr } = await supabase
        .from("deals")
        .insert({ conversation_id: convoId, status: "negotiating" as any })
        .select()
        .single();
      if (dealErr) throw dealErr;

      // Create offer
      await supabase.from("deal_offers").insert({
        deal_id: deal.id,
        sender_id: user.id,
        rate: offer.rate,
        hourly_rate: 0,
        hours: 0,
        commission_percentage: 0,
        deliverables: offer.deliverables,
        live_date: offer.liveDate || null,
        usage_rights: offer.usageRights,
        note: offer.note || null,
        status: "pending",
      } as any);

      // Send message
      await supabase.from("messages").insert({
        conversation_id: convoId,
        sender_id: user.id,
        content: `New offer: $${offer.rate.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
        message_type: "offer",
        metadata: { offer_rate: offer.rate },
      });

      navigate(`/deals/${deal.id}`);
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

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
          <div className="flex gap-3 mt-4">
            <Button onClick={handleStartConversation}>
              <MessageSquare className="mr-2 h-4 w-4" /> Message
            </Button>
            {role === "brand" && (
              <Button variant="secondary" onClick={() => setOfferOpen(true)}>
                <Send className="mr-2 h-4 w-4" /> Send Offer
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <OfferModal
        open={offerOpen}
        onClose={() => setOfferOpen(false)}
        onSubmit={(o) => sendOfferMutation.mutate(o)}
        isPending={sendOfferMutation.isPending}
      />
    </AppLayout>
  );
};

export default CreatorDetail;
