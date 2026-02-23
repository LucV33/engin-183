import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Play,
  Search,
  MessageSquare,
  BarChart3,
  Users,
  Zap,
  Shield,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const rotatingWords = [
  "TikTok Shop.",
  "Brand Campaigns.",
  "Product Launch.",
  "Flash Sales.",
];

const hosts = [
  {
    name: "Mia Chen",
    gmv: "$3,200",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=530&fit=crop",
  },
  {
    name: "Jordan Lee",
    gmv: "$4,800",
    rating: "5.0",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=530&fit=crop",
  },
  {
    name: "Aisha Patel",
    gmv: "$2,900",
    rating: "4.8",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=530&fit=crop",
  },
  {
    name: "Tyler Ross",
    gmv: "$3,600",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=530&fit=crop",
  },
];

/* ─── Feature cards ─── */
const features = [
  {
    icon: Search,
    title: "Discover Vetted Hosts",
    description:
      "Browse a curated marketplace of live shopping hosts filtered by niche, platform, and proven sales metrics.",
  },
  {
    icon: MessageSquare,
    title: "Direct Messaging",
    description:
      "Chat with hosts, share your product brief, align on format and pricing — no agencies in the way.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Track viewers, clicks, and conversions as they happen. Know your ROI before the stream even ends.",
  },
  {
    icon: Users,
    title: "Managed Campaigns",
    description:
      "Run multi-host campaigns across platforms. One dashboard to manage all your live shopping activations.",
  },
  {
    icon: Zap,
    title: "Fast Booking",
    description:
      "Go from brief to booked in hours, not weeks. Hosts respond fast and confirm availability instantly.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description:
      "Funds are held in escrow until the stream is complete. Pay only for results, with full transparency.",
  },
];

/* ─── How it works ─── */
const steps = [
  {
    step: 1,
    title: "Find Your Host",
    description:
      "Browse vetted live shopping hosts. Filter by niche, selling style, platform, and past performance. Watch highlight reels before you book.",
    img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=340&fit=crop",
  },
  {
    step: 2,
    title: "Align & Book",
    description:
      "Message hosts directly. Share your product brief, agree on format and budget, and lock in your live date. No agencies, no middlemen.",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=340&fit=crop",
  },
  {
    step: 3,
    title: "Go Live & Sell",
    description:
      "Ship your product, drop your talking points, and watch them sell. Track viewers, clicks, and conversions in real time.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=340&fit=crop",
  },
];

/* ─── FAQ ─── */
const faqs = [
  {
    q: "What is live shopping?",
    a: "Live shopping is a real-time selling format where a host demonstrates and sells products via live video on platforms like TikTok Shop, Amazon Live, Instagram Live, and more.",
  },
  {
    q: "How do I find the right host for my brand?",
    a: "Use our filters to search by niche, platform, follower count, past GMV, and ratings. You can watch highlight reels and review portfolios before reaching out.",
  },
  {
    q: "What does it cost to use Hostify?",
    a: "Hostify charges a small platform fee on bookings. Host rates vary — you negotiate directly with hosts based on your budget and campaign needs.",
  },
  {
    q: "Which platforms are supported?",
    a: "We support TikTok Shop, Amazon Live, Instagram Live, YouTube Live, and custom brand storefronts. More platforms are added regularly.",
  },
  {
    q: "How are payments handled?",
    a: "Payments are held in escrow when you book. Funds are released to the host once the stream is completed and approved by you.",
  },
];

/* ─── Brand names ─── */
const brandNames = [
  "L'Oréal", "Sephora", "Nike", "Adidas", "Samsung", "Amazon",
  "Glossier", "Fenty", "Shein", "Zara", "H&M", "Unilever",
  "Estée Lauder", "TikTok", "Meta",
];

const Index = () => {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden hero-gradient pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="cloud-blob bg-primary/20 w-[500px] h-[500px] -top-40 -left-40 absolute" />
        <div className="cloud-blob bg-accent/20 w-[600px] h-[600px] top-20 -right-60 absolute" />
        <div className="cloud-blob bg-primary/10 w-[400px] h-[400px] bottom-0 left-1/3 absolute" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="max-w-xl">
              <Badge
                variant="secondary"
                className="mb-6 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border-0"
              >
                Live Shopping Network
              </Badge>

              <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Match and Manage the Best Live Hosts For Your{" "}
                <span className="relative inline-block" style={{ minWidth: "280px" }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentWord}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="inline-block text-primary whitespace-nowrap"
                    >
                      {rotatingWords[currentWord]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Stop scrambling for live hosts. Hostify matches your brand with
                vetted creators who sell on camera, so you can go live faster and
                sell more.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/register">Browse Hosts</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/">Apply as a Host</Link>
                </Button>
              </div>
            </div>

            {/* Host Cards with images */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {hosts.map((host, i) => (
                <div
                  key={host.name}
                  className="group relative overflow-hidden rounded-2xl bg-card shadow-md border border-border/50 transition-shadow hover:shadow-xl"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={host.img}
                      alt={host.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/80 text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                        <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/60 to-transparent p-3 pt-10">
                      <span className="text-xs font-semibold text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                        See Profile →
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-card-foreground">{host.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Avg. {host.gmv} GMV per stream •{" "}
                      <Star className="inline h-3 w-3 text-primary -mt-0.5" fill="currentColor" />{" "}
                      {host.rating}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SOCIAL PROOF ═══════ */}
      <section className="border-y border-border/50 bg-background py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
            Trusted by 200+ e-commerce brands going live every week.
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-logos w-max gap-16 px-6">
            {[...brandNames, ...brandNames].map((name, i) => (
              <span
                key={i}
                className="shrink-0 text-lg font-bold tracking-tight text-foreground/30 select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FEATURE CARDS ═══════ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-12">
            Everything You Need to Go Live
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-card-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            From discovery to conversion — here's how Hostify works for brands.
          </p>

          <div className="mt-14 space-y-12">
            {steps.map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm sm:p-8"
              >
                <p className="text-sm font-mono font-semibold text-primary">{s.step}_</p>
                <h3 className="mt-2 text-xl font-bold text-card-foreground sm:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{s.description}</p>
                <div className="mt-6 overflow-hidden rounded-xl">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full aspect-video object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Still Have Questions?
          </h2>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Start Selling Live Today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Join hundreds of brands already using Hostify to find top live shopping
            hosts, run campaigns, and drive real-time sales.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Button size="lg" asChild>
              <Link to="/register">
                Get Started <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Are you a creator? <ChevronRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-lg font-bold text-foreground">Hostify</p>
              <p className="mt-2 text-sm text-muted-foreground">support@hostify.live</p>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="/for-brands" className="block hover:text-foreground">For Brands</Link>
              <Link to="/" className="block hover:text-foreground">For Creators</Link>
              <Link to="/coming-soon" className="block hover:text-foreground">Pricing</Link>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="/coming-soon" className="block hover:text-foreground">Privacy Policy</Link>
              <Link to="/coming-soon" className="block hover:text-foreground">Terms of Use</Link>
            </div>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Hostify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
