import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const BrandFeed = () => {
  const [search, setSearch] = useState("");

  const { data: creators, isLoading } = useQuery({
    queryKey: ["creators", search],
    queryFn: async () => {
      let q = supabase
        .from("creator_profiles")
        .select("*, profiles!creator_profiles_user_id_fkey(display_name, avatar_url, bio)")
        .order("created_at", { ascending: false });

      if (search) {
        q = q.or(`niches.cs.{${search}},location.ilike.%${search}%`);
      }

      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Browse Creators</h1>
        <p className="text-muted-foreground">Find the perfect host for your products</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by niche, location…"
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
      ) : creators?.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No creators found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {creators?.map((creator: any) => (
            <Card key={creator.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">{creator.profiles?.display_name || "Creator"}</CardTitle>
                <p className="text-sm text-muted-foreground">{creator.location}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-4">
                <p className="line-clamp-2 text-sm text-muted-foreground">{creator.profiles?.bio}</p>
                <div className="flex flex-wrap gap-1">
                  {creator.niches?.slice(0, 3).map((n: string) => (
                    <Badge key={n} variant="secondary" className="text-xs">{n}</Badge>
                  ))}
                  {creator.platforms?.slice(0, 2).map((p: string) => (
                    <Badge key={p} variant="outline" className="text-xs">{p}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {creator.follower_count?.toLocaleString()} followers
                  </span>
                  <Button size="sm" asChild>
                    <Link to={`/creators/${creator.user_id}`}>View Profile</Link>
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

export default BrandFeed;
