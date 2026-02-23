import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/AppLayout";
import { Send, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const ConversationThread = () => {
  const { id } = useParams<{ id: string }>();
  const { user, role } = useAuth();
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: conversation } = useQuery({
    queryKey: ["conversation", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select(`
          *,
          brand_profile:profiles!conversations_brand_user_id_fkey(display_name),
          creator_profile:profiles!conversations_creator_user_id_fkey(display_name),
          product:products(title)
        `)
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: messages, isLoading, refetch } = useQuery({
    queryKey: ["messages", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", id!)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const sendMutation = useMutation({
    mutationFn: async (content: string) => {
      const { error } = await supabase.from("messages").insert({
        conversation_id: id!,
        sender_id: user!.id,
        content,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["messages", id] });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMutation.mutate(message.trim());
  };

  const otherName = role === "brand"
    ? (conversation as any)?.creator_profile?.display_name
    : (conversation as any)?.brand_profile?.display_name;

  return (
    <AppLayout>
      <div className="flex flex-col" style={{ height: "calc(100vh - 8rem)" }}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h2 className="text-lg font-semibold">{otherName || "Conversation"}</h2>
            {(conversation as any)?.product?.title && (
              <p className="text-sm text-muted-foreground">Re: {(conversation as any).product.title}</p>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={() => refetch()} title="Refresh">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {isLoading ? (
            <p className="text-center text-muted-foreground">Loading…</p>
          ) : messages?.length === 0 ? (
            <p className="text-center text-muted-foreground">No messages yet. Say hello!</p>
          ) : (
            messages?.map((msg: any) => {
              const isOwn = msg.sender_id === user?.id;
              return (
                <div key={msg.id} className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[70%] rounded-lg px-4 py-2 text-sm",
                    isOwn ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  )}>
                    {msg.content}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="flex gap-2 border-t border-border pt-3">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message…"
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={sendMutation.isPending || !message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </AppLayout>
  );
};

export default ConversationThread;
