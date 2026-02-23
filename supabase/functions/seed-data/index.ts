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

  const avatarUrl = (seed: string) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
  const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&h=600&fit=crop`;

  const creators = [
    { email: "creator1@demo.com", password: "demo1234", display_name: "Sarah Chen", bio: "Top TikTok live seller with 3 years experience in beauty and skincare. Known for high engagement rates and authentic product reviews.", niches: ["Beauty", "Skincare"], platforms: ["TikTok", "Instagram"], follower_count: 250000, avg_gmv: 15000, rating: 4.8, location: "Los Angeles, CA", portfolio: [unsplash("1534528741775-53994a69daeb"), unsplash("1522335789203-aabd1fc54bc9")] },
    { email: "creator2@demo.com", password: "demo1234", display_name: "Marcus Johnson", bio: "Tech reviewer and live shopping host. Specializing in gadgets, electronics, and smart home products.", niches: ["Tech", "Gaming"], platforms: ["YouTube", "TikTok"], follower_count: 180000, avg_gmv: 22000, rating: 4.6, location: "Austin, TX", portfolio: [unsplash("1531297484001-80022131f5a1"), unsplash("1519389950473-47ba0277781c")] },
    { email: "creator3@demo.com", password: "demo1234", display_name: "Jessica Rivera", bio: "Fashion and lifestyle creator. I bring energy and fun to every live stream. My audience loves discovering new brands!", niches: ["Fashion", "Lifestyle"], platforms: ["Instagram", "TikTok"], follower_count: 420000, avg_gmv: 35000, rating: 4.9, location: "Miami, FL", portfolio: [unsplash("1515886657613-9f3515b0c78f"), unsplash("1469334031218-e382a71b716b")] },
    { email: "creator4@demo.com", password: "demo1234", display_name: "David Kim", bio: "Fitness and wellness live host. I help brands connect with health-conscious consumers through engaging live demonstrations.", niches: ["Fitness", "Home"], platforms: ["YouTube", "Facebook"], follower_count: 95000, avg_gmv: 8000, rating: 4.3, location: "Seattle, WA", portfolio: [unsplash("1517836357463-d25dfeac3438"), unsplash("1571019614242-c5c5dee9f50b")] },
    { email: "creator5@demo.com", password: "demo1234", display_name: "Emma Thompson", bio: "Pet product specialist and animal lover. My community trusts my recommendations for their furry friends.", niches: ["Pets", "Lifestyle"], platforms: ["TikTok", "Instagram"], follower_count: 310000, avg_gmv: 12000, rating: 4.7, location: "Denver, CO", portfolio: [unsplash("1587300003388-59208cc962cb"), unsplash("1548199973-03cce0bbc87b")] },
    { email: "creator6@demo.com", password: "demo1234", display_name: "Aisha Patel", bio: "Home décor and DIY queen. Passionate about helping people transform their spaces on a budget through live demos.", niches: ["Home", "Lifestyle"], platforms: ["Instagram", "YouTube"], follower_count: 175000, avg_gmv: 9500, rating: 4.5, location: "Chicago, IL", portfolio: [unsplash("1616486338812-3dadae4b4ace"), unsplash("1618219908412-a29a1bb7b86e")] },
    { email: "creator7@demo.com", password: "demo1234", display_name: "Carlos Mendez", bio: "Food and kitchen gadget enthusiast. My live cooking demos consistently drive sales for kitchen brands.", niches: ["Food", "Home"], platforms: ["TikTok", "Facebook"], follower_count: 290000, avg_gmv: 18000, rating: 4.6, location: "Houston, TX", portfolio: [unsplash("1556909114-f6e7ad7d3136"), unsplash("1504674900247-0877df9cc836")] },
    { email: "creator8@demo.com", password: "demo1234", display_name: "Lily Zhang", bio: "K-beauty expert and skincare educator. I break down ingredients and do live product comparisons.", niches: ["Beauty", "Skincare"], platforms: ["TikTok", "YouTube"], follower_count: 520000, avg_gmv: 42000, rating: 4.9, location: "New York, NY", portfolio: [unsplash("1596755094514-f87e34085b2c"), unsplash("1512496015851-a90fb38ba796")] },
    { email: "creator9@demo.com", password: "demo1234", display_name: "Jake Morrison", bio: "Outdoor and adventure gear reviewer. I test products in real conditions during my live streams.", niches: ["Fitness", "Travel"], platforms: ["YouTube", "Instagram"], follower_count: 145000, avg_gmv: 11000, rating: 4.4, location: "Portland, OR", portfolio: [unsplash("1501555088652-021faa106b9b"), unsplash("1551632811-561732d1e306")] },
    { email: "creator10@demo.com", password: "demo1234", display_name: "Nina Okafor", bio: "Fashion-forward creator specializing in sustainable and ethical brands. My audience values quality over quantity.", niches: ["Fashion", "Lifestyle"], platforms: ["Instagram", "TikTok"], follower_count: 380000, avg_gmv: 28000, rating: 4.8, location: "Atlanta, GA", portfolio: [unsplash("1483985988355-763728e1935b"), unsplash("1509631179647-0177331693ae")] },
  ];

  const productImg = (keyword: string) => `https://images.unsplash.com/photo-${keyword}?w=600&h=400&fit=crop`;

  const brandsData = [
    { email: "brand1@demo.com", password: "demo1234", display_name: "GlowUp Beauty", company_name: "GlowUp Beauty Co.", website: "https://glowupbeauty.com", industry: "Beauty & Skincare", product: { title: "Vitamin C Brightening Serum", description: "Our bestselling serum needs live demos showing before/after results. Looking for beauty creators who can showcase the glow-up transformation.", category: "Beauty", budget_min: 500, budget_max: 2000, target_platforms: ["TikTok", "Instagram"], commission_info: "15% commission per sale", images: [productImg("1556228578-8c89e6adf883"), productImg("1570194065650-d99fb4ee6420")], weekly_sales: "$12,400" } },
    { email: "brand2@demo.com", password: "demo1234", display_name: "TechVault", company_name: "TechVault Inc.", website: "https://techvault.io", industry: "Electronics", product: { title: "Wireless Noise-Cancelling Earbuds", description: "Launch campaign for our new ANC earbuds. Need tech reviewers who can do live unboxing and sound quality tests.", category: "Tech", budget_min: 1000, budget_max: 5000, target_platforms: ["YouTube", "TikTok"], commission_info: "10% commission per sale", images: [productImg("1590658268037-6bf12165a8df"), productImg("1505740420928-5e560c06d30e")], weekly_sales: "$28,700" } },
    { email: "brand3@demo.com", password: "demo1234", display_name: "FitLife Nutrition", company_name: "FitLife Nutrition LLC", website: "https://fitlifenutrition.com", industry: "Health & Wellness", product: { title: "Organic Protein Powder Bundle", description: "Promote our new plant-based protein line. Looking for fitness creators to do live taste tests and workout demos.", category: "Health", budget_min: 300, budget_max: 1500, target_platforms: ["Instagram", "YouTube", "Facebook"], commission_info: "20% commission per sale", images: [productImg("1593095948071-474c5cc2989d"), productImg("1622484212801-ffc27777cf80")], weekly_sales: "$8,200" } },
    { email: "brand4@demo.com", password: "demo1234", display_name: "HomeNest", company_name: "HomeNest Design", website: "https://homenest.co", industry: "Home & Living", product: { title: "Smart Home Starter Kit", description: "Demonstrate our smart home bundle (smart plugs, bulbs, doorbell) in a live setting. Show how easy setup is.", category: "Tech", budget_min: 800, budget_max: 3000, target_platforms: ["YouTube", "TikTok"], commission_info: "12% commission + free product", images: [productImg("1558618666-fcd25c85f1d7"), productImg("1585771724684-38269d6639fd")], weekly_sales: "$15,300" } },
    { email: "brand5@demo.com", password: "demo1234", display_name: "Lumière Candles", company_name: "Lumière Artisan Candles", website: "https://lumierecandles.com", industry: "Home & Living", product: { title: "Luxury Candle Collection", description: "Holiday campaign for our handmade candle line. Need lifestyle creators who can create cozy, aesthetic vibes on stream.", category: "Home", budget_min: 200, budget_max: 800, target_platforms: ["TikTok", "Instagram"], commission_info: "18% commission per sale", images: [productImg("1602607537639-b12a47e8e94d"), productImg("1603006905003-be475563bc59")], weekly_sales: "$4,600" } },
    { email: "brand6@demo.com", password: "demo1234", display_name: "PureGlow Skin", company_name: "PureGlow Skincare", website: "https://pureglowskin.com", industry: "Beauty & Skincare", product: { title: "Anti-Aging Eye Cream", description: "Looking for skincare experts to demo our new eye cream with close-up before/after comparisons during live streams.", category: "Beauty", budget_min: 600, budget_max: 2500, target_platforms: ["TikTok", "Instagram", "Amazon Live"], commission_info: "15% commission per sale", images: [productImg("1611930022073-b7a4ba5fcccd"), productImg("1596755389378-c31d21fd1273")], weekly_sales: "$9,800" } },
    { email: "brand7@demo.com", password: "demo1234", display_name: "PawPerfect", company_name: "PawPerfect Pet Co.", website: "https://pawperfect.com", industry: "Pet Products", product: { title: "Organic Dog Treat Sampler", description: "We need pet-loving creators to showcase our all-natural dog treats during live unboxing sessions with their pets.", category: "Pets", budget_min: 250, budget_max: 1000, target_platforms: ["TikTok", "Instagram"], commission_info: "20% commission + free products", images: [productImg("1568640347023-a616a30bc3bd"), productImg("1601758228041-f3b2a7631293")], weekly_sales: "$3,400" } },
    { email: "brand8@demo.com", password: "demo1234", display_name: "UrbanThread", company_name: "UrbanThread Fashion", website: "https://urbanthread.co", industry: "Fashion", product: { title: "Fall Streetwear Collection", description: "Launch our new streetwear drop with live try-on sessions. Looking for fashion creators with an urban aesthetic.", category: "Fashion", budget_min: 1500, budget_max: 5000, target_platforms: ["Instagram", "TikTok"], commission_info: "12% commission + free outfit", images: [productImg("1523398002811-999ca8dec234"), productImg("1441984904996-e0b6ba687b2b")], weekly_sales: "$22,100" } },
    { email: "brand9@demo.com", password: "demo1234", display_name: "ChefTools Pro", company_name: "ChefTools Professional", website: "https://cheftoolspro.com", industry: "Kitchen & Cooking", product: { title: "Japanese Knife Set", description: "Live cooking demonstrations showcasing our premium Japanese knife set. Need food creators who can highlight precision cutting.", category: "Food", budget_min: 700, budget_max: 3000, target_platforms: ["YouTube", "TikTok", "Facebook"], commission_info: "10% commission + product set", images: [productImg("1593618998160-e34014e67546"), productImg("1556909114-f6e7ad7d3136")], weekly_sales: "$11,500" } },
    { email: "brand10@demo.com", password: "demo1234", display_name: "TrailBlaze Gear", company_name: "TrailBlaze Outdoor Gear", website: "https://trailblazegear.com", industry: "Outdoor & Adventure", product: { title: "Ultralight Hiking Backpack", description: "Need outdoor creators to test our new 30L ultralight pack on trail and do live gear reviews from the field.", category: "Fitness", budget_min: 500, budget_max: 2000, target_platforms: ["YouTube", "Instagram"], commission_info: "15% commission + free gear", images: [productImg("1622260614153-a4a0d8e149e0"), productImg("1501555088652-021faa106b9b")], weekly_sales: "$7,900" } },
  ];

  const results: string[] = [];

  // Delete existing demo data first
  for (const c of [...creators, ...brandsData]) {
    const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers();
    const found = existingUser?.users?.find((u: any) => u.email === c.email);
    if (found) {
      await supabaseAdmin.auth.admin.deleteUser(found.id);
      results.push(`🗑️ Deleted existing ${c.email}`);
    }
  }

  // Create creators
  for (const c of creators) {
    const { data: authData, error: authErr } = await supabaseAdmin.auth.admin.createUser({
      email: c.email,
      password: c.password,
      email_confirm: true,
      user_metadata: { role: "creator", display_name: c.display_name },
    });
    if (authErr) {
      results.push(`❌ Creator ${c.email}: ${authErr.message}`);
      continue;
    }
    const uid = authData.user.id;
    const avatar = avatarUrl(c.display_name);

    await supabaseAdmin.from("profiles").update({ bio: c.bio, avatar_url: avatar }).eq("id", uid);
    await supabaseAdmin.from("creator_profiles").insert({
      user_id: uid,
      niches: c.niches,
      platforms: c.platforms,
      follower_count: c.follower_count,
      avg_gmv: c.avg_gmv,
      rating: c.rating,
      location: c.location,
      portfolio_urls: c.portfolio,
    });
    results.push(`✅ Creator ${c.display_name}`);
  }

  // Create brands + products
  for (const b of brandsData) {
    const { data: authData, error: authErr } = await supabaseAdmin.auth.admin.createUser({
      email: b.email,
      password: b.password,
      email_confirm: true,
      user_metadata: { role: "brand", display_name: b.display_name },
    });
    if (authErr) {
      results.push(`❌ Brand ${b.email}: ${authErr.message}`);
      continue;
    }
    const uid = authData.user.id;
    const avatar = avatarUrl(b.company_name);

    await supabaseAdmin.from("profiles").update({ avatar_url: avatar }).eq("id", uid);
    await supabaseAdmin.from("brand_profiles").insert({
      user_id: uid,
      company_name: b.company_name,
      website: b.website,
      industry: b.industry,
      logo_url: avatar,
    });

    const p = b.product as any;
    await supabaseAdmin.from("products").insert({
      brand_id: uid,
      title: p.title,
      description: p.description,
      category: p.category,
      budget_min: p.budget_min,
      budget_max: p.budget_max,
      target_platforms: p.target_platforms,
      commission_info: `${p.commission_info} · ${p.weekly_sales} in sales this week`,
      images: p.images,
    });
    results.push(`✅ Brand ${b.company_name} + 📦 ${p.title}`);
  }

  return new Response(JSON.stringify({ results }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
