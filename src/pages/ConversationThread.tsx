import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/AppLayout";
import OfferCard from "@/components/chat/OfferCard";
import SendOfferDialog from "@/components/chat/SendOfferDialog";
import DealStatusBar from "@/components/chat/DealStatusBar";
import SignatureDialog from "@/components/chat/SignatureDialog";
import ShippingForm from "@/components/chat/ShippingForm";
import ShippingTracker from "@/components/chat/ShippingTracker";
import { Send, HandshakeIcon, FileSignature, DollarSign, Truck, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const ConversationThread = () => {
  const { id } = useParams<{ id: string }>();
  const { user, role } = useAuth();
  const [message, setMessage] = useState("");
  const [showOfferDialog, setShowOfferDialog] = useState(false);
  const [showSignDialog, setShowSignDialog] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [counterOfferDefaults, setCounterOfferDefaults] = useState<{
    hourly_rate?: number;
    commission_percentage?: number;
    hours?: number;
  } | undefined>();
  const [isCounterOffer, setIsCounterOffer] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch conversation
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

  // Fetch messages
  const { data: messages, isLoading: messagesLoading } = useQuery({
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

  // Fetch deal for this conversation
  const { data: deal } = useQuery({
    queryKey: ["deal", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .eq("conversation_id", id!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // Fetch offers for the deal
  const { data: offers } = useQuery({
    queryKey: ["deal_offers", deal?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deal_offers")
        .select("*")
        .eq("deal_id", deal!.id)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!deal?.id,
  });

  // Fetch signatures for the deal
  const { data: signatures } = useQuery({
    queryKey: ["deal_signatures", deal?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deal_signatures")
        .select("*")
        .eq("deal_id", deal!.id);
      if (error) throw error;
      return data;
    },
    enabled: !!deal?.id,
  });

  // Fetch escrow for the deal
  const { data: escrow } = useQuery({
    queryKey: ["escrow", deal?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("escrow_payments")
        .select("*")
        .eq("deal_id", deal!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!deal?.id,
  });

  // Fetch shipments for the deal
  const { data: shipments } = useQuery({
    queryKey: ["shipments", deal?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("shipments")
        .select("*")
        .eq("deal_id", deal!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!deal?.id,
  });

  // Realtime subscription for messages
  useEffect(() => {
    if (!id) return;
    const channel = supabase
      .channel(`messages:${id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${id}` },
        (payload) => {
          queryClient.setQueryData(["messages", id], (old: any[] | undefined) => {
            if (!old) return [payload.new];
            if (old.find((m: any) => m.id === payload.new.id)) return old;
            return [...old, payload.new];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, queryClient]);

  // Realtime subscription for deal updates
  useEffect(() => {
    if (!id) return;
    const channel = supabase
      .channel(`deal:${id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "deals" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["deal", id] });
          queryClient.invalidateQueries({ queryKey: ["deal_offers", deal?.id] });
          queryClient.invalidateQueries({ queryKey: ["deal_signatures", deal?.id] });
          queryClient.invalidateQueries({ queryKey: ["escrow", deal?.id] });
          queryClient.invalidateQueries({ queryKey: ["shipments", deal?.id] });
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "deal_offers" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["deal_offers", deal?.id] });
          queryClient.invalidateQueries({ queryKey: ["deal", id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, deal?.id, queryClient]);

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send text message
  const sendMutation = useMutation({
    mutationFn: async (content: string) => {
      const { error } = await supabase.from("messages").insert({
        conversation_id: id!,
        sender_id: user!.id,
        content,
        message_type: "text",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setMessage("");
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  // Send offer
  const sendOfferMutation = useMutation({
    mutationFn: async (offerData: {
      hourly_rate: number;
      commission_percentage: number;
      hours: number;
      note: string;
    }) => {
      // Create deal if doesn't exist
      let dealId = deal?.id;
      if (!dealId) {
        const { data: newDeal, error: dealError } = await supabase
          .from("deals")
          .insert({ conversation_id: id! })
          .select()
          .single();
        if (dealError) throw dealError;
        dealId = newDeal.id;
      }

      // If countering, mark previous pending offers as countered
      if (isCounterOffer) {
        await supabase
          .from("deal_offers")
          .update({ status: "countered" as any })
          .eq("deal_id", dealId)
          .eq("status", "pending" as any);
      }

      // Create the offer
      const { data: newOffer, error: offerError } = await supabase
        .from("deal_offers")
        .insert({
          deal_id: dealId,
          sender_id: user!.id,
          hourly_rate: offerData.hourly_rate,
          commission_percentage: offerData.commission_percentage,
          hours: offerData.hours,
          note: offerData.note || null,
        })
        .select()
        .single();
      if (offerError) throw offerError;

      // Send a message referencing the offer
      await supabase.from("messages").insert({
        conversation_id: id!,
        sender_id: user!.id,
        content: isCounterOffer ? "Sent a counter offer" : "Sent an offer",
        message_type: "offer",
        metadata: { offer_id: newOffer.id },
      });
    },
    onSuccess: () => {
      setShowOfferDialog(false);
      setIsCounterOffer(false);
      setCounterOfferDefaults(undefined);
      queryClient.invalidateQueries({ queryKey: ["deal", id] });
      queryClient.invalidateQueries({ queryKey: ["deal_offers"] });
    },
    onError: (err: any) => {
      toast({ title: "Error sending offer", description: err.message, variant: "destructive" });
    },
  });

  // Accept offer
  const acceptOfferMutation = useMutation({
    mutationFn: async (offerId: string) => {
      const offer = offers?.find((o) => o.id === offerId);
      if (!offer || !deal) throw new Error("Offer not found");

      // Mark offer as accepted
      await supabase
        .from("deal_offers")
        .update({ status: "accepted" as any })
        .eq("id", offerId);

      // Mark any other pending offers as expired
      await supabase
        .from("deal_offers")
        .update({ status: "expired" as any })
        .eq("deal_id", deal.id)
        .eq("status", "pending" as any)
        .neq("id", offerId);

      // Update deal with agreed terms
      const total = offer.hourly_rate * offer.hours;
      await supabase
        .from("deals")
        .update({
          status: "agreed" as any,
          hourly_rate: offer.hourly_rate,
          commission_percentage: offer.commission_percentage,
          hours: offer.hours,
          total_amount: total,
        })
        .eq("id", deal.id);

      // System message
      await supabase.from("messages").insert({
        conversation_id: id!,
        sender_id: user!.id,
        content: `Offer accepted! $${offer.hourly_rate}/hr + ${offer.commission_percentage}% commission for ${offer.hours}h ($${total.toFixed(2)} total)`,
        message_type: "system",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deal", id] });
      queryClient.invalidateQueries({ queryKey: ["deal_offers"] });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  // Reject offer
  const rejectOfferMutation = useMutation({
    mutationFn: async (offerId: string) => {
      await supabase
        .from("deal_offers")
        .update({ status: "rejected" as any })
        .eq("id", offerId);

      await supabase.from("messages").insert({
        conversation_id: id!,
        sender_id: user!.id,
        content: "Offer declined",
        message_type: "system",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deal_offers"] });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  // Sign deal
  const signDealMutation = useMutation({
    mutationFn: async (fullName: string) => {
      if (!deal) throw new Error("No deal");

      await supabase.from("deal_signatures").insert({
        deal_id: deal.id,
        user_id: user!.id,
        full_name: fullName,
      });

      // Check if both parties have now signed
      const { data: sigs } = await supabase
        .from("deal_signatures")
        .select("*")
        .eq("deal_id", deal.id);

      const bothSigned = (sigs?.length || 0) >= 2;

      if (bothSigned) {
        await supabase
          .from("deals")
          .update({ status: "signed" as any })
          .eq("id", deal.id);

        await supabase.from("messages").insert({
          conversation_id: id!,
          sender_id: user!.id,
          content: "Both parties have signed the agreement!",
          message_type: "system",
        });
      } else {
        await supabase.from("messages").insert({
          conversation_id: id!,
          sender_id: user!.id,
          content: `${fullName} signed the agreement`,
          message_type: "system",
        });
      }
    },
    onSuccess: () => {
      setShowSignDialog(false);
      queryClient.invalidateQueries({ queryKey: ["deal", id] });
      queryClient.invalidateQueries({ queryKey: ["deal_signatures"] });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  // Fund escrow (brand action)
  const fundEscrowMutation = useMutation({
    mutationFn: async () => {
      if (!deal) throw new Error("No deal");

      await supabase.from("escrow_payments").insert({
        deal_id: deal.id,
        amount: deal.total_amount || 0,
        status: "funded" as any,
        funded_at: new Date().toISOString(),
      });

      await supabase
        .from("deals")
        .update({ status: "escrow_funded" as any })
        .eq("id", deal.id);

      await supabase.from("messages").insert({
        conversation_id: id!,
        sender_id: user!.id,
        content: `Escrow funded: $${deal.total_amount?.toFixed(2)}`,
        message_type: "system",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deal", id] });
      queryClient.invalidateQueries({ queryKey: ["escrow"] });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  // Add shipping
  const addShippingMutation = useMutation({
    mutationFn: async (data: { tracking_number: string; carrier: string }) => {
      if (!deal) throw new Error("No deal");

      await supabase.from("shipments").insert({
        deal_id: deal.id,
        tracking_number: data.tracking_number,
        carrier: data.carrier,
        status: "shipped" as any,
        shipped_at: new Date().toISOString(),
      });

      await supabase.from("messages").insert({
        conversation_id: id!,
        sender_id: user!.id,
        content: `Product shipped via ${data.carrier} (${data.tracking_number})`,
        message_type: "system",
      });
    },
    onSuccess: () => {
      setShowShippingForm(false);
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  // Mark live session started (creator action)
  const startSessionMutation = useMutation({
    mutationFn: async () => {
      if (!deal) throw new Error("No deal");

      await supabase
        .from("deals")
        .update({ status: "in_progress" as any })
        .eq("id", deal.id);

      await supabase.from("messages").insert({
        conversation_id: id!,
        sender_id: user!.id,
        content: "Live session started!",
        message_type: "system",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deal", id] });
    },
  });

  // Mark deal complete
  const completeDealMutation = useMutation({
    mutationFn: async () => {
      if (!deal) throw new Error("No deal");

      await supabase
        .from("deals")
        .update({ status: "completed" as any })
        .eq("id", deal.id);

      if (escrow) {
        await supabase
          .from("escrow_payments")
          .update({ status: "released" as any, released_at: new Date().toISOString() })
          .eq("id", escrow.id);
      }

      await supabase.from("messages").insert({
        conversation_id: id!,
        sender_id: user!.id,
        content: "Deal completed! Escrow funds released.",
        message_type: "system",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deal", id] });
      queryClient.invalidateQueries({ queryKey: ["escrow"] });
    },
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMutation.mutate(message.trim());
  };

  const handleCounter = (offer: any) => {
    setCounterOfferDefaults({
      hourly_rate: offer.hourly_rate,
      commission_percentage: offer.commission_percentage,
      hours: offer.hours,
    });
    setIsCounterOffer(true);
    setShowOfferDialog(true);
  };

  const otherName = role === "brand"
    ? (conversation as any)?.creator_profile?.display_name
    : (conversation as any)?.brand_profile?.display_name;

  const userSigned = signatures?.some((s) => s.user_id === user?.id);
  const otherSigned = signatures?.some((s) => s.user_id !== user?.id);

  // Determine available actions based on deal status
  const dealStatus = deal?.status;
  const canSign = dealStatus === "agreed" && !userSigned;
  const canFundEscrow = dealStatus === "signed" && role === "brand" && !escrow;
  const canStartSession = dealStatus === "escrow_funded" && role === "creator";
  const canShip = dealStatus === "in_progress" && role === "brand" && (!shipments || shipments.length === 0);
  const canComplete = dealStatus === "in_progress" && shipments && shipments.length > 0;

  // Build offer lookup map
  const offerMap = new Map<string, any>();
  offers?.forEach((o) => offerMap.set(o.id, o));

  const renderMessage = (msg: any) => {
    const isOwn = msg.sender_id === user?.id;

    if (msg.message_type === "system") {
      return (
        <div key={msg.id} className="flex justify-center my-2">
          <div className="rounded-full bg-muted px-4 py-1.5 text-xs text-muted-foreground text-center max-w-[80%]">
            {msg.content}
          </div>
        </div>
      );
    }

    if (msg.message_type === "offer") {
      const offerId = msg.metadata?.offer_id;
      const offer = offerId ? offerMap.get(offerId) : null;

      return (
        <div key={msg.id} className={cn("flex my-2", isOwn ? "justify-end" : "justify-start")}>
          {offer ? (
            <OfferCard
              offer={offer}
              isOwn={isOwn}
              onAccept={() => acceptOfferMutation.mutate(offer.id)}
              onReject={() => rejectOfferMutation.mutate(offer.id)}
              onCounter={() => handleCounter(offer)}
              isPending={acceptOfferMutation.isPending || rejectOfferMutation.isPending}
            />
          ) : (
            <div className={cn(
              "max-w-[70%] rounded-lg px-4 py-2 text-sm italic",
              isOwn ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
            )}>
              {msg.content}
            </div>
          )}
        </div>
      );
    }

    // Regular text message
    return (
      <div key={msg.id} className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
        <div className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2 text-sm",
          isOwn ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
        )}>
          <p>{msg.content}</p>
          <p className={cn(
            "text-[10px] mt-1",
            isOwn ? "text-primary-foreground/60" : "text-muted-foreground"
          )}>
            {format(new Date(msg.created_at), "h:mm a")}
          </p>
        </div>
      </div>
    );
  };

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
        </div>

        {/* Deal Status Bar */}
        {deal && (
          <div className="py-3 border-b border-border">
            <DealStatusBar
              status={deal.status}
              hourlyRate={deal.hourly_rate}
              commissionPercentage={deal.commission_percentage}
              hours={deal.hours}
              totalAmount={deal.total_amount}
            />
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {messagesLoading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : messages?.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No messages yet. Start the conversation!</p>
          ) : (
            messages?.map(renderMessage)
          )}

          {/* Shipping tracker inline */}
          {shipments && shipments.length > 0 && (
            <div className="flex justify-center my-2">
              <ShippingTracker shipment={shipments[0]} />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Action buttons for deal progression */}
        {(canSign || canFundEscrow || canStartSession || canShip || canComplete) && (
          <div className="flex gap-2 border-t border-border py-2 flex-wrap">
            {canSign && (
              <Button size="sm" variant="outline" onClick={() => setShowSignDialog(true)}>
                <FileSignature className="h-4 w-4 mr-1" /> Sign Agreement
              </Button>
            )}
            {canFundEscrow && (
              <Button size="sm" variant="outline" onClick={() => fundEscrowMutation.mutate()}>
                <DollarSign className="h-4 w-4 mr-1" /> Fund Escrow (${deal?.total_amount})
              </Button>
            )}
            {canStartSession && (
              <Button size="sm" variant="outline" onClick={() => startSessionMutation.mutate()}>
                <Package className="h-4 w-4 mr-1" /> Start Live Session
              </Button>
            )}
            {canShip && (
              <Button size="sm" variant="outline" onClick={() => setShowShippingForm(true)}>
                <Truck className="h-4 w-4 mr-1" /> Ship Product
              </Button>
            )}
            {canComplete && (
              <Button size="sm" onClick={() => completeDealMutation.mutate()}>
                Mark Complete & Release Escrow
              </Button>
            )}
          </div>
        )}

        {/* Input + Send Offer */}
        <form onSubmit={handleSend} className="flex gap-2 border-t border-border pt-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => {
              setIsCounterOffer(false);
              setCounterOfferDefaults(undefined);
              setShowOfferDialog(true);
            }}
            title="Send Offer"
          >
            <HandshakeIcon className="h-4 w-4" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={sendMutation.isPending || !message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Dialogs */}
      <SendOfferDialog
        open={showOfferDialog}
        onClose={() => {
          setShowOfferDialog(false);
          setIsCounterOffer(false);
          setCounterOfferDefaults(undefined);
        }}
        onSend={(data) => sendOfferMutation.mutate(data)}
        isPending={sendOfferMutation.isPending}
        defaultValues={counterOfferDefaults}
        isCounter={isCounterOffer}
      />

      {deal && (
        <SignatureDialog
          open={showSignDialog}
          onClose={() => setShowSignDialog(false)}
          onSign={(name) => signDealMutation.mutate(name)}
          isPending={signDealMutation.isPending}
          deal={{
            hourly_rate: deal.hourly_rate,
            commission_percentage: deal.commission_percentage,
            hours: deal.hours,
            total_amount: deal.total_amount,
          }}
          otherPartyName={otherName || "Other party"}
          otherPartySigned={!!otherSigned}
        />
      )}

      <ShippingForm
        open={showShippingForm}
        onClose={() => setShowShippingForm(false)}
        onSubmit={(data) => addShippingMutation.mutate(data)}
        isPending={addShippingMutation.isPending}
      />
    </AppLayout>
  );
};

export default ConversationThread;
