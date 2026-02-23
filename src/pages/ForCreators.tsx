import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Star,
  MessageSquare,
  DollarSign,
  Shield,
  FileText,
  Sparkles,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ─── Feature cards (6-card grid like reference) ─── */
const features = [
  {
    title: "The Best Live Host Portfolio",
    description: "Create yours in seconds and share it around.",
    visual: (
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="flex gap-1">
          {[
            "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=60&h=80&fit=crop",
            "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=60&h=80&fit=crop",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=80&fit=crop",
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60&h=80&fit=crop",
          ].map((src, i) => (
            <img key={i} src={src} alt="" className="h-14 w-10 rounded-md object-cover" loading="lazy" />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Live Stream Offers Daily",
    description: "Here, brands contact you directly.",
    visual: (
      <div className="space-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2 rounded-lg bg-background border border-border px-3 py-2">
          <div className="h-5 w-5 rounded-full bg-primary/20 shrink-0" />
          <span className="truncate">GlowSkin sent you a message…</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-background border border-border px-3 py-2">
          <div className="h-5 w-5 rounded-full bg-accent/20 shrink-0" />
          <span className="truncate">FitGear sent you a message…</span>
        </div>
      </div>
    ),
  },
  {
    title: "Your Work, Your Prices",
    description: "No limits, no constraints.",
    visual: (
      <div className="flex flex-wrap gap-1.5 text-xs">
        {["1 stream $200", "Full day $800", "Commission 15%", "Highlights $50", "Multi-platform $500", "Custom quote"].map((t) => (
          <span key={t} className="rounded-full border border-border bg-background px-2.5 py-1 text-muted-foreground">{t}</span>
        ))}
      </div>
    ),
  },
  {
    title: "Guaranteed Payments",
    description: "Get paid, without any doubt.",
    visual: (
      <div className="grid grid-cols-4 gap-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 rounded-sm bg-primary/10" style={{ opacity: 0.3 + (i % 4) * 0.2 }} />
        ))}
      </div>
    ),
  },
  {
    title: "Automatic Invoicing",
    description: "We take care of the paperwork for you.",
    visual: (
      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 rounded-sm bg-accent/10" style={{ opacity: 0.3 + (i % 3) * 0.2 }} />
        ))}
      </div>
    ),
  },
  {
    title: "And Much More…",
    description: "Analytics, scheduling, contracts…",
    visual: (
      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 rounded-sm bg-muted" />
        ))}
      </div>
    ),
  },
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
      "Chat directly with brands, negotiate your rates, and lock in live stream deals — all inside Hostify.",
  },
  {
    step: 3,
    title: "Go Live & Earn",
    description:
      "We handle payments, contracts, and invoicing so you can focus on what you do best — selling live.",
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
    q: "How do I get booked on Hostify?",
    a: "Once your profile is live, brands can discover you through our marketplace, view your portfolio, and reach out directly with product offers and stream opportunities.",
  },
  {
    q: "Does Hostify take a cut of my earnings?",
    a: "Hostify does not take a percentage of your sales commissions. We charge brands a platform fee — your rates stay yours.",
  },
  {
    q: "What platforms does Hostify support?",
    a: "We support TikTok Shop, Amazon Live, Instagram Live, YouTube Live, and custom brand storefronts. More platforms are added regularly.",
  },
  {
    q: "How do payments work?",
    a: "Payments are secured upfront by the brand. Once the stream is completed and approved, funds are released directly to your bank account.",
  },
];

const communityNames = [
  "Mia C.", "Jordan L.", "Aisha P.", "Tyler R.", "Priya S.", "Carlos M.",
];

const brandNames = [
  "L'Oréal", "Sephora", "Nike", "Adidas", "Samsung", "Amazon",
  "Glossier", "Fenty", "Shein", "Zara", "H&M", "Unilever",
  "Estée Lauder", "TikTok", "Meta",
];

