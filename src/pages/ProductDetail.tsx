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

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, profiles!products_brand_id_fkey(display_name, avatar_url)")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const handleStartConversation = async () => {
    if (!user || !product) return;
    // Check for existing conversation
    const { data: existing } = await supabase
      .from("conversations")
      .select("id")
      .eq("brand_user_id", product.brand_id)
      .eq("creator_user_id", user.id)
      .eq("product_id", product.id)
      .maybeSingle();

    if (existing) {
      navigate(`/messages/${existing.id}`);
      return;
    }

    const { data: convo, error } = await supabase
      .from("conversations")
      .insert({ brand_user_id: product.brand_id, creator_user_id: user.id, product_id: product.id })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    navigate(`/messages/${convo.id}`);
  };

  if (isLoading) return <AppLayout><p>Loading…</p></AppLayout>;
  if (!product) return <AppLayout><p>Product not found.</p></AppLayout>;

  return (
    <AppLayout>
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back
      </Button>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{product.title}</CardTitle>
              <p className="text-muted-foreground">by {(product as any).profiles?.display_name}</p>
            </div>
            {product.category && <Badge>{product.category}</Badge>}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">{product.description}</p>
          {(product.budget_min || product.budget_max) && (
            <p className="text-sm"><strong>Budget:</strong> ${product.budget_min} – ${product.budget_max}</p>
          )}
          {product.target_platforms && product.target_platforms.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <span className="text-sm font-medium mr-2">Platforms:</span>
              {product.target_platforms.map((p: string) => <Badge key={p} variant="outline">{p}</Badge>)}
            </div>
          )}
          {product.commission_info && <p className="text-sm"><strong>Commission:</strong> {product.commission_info}</p>}
          <Button onClick={handleStartConversation} className="mt-4">
            <MessageSquare className="mr-2 h-4 w-4" /> I'm Interested
          </Button>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default ProductDetail;
