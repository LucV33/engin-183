import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { formatDistanceToNow } from "date-fns";

const dealStatusLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  negotiating: { label: "Negotiating", variant: "outline" },
  agreed: { label: "Agreed", variant: "secondary" },
  signed: { label: "Signed", variant: "secondary" },
  escrow_funded: { label: "Funded", variant: "default" },
  in_progress: { label: "In Progress", variant: "default" },
  completed: { label: "Completed", variant: "secondary" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

const Messages = () => {
  const { user, role } = useAuth();

  const { data: conversations, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select(`
          *,
          brand_profile:profiles!conversations_brand_profile_fkey(display_name),
          creator_profile:profiles!conversations_creator_profile_fkey(display_name),
          product:products(title)
        `)
        .order("last_message_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch all deals for conversations to show status badges
  const conversationIds = conversations?.map((c) => c.id) || [];
  const { data: deals } = useQuery({
    queryKey: ["deals-list", conversationIds],
    queryFn: async () => {
      if (conversationIds.length === 0) return [];
      const { data, error } = await supabase
        .from("deals")
        .select("id, conversation_id, status")
        .in("conversation_id", conversationIds);
      if (error) throw error;
      return data;
    },
    enabled: conversationIds.length > 0,
  });

  const dealMap = new Map<string, any>();
  deals?.forEach((d) => dealMap.set(d.conversation_id, d));

  return (
    <AppLayout>
      <h1 className="mb-6 text-2xl font-bold">Messages</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : conversations?.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No conversations yet.</p>
      ) : (
        <div className="space-y-2">
          {conversations?.map((c: any) => {
            const otherName = role === "brand"
              ? c.creator_profile?.display_name
              : c.brand_profile?.display_name;
            const deal = dealMap.get(c.id);
            const statusInfo = deal ? dealStatusLabels[deal.status] : null;

            return (
              <Link key={c.id} to={`/messages/${c.id}`}>
                <Card className="transition-colors hover:bg-muted/50">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium text-foreground">{otherName || "User"}</p>
                        {c.product?.title && (
                          <p className="text-sm text-muted-foreground">Re: {c.product.title}</p>
                        )}
                      </div>
                      {statusInfo && (
                        <Badge variant={statusInfo.variant} className="text-xs">
                          {statusInfo.label}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {c.last_message_at && formatDistanceToNow(new Date(c.last_message_at), { addSuffix: true })}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </AppLayout>
  );
};

export default Messages;
