import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { formatDistanceToNow } from "date-fns";

const Messages = () => {
  const { user, role } = useAuth();

  const { data: conversations, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select(`
          *,
          brand_profile:profiles!conversations_brand_user_id_fkey(display_name),
          creator_profile:profiles!conversations_creator_user_id_fkey(display_name),
          product:products(title)
        `)
        .order("last_message_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  return (
    <AppLayout>
      <h1 className="mb-6 text-2xl font-bold">Messages</h1>
      {isLoading ? (
        <p>Loading…</p>
      ) : conversations?.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No conversations yet.</p>
      ) : (
        <div className="space-y-2">
          {conversations?.map((c: any) => {
            const otherName = role === "brand"
              ? c.creator_profile?.display_name
              : c.brand_profile?.display_name;
            return (
              <Link key={c.id} to={`/messages/${c.id}`}>
                <Card className="transition-colors hover:bg-muted/50">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium text-foreground">{otherName || "User"}</p>
                      {c.product?.title && (
                        <p className="text-sm text-muted-foreground">Re: {c.product.title}</p>
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
