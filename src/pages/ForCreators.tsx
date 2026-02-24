import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import StaticVideoCarousel from "@/components/StaticVideoCarousel";
import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  DollarSign,
  Shield,
  FileText,
  Globe,
  TrendingUp,
  Users,
  ShoppingBag,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ─── Perks ─── */
const perks = [
  { icon: Sparkles, title: "No Experience Needed" },
  { icon: DollarSign, title: "Earn Commission & High Salary" },
  { icon: Globe, title: "Work Remotely & Async" },
  { icon: Shield, title: "Guaranteed Payments" },
  { icon: FileText, title: "Contract Processing" },
];

/* ─── Platform data ─── */
const platforms = [
  { name: "TikTok Shop", img: "/images/platforms/tiktok-shop.png" },
  { name: "Amazon Live", img: "/images/platforms/amazon-live.png" },
  { name: "eBay Live", img: "/images/platforms/ebay-live.png" },
];

/* ─── Market stats ─── */
const marketStats = [
  { value: "20%", label: "of all e-commerce will be live shopping by 2026", icon: ShoppingBag },
  { value: "10x", label: "higher conversion rate vs traditional e-commerce", icon: TrendingUp },
  { value: "500+", label: "new creator millionaires every month", icon: Users },
  { value: "$600B+", label: "global live shopping market by 2027", icon: Zap },
];

/* ─── Brand logos ─── */
const brandLogos = [
  { name: "Adidas", img: "/images/brands/adidas.png" },
  { name: "Crocs", img: "/images/brands/crocs.png" },
  { name: "Sephora", img: "/images/brands/sephora.png" },
  { name: "Walmart", img: "/images/brands/walmart.png" },
  { name: "Samsung", img: "/images/brands/samsung.png" },
];

/* ─── How it works steps ─── */
const steps = [
  {
    step: 1,
    title: "Create an Optimized Profile",
    description:
      "Showcase your best live streams with a professional portfolio that highlights your selling style, niches, and past brand collaborations.",
  },
  {
    step: 2,
    title: "Get Booked by Top Brands",
    description:
      "Chat directly with brands, negotiate your rates, and lock in live stream deals, all inside gmv.live.",
  },
  {
    step: 3,
    title: "Go Live & Earn",
    description:
      "We handle payments, contracts, and invoicing so you can focus on what you do best: selling live.",
  },
  {
    step: 4,
    title: "Get Paid Instantly",
    description:
      "Once the stream wraps and the brand approves, your earnings hit your account. No chasing invoices.",
  },
];

/* ─── FAQ ─── */
const faqs = [
  {
    q: "What is a Live Shopping Host?",
    a: "A live shopping host is a creator who sells products in real-time on platforms like TikTok Shop, Amazon Live, or brand websites. Hosts engage audiences, demo products, and drive sales during live streams.",
  },
  {
    q: "How do I get booked on gmv.live?",
    a: "Once your profile is live, brands can discover you through our marketplace, view your portfolio, and reach out directly with product offers and stream opportunities.",
  },
  {
    q: "Does gmv.live take a cut of my earnings?",
    a: "gmv.live does not take a percentage of your sales commissions. We charge brands a platform fee. Your rates stay yours.",
  },
  {
    q: "What platforms does gmv.live support?",
    a: "We support TikTok Shop, Amazon Live, Instagram Live, YouTube Live, and custom brand storefronts. More platforms are added regularly.",
  },
  {
    q: "How do payments work?",
    a: "Payments are secured upfront by the brand. Once the stream is completed and approved, funds are released directly to your bank account.",
  },
];

