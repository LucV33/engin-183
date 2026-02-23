import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Plus } from "lucide-react";

const MyProducts = () => {
  const { user } = useAuth();

  const { data: products, isLoading } = useQuery({
    queryKey: ["my-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("brand_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  return (
    <AppLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Products</h1>
        <Button asChild><Link to="/products/new"><Plus className="mr-1 h-4 w-4" /> Add Product</Link></Button>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p>Loading…</p>
        ) : products?.length === 0 ? (
          <p className="col-span-full py-12 text-center text-muted-foreground">No products yet. Add your first one!</p>
        ) : (
          products?.map((p: any) => (
            <Card key={p.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{p.title}</CardTitle>
                  <Badge variant={p.status === "active" ? "default" : "secondary"}>{p.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </AppLayout>
  );
};

export default MyProducts;