const ForCreators = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ═══════ HERO + FEATURE CARDS ═══════ */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Text — left aligned like reference */}
          <p className="text-sm font-medium text-muted-foreground">Become a Live Shopping Host</p>

          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl max-w-3xl">
            Where Top Brands Find Their Live Shopping Hosts.
          </h1>

          <p className="mt-4 text-lg text-muted-foreground max-w-xl">
            Your live hosting journey starts on Hostify.
          </p>

          {/* 6-card grid */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/30 p-5 transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 min-h-[56px]">{f.visual}</div>
                <h3 className="text-sm font-bold text-card-foreground">{f.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button size="lg" asChild>
              <Link to="/register">
                Join Hostify for Free <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════ MONEY STAT ═══════ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-6xl font-black tracking-tight text-primary sm:text-7xl lg:text-8xl">
            +$2,000,000
          </p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-primary/70">
            paid out to our hosts
          </p>

          <div className="mt-8 flex justify-center -space-x-3">
            {communityNames.map((name, i) => (
              <div
                key={name}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-semibold text-muted-foreground"
                style={{ zIndex: communityNames.length - i }}
              >
                {name.split(" ").map((n) => n[0]).join("")}
              </div>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-lg text-base text-muted-foreground">
            Real partnerships. Real payouts. Hostify is where live hosts get the
            recognition, and revenue, they deserve.
          </p>

          <Button size="lg" className="mt-8" asChild>
            <Link to="/register">
              Join Hostify Now <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ═══════ BRAND TRUST BAR ═══════ */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
            Over 200+ brands and agencies work with our hosts.
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

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            From sign-up to payout — here's how Hostify works for creators.
          </p>

          <div className="mt-14 space-y-12">
            {steps.map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm sm:p-8"
              >
                <p className="text-sm font-mono font-semibold text-primary">{s.step}_</p>
                <h3 className="mt-2 text-xl font-bold text-card-foreground sm:text-2xl">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{s.description}</p>

                {s.step === 1 && (
                  <div className="mt-6 grid grid-cols-4 gap-2 rounded-xl overflow-hidden">
                    {[
                      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=200&fit=crop",
                      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=200&h=200&fit=crop",
                      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
                      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
                    ].map((src, i) => (
                      <img key={i} src={src} alt="Portfolio example" className="aspect-square w-full object-cover" loading="lazy" />
                    ))}
                  </div>
                )}

                {s.step === 2 && (
                  <div className="mt-6 rounded-xl border border-border bg-background p-4 space-y-3">
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
                    <div className="rounded-xl bg-primary/10 border border-primary/20 p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-card-foreground">Your Payment</span>
                        <span className="font-bold text-card-foreground">$550</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-sm text-primary">
                        <CheckCircle2 className="h-4 w-4" /> Secured
                        <span className="ml-auto text-muted-foreground text-xs">1h ago</span>
                      </div>
                    </div>
                    <div className="rounded-xl bg-primary/10 border border-primary/20 p-4">
                      <span className="font-semibold text-card-foreground">Your Contract</span>
                      <div className="mt-2 space-y-1 text-sm text-primary">
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
                  <div className="mt-6 flex flex-col items-center rounded-xl border border-border bg-background p-8 text-center">
                    <p className="text-lg font-bold text-card-foreground">Congratulations! 🎉</p>
                    <p className="mt-4 text-4xl font-black text-primary">+ $550</p>
                    <p className="mt-2 text-sm text-muted-foreground">The brand approved your live stream</p>
                  </div>
                )}
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
            Join Hundreds of Live Hosts
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Focus on selling live for the best brands with our optimized tools
            and resources. Hundreds of hosts have already joined Hostify and are
            thriving — now it's your turn!
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Button size="lg" asChild>
              <Link to="/register">
                Join Hostify <ChevronRight className="ml-1 h-4 w-4" />
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

export default ForCreators;
