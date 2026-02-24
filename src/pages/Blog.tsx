import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Clock, ArrowRight } from "lucide-react";

const articles = [
  {
    slug: "live-shopping-600-billion-revolution",
    category: "Industry News",
    title: "Live Shopping Is Now a $600 Billion Market. Here's What That Means for Your Brand.",
    excerpt:
      "The live commerce market has exploded past $600 billion globally, with projections pointing toward $1 trillion by 2028. If your brand isn't selling live yet, you're leaving serious revenue on the table.",
    date: "Feb 20, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop",
  },
  {
    slug: "how-to-launch-first-tiktok-shop-live",
    category: "Getting Started",
    title: "How to Launch Your First TikTok Shop Live (Step by Step)",
    excerpt:
      "TikTok Shop Live is the fastest-growing sales channel in e-commerce right now. This guide walks you through everything from setting up your shop to going live and converting viewers into buyers.",
    date: "Feb 18, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop",
  },
  {
    slug: "why-college-creators-outperform-influencers",
    category: "Creator Economy",
    title: "Why College Creators Are Outselling Traditional Influencers in Live Commerce",
    excerpt:
      "Brands are discovering that college students with smaller, hyper-engaged audiences consistently outperform big-name influencers in live shopping. The reason? Authenticity and relatability sell.",
    date: "Feb 15, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=450&fit=crop",
  },
  {
    slug: "live-shopping-trends-2026",
    category: "Industry News",
    title: "5 Live Shopping Trends That Will Define 2026",
    excerpt:
      "From AI-powered product recommendations during streams to shoppable short-form replays, 2026 is bringing a new wave of innovation to live commerce. These are the trends brands need to watch.",
    date: "Feb 12, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
  },
  {
    slug: "escrow-payments-live-commerce",
    category: "Getting Started",
    title: "How Escrow Payments Are Making Live Commerce Safer for Brands",
    excerpt:
      "One of the biggest concerns brands have with live shopping is risk. What if the creator doesn't show up? What if the stream flops? Escrow-based platforms are solving this problem by holding funds until the job is done.",
    date: "Feb 8, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop",
  },
  {
    slug: "amazon-live-vs-tiktok-shop",
    category: "Platform Guides",
    title: "Amazon Live vs. TikTok Shop: Which Platform Should Your Brand Start With?",
    excerpt:
      "Both platforms offer massive reach and built-in checkout, but they attract very different audiences. Here's a breakdown of costs, demographics, and conversion rates to help you pick the right fit.",
    date: "Feb 4, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=450&fit=crop",
  },
];

const Blog = () => {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ═══════ HEADER ═══════ */}
      <section className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div className="cloud-blob bg-primary w-[500px] h-[500px] -top-40 -left-40 absolute" />
        <div className="cloud-blob bg-accent w-[400px] h-[400px] top-20 -right-40 absolute" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            The Live Commerce Blog
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Guides, trends, and strategies to help your brand win with live shopping.
          </p>
        </div>
      </section>

      {/* ═══════ FEATURED ARTICLE ═══════ */}
      <section className="py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="group overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-shadow hover:shadow-lg">
            <div className="grid sm:grid-cols-2">
              <div className="aspect-video sm:aspect-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <Badge variant="secondary" className="mb-3 w-fit rounded-full text-xs">
                  {featured.category}
                </Badge>
                <h2 className="text-xl font-bold text-card-foreground sm:text-2xl leading-tight">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {featured.readTime}
                  </span>
                </div>
                <div className="mt-5">
                  <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                    Read article <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ ARTICLE GRID ═══════ */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <div
                key={article.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <Badge variant="secondary" className="mb-2 w-fit rounded-full text-xs">
                    {article.category}
                  </Badge>
                  <h3 className="text-base font-semibold text-card-foreground leading-snug">
                    {article.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {article.readTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Ready to Put Live Shopping to Work?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Join the waitlist and get matched with vetted college creators who can sell your products live.
          </p>
          <div className="mt-8">
            <Button size="lg" className="rounded-full" asChild>
              <Link to="/waitlist">
                Get Started <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-lg font-bold text-foreground">🤩 <em>gmv.live</em></p>
              <p className="mt-2 text-sm text-muted-foreground">support@gmv.live</p>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="/for-brands" className="block hover:text-foreground">For Brands</Link>
              <Link to="/" className="block hover:text-foreground">For Creators</Link>
              <Link to="/pricing" className="block hover:text-foreground">Pricing</Link>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="/coming-soon" className="block hover:text-foreground">Privacy Policy</Link>
              <Link to="/coming-soon" className="block hover:text-foreground">Terms of Use</Link>
            </div>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            © {new Date().getFullYear()} <em>gmv.live</em>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
