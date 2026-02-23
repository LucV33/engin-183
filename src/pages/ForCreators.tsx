import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

/* ─── Feature cards (top grid) ─── */
const features = [
  {
    icon: Star,
    title: "Build Your Live Host Portfolio",
    description:
      "Create a standout profile in seconds — showcase your best streams and share it with brands.",
  },
  {
    icon: MessageSquare,
    title: "Brands Come to You",
    description:
      "No more cold pitching. Brands browse hosts and reach out with live stream offers directly.",
  },
  {
    icon: DollarSign,
    title: "Your Rates, Your Rules",
    description:
      "Set your own commission and flat-rate pricing. No caps, no platform cuts on your rates.",
  },
  {
    icon: Shield,
    title: "Guaranteed Payments",
    description:
      "Get paid on time, every time. Payments are secured before you go live.",
  },
  {
    icon: FileText,
    title: "Automatic Invoicing",
    description:
      "We handle the paperwork — contracts, invoices, and tax docs generated for you.",
  },
  {
    icon: Sparkles,
    title: "And Much More…",
    description:
      "Analytics, stream scheduling, brand matchmaking, and tools built for live sellers.",
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

/* ─── Sample host names for the community section ─── */
const communityNames = [
  "Mia C.",
  "Jordan L.",
  "Aisha P.",
  "Tyler R.",
  "Priya S.",
  "Carlos M.",
];

/* ─── Brand logos placeholder ─── */
const brandLogos = Array.from({ length: 10 }, (_, i) => `Brand ${i + 1}`);

const ForCreators = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        {/* Decorative blobs */}
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute top-20 -right-60 h-[600px] w-[600px] rounded-full bg-accent/15 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Badge
            variant="secondary"
            className="mb-6 rounded-full border-0 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            Become a Live Host
          </Badge>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Other Platforms Undervalue Your Work,{" "}
            <span className="relative inline-block">
              <span className="relative z-10">We Don't.</span>
              <span className="absolute inset-x-0 bottom-1 z-0 h-4 bg-primary/25 sm:h-5" />
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Hostify helps you shine as a live shopping host — showcase your
            streams, connect with brands, and earn money doing what you love.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/register">
                Join Hostify for Free <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════ SOCIAL PROOF STAT (Money) ═══════ */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-6xl font-black tracking-tight text-primary sm:text-7xl lg:text-8xl">
            +$2,000,000
          </p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-primary/70">
            paid out to our hosts
          </p>

          {/* Avatar row */}
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

      {/* ═══════ FEATURE CARDS (Perks) ═══════ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-card-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ BRAND TRUST BAR ═══════ */}
      <section className="border-y border-border/50 bg-background py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
            Over 200+ brands and agencies work with our hosts.
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-logos w-max gap-12 px-6">
            {[...brandLogos, ...brandLogos].map((name, i) => (
              <div
                key={i}
                className="flex h-10 w-28 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-medium text-muted-foreground/50"
              >
                {name}
              </div>
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
                <p className="text-sm font-mono font-semibold text-primary">
                  {s.step}_
                </p>
                <h3 className="mt-2 text-xl font-bold text-card-foreground sm:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {s.description}
                </p>

                {s.step === 1 && (
                  <div className="mt-6 grid grid-cols-4 gap-2 rounded-xl overflow-hidden">
                    {[
                      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=200&fit=crop",
                      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=200&h=200&fit=crop",
                      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
                      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
                    ].map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt="Portfolio example"
                        className="aspect-square w-full object-cover"
                        loading="lazy"
                      />
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
                    <p className="mt-2 text-sm text-muted-foreground">
                      The brand approved your live stream
                    </p>
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
                <AccordionTrigger className="text-left text-base font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
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
              to="/register"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              See all hosts <ChevronRight className="ml-1 h-3 w-3" />
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
              <p className="mt-2 text-sm text-muted-foreground">
                support@hostify.live
              </p>
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
