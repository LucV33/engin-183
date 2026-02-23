import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const CreatorFeed = () => {
  const [search, setSearch] = useState("");

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", search],
    queryFn: async () => {
      let q = supabase
        .from("products")
        .select("*, profiles!products_brand_profile_fkey(display_name, avatar_url)")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (search) {
        q = q.or(`title.ilike.%${search}%,category.ilike.%${search}%,description.ilike.%${search}%`);
      }

      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Browse Products</h1>
        <p className="text-muted-foreground">Find products to promote on your live streams</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by title, category…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader><div className="h-5 w-2/3 rounded bg-muted" /></CardHeader>
              <CardContent><div className="h-4 w-full rounded bg-muted" /></CardContent>
            </Card>
          ))}
        </div>
      ) : products?.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No products found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products?.map((product: any) => (
            <Card key={product.id} className="flex flex-col overflow-hidden">
              {product.images?.[0] && (
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{product.title}</CardTitle>
                  {product.category && <Badge variant="secondary">{product.category}</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">
                  by {product.profiles?.display_name || "Unknown Brand"}
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-3">
                <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                {product.commission_info && (
                  <p className="text-sm font-medium text-primary">{product.commission_info}</p>
                )}
                <div className="flex items-center justify-between">
                  {(product.budget_min || product.budget_max) && (
                    <span className="text-sm font-medium text-foreground">
                      ${product.budget_min ?? "?"} – ${product.budget_max ?? "?"}
                    </span>
                  )}
                  <Button size="sm" asChild>
                    <Link to={`/products/${product.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatorFeed;