const ForCreators = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ═══════ SECTION 1: HERO + PERKS (gradient bg) ═══════ */}
      <div className="relative overflow-hidden">
        {/* Gradient blobs */}
        <div className="cloud-blob bg-primary w-[500px] h-[500px] -top-32 -left-32 absolute" />
        <div className="cloud-blob bg-accent w-[500px] h-[500px] top-20 -right-40 absolute" />

        <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16">
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Become a Live Shopping Host
            </p>

            <h1 className="mt-6 text-5xl font-black leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              Where{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Top Brands</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-primary opacity-40 rounded-sm -z-0 sm:h-4" />
              </span>{" "}
              Find Their Live Shopping Hosts.
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
              Get paid to share your passion online.
            </p>

            <div className="mt-10 flex justify-center">
              <Button
                size="lg"
                className="rounded-full px-8 text-base font-bold"
                asChild
              >
                <Link to="/waitlist">
                  Join Now — It's Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Perks (still inside gradient wrapper) */}
        <section className="relative pb-10 sm:pb-14">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {perks.map((p) => (
                <div
                  key={p.title}
                  className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3 backdrop-blur-sm"
                >
                  <p.icon className="h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm font-medium text-foreground/80">{p.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ═══════ SECTION 2: VIDEO PROOF (solid bg) ═══════ */}
      <section className="pt-4 pb-12 sm:pt-6 sm:pb-16">
        <StaticVideoCarousel />
        <div className="mx-auto max-w-2xl px-4 mt-8 text-center">
          <p className="text-lg text-muted-foreground sm:text-xl">
            Live shopping is the fastest-growing channel in e-commerce. The wave is here. Will you ride it?
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <Button
            size="lg"
            className="rounded-full px-8 text-base font-bold"
            asChild
          >
            <Link to="/waitlist">
              Don't Miss Out on the Opportunity <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ═══════ SECTION 3: MARKET PROOF (gradient bg) ═══════ */}
      <div className="relative overflow-hidden">
        <div className="cloud-blob bg-primary w-[600px] h-[600px] -top-40 -right-40 absolute" />
        <div className="cloud-blob bg-accent w-[400px] h-[400px] bottom-0 -left-20 absolute" />

        <section className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            {/* Big $600B+ stat on top */}
            <div className="text-center mb-12">
              <p className="text-6xl font-black tracking-tight text-primary sm:text-7xl lg:text-8xl">
                $600B+
              </p>
              <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
                Global live shopping market by 2027
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {marketStats.filter(s => s.value !== "$600B+").map((stat) => (
                <div
                  key={stat.value}
                  className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 text-center"
                >
                  <stat.icon className="mx-auto h-6 w-6 text-accent mb-3" />
                  <p className="text-3xl font-black tracking-tight text-primary sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Platform heading */}
            {/* Now it's your turn */}
            <p className="mx-auto mt-16 mb-8 max-w-lg text-center text-lg font-semibold text-foreground sm:text-xl">
              All platforms are taking action. Now it's your turn!
            </p>

            {/* Platform logos */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {platforms.map((p) => (
                <div key={p.name} className="rounded-xl overflow-hidden border border-border bg-card/40">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-24 w-auto object-contain sm:h-36"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                size="lg"
                className="rounded-full px-8"
                asChild
              >
                <Link to="/waitlist">
                  Join the Revolution <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* ═══════ SECTION 4: BRAND TRUST (solid bg, infinite scroll) ═══════ */}
      <section className="py-16 sm:py-24 overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Brands Already Using Live Shopping
          </h2>
        </div>
        <div className="relative w-full">
          <div className="flex animate-scroll-logos w-max">
            {[...brandLogos, ...brandLogos].map((b, i) => (
              <img
                key={`${b.name}-${i}`}
                src={b.img}
                alt={b.name}
                className="h-8 w-auto object-contain brightness-0 invert opacity-50 hover:opacity-100 transition-opacity sm:h-10 mx-8 sm:mx-12"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS (gradient bg) ═══════ */}
      <div className="relative overflow-hidden">
        <div className="cloud-blob bg-primary w-[500px] h-[500px] top-20 -left-40 absolute" />
        <div className="cloud-blob bg-accent w-[400px] h-[400px] bottom-20 -right-32 absolute" />

        <section className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
              From sign-up to payout. Here's how <em>gmv.live</em> works for creators.
            </p>

            <div className="mt-14 space-y-12">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="rounded-2xl border border-border bg-card p-6 sm:p-8"
                >
                  <p className="text-sm font-mono font-semibold text-primary">{s.step}_</p>
                  <h3 className="mt-2 text-xl font-bold sm:text-2xl">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{s.description}</p>

                  {s.step === 1 && (
                    <div className="mt-6 grid grid-cols-4 gap-2 rounded-xl overflow-hidden">
                      {[
                        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=200&fit=crop",
                        "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=200&h=200&fit=crop",
                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
                      ].map((src, i) => (
                        <img key={i} src={src} alt="Portfolio example" className="aspect-square w-full object-cover rounded-lg" loading="lazy" />
                      ))}
                    </div>
                  )}

                  {s.step === 2 && (
                    <div className="mt-6 rounded-xl border border-border bg-secondary p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 shrink-0 rounded-full bg-primary/20" />
                        <div className="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
                          Hi! We'd love you to host a live stream for our new skincare line. Interested?
                        </div>
                      </div>
                      <div className="flex items-start justify-end gap-3">
                        <div className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">
                          Sounds great! Here's my rate 🎬
                        </div>
                      </div>
                    </div>
                  )}

                  {s.step === 3 && (
                    <div className="mt-6 space-y-3">
                      <div className="rounded-xl bg-accent/10 border border-accent/20 p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Your Payment</span>
                          <span className="font-bold">$550</span>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-sm text-accent">
                          <CheckCircle2 className="h-4 w-4" /> Secured
                          <span className="ml-auto text-muted-foreground text-xs">1h ago</span>
                        </div>
                      </div>
                      <div className="rounded-xl bg-accent/10 border border-accent/20 p-4">
                        <span className="font-semibold">Your Contract</span>
                        <div className="mt-2 space-y-1 text-sm text-accent">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" /> Signed by you
                            <span className="ml-auto text-muted-foreground text-xs">1h ago</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" /> Signed by brand
                            <span className="ml-auto text-muted-foreground text-xs">2h ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {s.step === 4 && (
                    <div className="mt-6 flex flex-col items-center rounded-xl border border-border bg-secondary p-8 text-center">
                      <p className="text-lg font-bold">Congratulations! 🎉</p>
                      <p className="mt-4 text-4xl font-black text-primary">+ $550</p>
                      <p className="mt-2 text-sm text-muted-foreground">The brand approved your live stream</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ═══════ FAQ (solid bg) ═══════ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Still Have Questions?
          </h2>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ═══════ FINAL CTA (gradient bg) ═══════ */}
      <div className="relative overflow-hidden">
        <div className="cloud-blob bg-primary w-[500px] h-[500px] top-0 left-1/3 absolute" />

        <section className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Join Hundreds of Live Hosts
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Focus on selling live for the best brands with our optimized tools
              and resources. Hundreds of hosts have already joined <em>gmv.live</em> and are
              thriving. Now it's your turn!
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <Button
                size="lg"
                className="rounded-full px-8"
                asChild
              >
                <Link to="/waitlist">
                  Join <em>gmv.live</em> <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Link
                to="/for-brands"
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Are you a brand? <ChevronRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ═══════ FOOTER (solid) ═══════ */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-lg font-bold">🤩 <em>gmv.live</em></p>
              <p className="mt-2 text-sm text-muted-foreground">support@gmv.live</p>
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
            © {new Date().getFullYear()} <em>gmv.live</em>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ForCreators;
