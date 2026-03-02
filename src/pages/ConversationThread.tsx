import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/AppLayout";
import { Send, RefreshCw, MessageCircle } from "lucide-react";
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
          brand_profile:profiles!conversations_brand_profile_fkey(display_name),
          creator_profile:profiles!conversations_creator_profile_fkey(display_name),
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

  const suggestedFirstMessages = role === "brand"
    ? [
        "Hi! I'd love to work with you on a live stream for our product. Here's a quick brief — let me know your rate and availability.",
        "We're looking for a host for our upcoming campaign. Can you share your rates and which platforms you go live on?",
        "I've attached our product details. Would you be interested in hosting a live shopping session?",
      ]
    : [
        "Hi! I'd love to learn more about this opportunity. Can you share the product details and timeline?",
        "I'm interested in hosting this. Here's my rate and availability — let me know if it works.",
        "Thanks for reaching out! I have experience with live shopping on TikTok/Instagram. What are you looking for in terms of format and dates?",
      ];

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
            <div className="space-y-4">
              <p className="text-center text-muted-foreground">No messages yet. Say hello — or try one of these:</p>
              <div className="flex flex-col gap-2 max-w-md mx-auto">
                <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <MessageCircle className="h-3.5 w-3.5" /> Suggested ways to start
                </p>
                {suggestedFirstMessages.map((text, i) => (
                  <Button
                    key={i}
                    type="button"
                    variant="outline"
                    className="h-auto py-3 px-4 text-left text-sm font-normal whitespace-normal justify-start"
                    onClick={() => sendMutation.mutate(text)}
                    disabled={sendMutation.isPending}
                  >
                    {text}
                  </Button>
                ))}
              </div>
            </div>
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
