import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const creators = [
    { email: "sarah@demo.com", password: "demo1234", display_name: "Sarah Chen", role: "creator", bio: "Top TikTok live seller with 3 years experience in beauty and skincare. Known for high engagement rates and authentic product reviews.", niches: ["Beauty", "Skincare"], platforms: ["TikTok", "Instagram"], follower_count: 250000, avg_gmv: 15000, rating: 4.8, location: "Los Angeles, CA" },
    { email: "marcus@demo.com", password: "demo1234", display_name: "Marcus Johnson", role: "creator", bio: "Tech reviewer and live shopping host. Specializing in gadgets, electronics, and smart home products.", niches: ["Tech", "Gaming"], platforms: ["YouTube", "TikTok"], follower_count: 180000, avg_gmv: 22000, rating: 4.6, location: "Austin, TX" },
    { email: "jessica@demo.com", password: "demo1234", display_name: "Jessica Rivera", role: "creator", bio: "Fashion and lifestyle creator. I bring energy and fun to every live stream. My audience loves discovering new brands!", niches: ["Fashion", "Lifestyle"], platforms: ["Instagram", "TikTok", "Amazon Live"], follower_count: 420000, avg_gmv: 35000, rating: 4.9, location: "Miami, FL" },
    { email: "david@demo.com", password: "demo1234", display_name: "David Kim", role: "creator", bio: "Fitness and wellness live host. I help brands connect with health-conscious consumers through engaging live demonstrations.", niches: ["Fitness", "Home"], platforms: ["YouTube", "Facebook"], follower_count: 95000, avg_gmv: 8000, rating: 4.3, location: "Seattle, WA" },
    { email: "emma@demo.com", password: "demo1234", display_name: "Emma Thompson", role: "creator", bio: "Pet product specialist and animal lover. My community trusts my recommendations for their furry friends.", niches: ["Pets", "Lifestyle"], platforms: ["TikTok", "Instagram"], follower_count: 310000, avg_gmv: 12000, rating: 4.7, location: "Denver, CO" },
  ];

  const brands = [
    { email: "brand1@demo.com", password: "demo1234", display_name: "GlowUp Beauty", role: "brand", company_name: "GlowUp Beauty Co.", website: "https://glowupbeauty.com", industry: "Beauty & Skincare" },
    { email: "brand2@demo.com", password: "demo1234", display_name: "TechVault", role: "brand", company_name: "TechVault Inc.", website: "https://techvault.io", industry: "Electronics" },
    { email: "brand3@demo.com", password: "demo1234", display_name: "FitLife Nutrition", role: "brand", company_name: "FitLife Nutrition LLC", website: "https://fitlifenutrition.com", industry: "Health & Wellness" },
  ];

  const results: string[] = [];

  // Create creators
  for (const c of creators) {
    const { data: authData, error: authErr } = await supabaseAdmin.auth.admin.createUser({
      email: c.email,
      password: c.password,
      email_confirm: true,
      user_metadata: { role: c.role, display_name: c.display_name },
    });
    if (authErr) {
      results.push(`❌ Creator ${c.email}: ${authErr.message}`);
      continue;
    }
    const uid = authData.user.id;

    // Update profile bio
    await supabaseAdmin.from("profiles").update({ bio: c.bio }).eq("id", uid);

    // Create creator profile
    await supabaseAdmin.from("creator_profiles").insert({
      user_id: uid,
      niches: c.niches,
      platforms: c.platforms,
      follower_count: c.follower_count,
      avg_gmv: c.avg_gmv,
      rating: c.rating,
      location: c.location,
    });
    results.push(`✅ Creator ${c.display_name}`);
  }

  // Create brands + products
  const products = [
    { title: "Vitamin C Brightening Serum", description: "Our bestselling serum needs live demos showing before/after results. Looking for beauty creators who can showcase the glow-up transformation.", category: "Beauty", budget_min: 500, budget_max: 2000, target_platforms: ["TikTok", "Instagram"], commission_info: "15% per sale + flat fee" },
    { title: "Wireless Noise-Cancelling Earbuds", description: "Launch campaign for our new ANC earbuds. Need tech reviewers who can do live unboxing and sound quality tests.", category: "Tech", budget_min: 1000, budget_max: 5000, target_platforms: ["YouTube", "TikTok"], commission_info: "10% commission" },
    { title: "Organic Protein Powder Bundle", description: "Promote our new plant-based protein line. Looking for fitness creators to do live taste tests and workout demos.", category: "Health", budget_min: 300, budget_max: 1500, target_platforms: ["Instagram", "YouTube", "Facebook"], commission_info: "20% per sale" },
    { title: "Smart Home Starter Kit", description: "Demonstrate our smart home bundle (smart plugs, bulbs, doorbell) in a live setting. Show how easy setup is.", category: "Tech", budget_min: 800, budget_max: 3000, target_platforms: ["YouTube", "TikTok"], commission_info: "12% commission + product" },
    { title: "Luxury Candle Collection", description: "Holiday campaign for our handmade candle line. Need lifestyle creators who can create cozy, aesthetic vibes on stream.", category: "Home", budget_min: 200, budget_max: 800, target_platforms: ["TikTok", "Instagram"], commission_info: "18% per sale" },
    { title: "Anti-Aging Eye Cream", description: "Looking for skincare experts to demo our new eye cream with close-up before/after comparisons during live streams.", category: "Beauty", budget_min: 600, budget_max: 2500, target_platforms: ["TikTok", "Instagram", "Amazon Live"], commission_info: "15% per sale" },
  ];

  let productIdx = 0;
  for (const b of brands) {
    const { data: authData, error: authErr } = await supabaseAdmin.auth.admin.createUser({
      email: b.email,
      password: b.password,
      email_confirm: true,
      user_metadata: { role: b.role, display_name: b.display_name },
    });
    if (authErr) {
      results.push(`❌ Brand ${b.email}: ${authErr.message}`);
      continue;
    }
    const uid = authData.user.id;

    await supabaseAdmin.from("brand_profiles").insert({
      user_id: uid,
      company_name: b.company_name,
      website: b.website,
      industry: b.industry,
    });
    results.push(`✅ Brand ${b.company_name}`);

    // Add 2 products per brand
    for (let i = 0; i < 2 && productIdx < products.length; i++, productIdx++) {
      const p = products[productIdx];
      await supabaseAdmin.from("products").insert({ brand_id: uid, ...p });
      results.push(`  📦 Product: ${p.title}`);
    }
  }

  return new Response(JSON.stringify({ results }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
