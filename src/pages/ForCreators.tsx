import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  DollarSign,
  Shield,
  FileText,
  Globe,
  Zap,
  Play,
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

/* ─── TikTok-style video placeholders ─── */
const videoThumbs = [
  "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300&h=530&fit=crop",
  "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=300&h=530&fit=crop",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=530&fit=crop",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=530&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=530&fit=crop",
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=530&fit=crop",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=530&fit=crop",
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=530&fit=crop",
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
      "Chat directly with brands, negotiate your rates, and lock in live stream deals — all inside gmv.live.",
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
    q: "How do I get booked on gmv.live?",
    a: "Once your profile is live, brands can discover you through our marketplace, view your portfolio, and reach out directly with product offers and stream opportunities.",
  },
  {
    q: "Does gmv.live take a cut of my earnings?",
    a: "gmv.live does not take a percentage of your sales commissions. We charge brands a platform fee — your rates stay yours.",
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
    <div className="min-h-screen bg-[hsl(0,0%,3%)] text-white">
      <Navbar />

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
        {/* Decorative blobs - TikTok colors */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[hsl(349,98%,56%)] opacity-10 blur-[120px] pointer-events-none" />
        <div className="absolute top-20 -right-40 w-[500px] h-[500px] rounded-full bg-[hsl(174,91%,55%)] opacity-10 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(349,98%,56%)]">
            Become a Live Shopping Host
          </p>

          <h1 className="mt-6 text-5xl font-black leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
            Where{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Top Brands</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-[hsl(349,98%,56%)] opacity-40 rounded-sm -z-0 sm:h-4" />
            </span>{" "}
            Find Their Live Shopping Hosts.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-white/60 sm:text-xl">
            Get paid to share your passion online.
          </p>
        </div>
      </section>

      {/* ═══════ PERKS ═══════ */}
      <section className="pb-10 sm:pb-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {perks.map((p) => (
              <div
                key={p.title}
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
              >
                <p.icon className="h-5 w-5 shrink-0 text-[hsl(174,91%,55%)]" />
                <span className="text-sm font-medium text-white/80">{p.title}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button
              size="lg"
              className="bg-[hsl(349,98%,56%)] hover:bg-[hsl(349,98%,46%)] text-white border-0 rounded-full px-8 text-base font-bold"
              asChild
            >
              <Link to="/waitlist">
                Join Now — It's Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════ VIDEO CAROUSEL ═══════ */}
      <section className="py-10 sm:py-16 overflow-hidden">
        <div className="relative">
          <div className="flex animate-scroll-logos gap-4 px-4 w-max">
            {[...videoThumbs, ...videoThumbs].map((src, i) => (
              <div
                key={i}
                className="relative shrink-0 w-[160px] sm:w-[180px] rounded-2xl overflow-hidden border border-white/10 group"
              >
                <img
                  src={src}
                  alt="Creator content"
                  className="aspect-[9/16] w-full object-cover"
                  loading="lazy"
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(349,98%,56%)] text-white">
                    <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
                  </div>
                </div>
                {/* TikTok-style bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ MONEY STAT ═══════ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-6xl font-black tracking-tight text-[hsl(349,98%,56%)] sm:text-7xl lg:text-8xl">
            +$2,000,000
          </p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-[hsl(349,98%,56%)]/70">
            paid out to our hosts
          </p>

          <div className="mt-8 flex justify-center -space-x-3">
            {communityNames.map((name, i) => (
              <div
                key={name}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[hsl(0,0%,3%)] bg-white/10 text-xs font-semibold text-white/70"
                style={{ zIndex: communityNames.length - i }}
              >
                {name.split(" ").map((n) => n[0]).join("")}
              </div>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-lg text-base text-white/50">
            Real partnerships. Real payouts. gmv.live is where live hosts get the
            recognition, and revenue, they deserve.
          </p>

          <Button
            size="lg"
            className="mt-8 bg-[hsl(349,98%,56%)] hover:bg-[hsl(349,98%,46%)] text-white border-0 rounded-full px-8"
            asChild
          >
            <Link to="/waitlist">
              Join gmv.live Now <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ═══════ BRAND TRUST BAR ═══════ */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-sm font-medium text-white/40">
            Over 200+ brands and agencies work with our hosts.
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-logos w-max gap-16 px-6">
            {[...brandNames, ...brandNames].map((name, i) => (
              <span
                key={i}
                className="shrink-0 text-lg font-bold tracking-tight text-white/20 select-none"
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
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-white/50">
            From sign-up to payout — here's how gmv.live works for creators.
          </p>

          <div className="mt-14 space-y-12">
            {steps.map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8"
              >
                <p className="text-sm font-mono font-semibold text-[hsl(349,98%,56%)]">{s.step}_</p>
                <h3 className="mt-2 text-xl font-bold sm:text-2xl">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-white/50">{s.description}</p>

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
                  <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 shrink-0 rounded-full bg-[hsl(349,98%,56%)]/20" />
                      <div className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white/60">
                        Hi! We'd love you to host a live stream for our new skincare line. Interested?
                      </div>
                    </div>
                    <div className="flex items-start justify-end gap-3">
                      <div className="rounded-lg bg-[hsl(349,98%,56%)] px-3 py-2 text-sm text-white">
                        Sounds great! Here's my rate 🎬
                      </div>
                    </div>
                  </div>
                )}

                {s.step === 3 && (
                  <div className="mt-6 space-y-3">
                    <div className="rounded-xl bg-[hsl(174,91%,55%)]/10 border border-[hsl(174,91%,55%)]/20 p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Your Payment</span>
                        <span className="font-bold">$550</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-sm text-[hsl(174,91%,55%)]">
                        <CheckCircle2 className="h-4 w-4" /> Secured
                        <span className="ml-auto text-white/40 text-xs">1h ago</span>
                      </div>
                    </div>
                    <div className="rounded-xl bg-[hsl(174,91%,55%)]/10 border border-[hsl(174,91%,55%)]/20 p-4">
                      <span className="font-semibold">Your Contract</span>
                      <div className="mt-2 space-y-1 text-sm text-[hsl(174,91%,55%)]">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" /> Signed by you
                          <span className="ml-auto text-white/40 text-xs">1h ago</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" /> Signed by brand
                          <span className="ml-auto text-white/40 text-xs">2h ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {s.step === 4 && (
                  <div className="mt-6 flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-8 text-center">
                    <p className="text-lg font-bold">Congratulations! 🎉</p>
                    <p className="mt-4 text-4xl font-black text-[hsl(349,98%,56%)]">+ $550</p>
                    <p className="mt-2 text-sm text-white/50">The brand approved your live stream</p>
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
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Still Have Questions?
          </h2>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-white/10">
                <AccordionTrigger className="text-left text-base font-medium text-white/90 hover:text-white">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-white/50">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Join Hundreds of Live Hosts
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/50">
            Focus on selling live for the best brands with our optimized tools
            and resources. Hundreds of hosts have already joined gmv.live and are
            thriving — now it's your turn!
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Button
              size="lg"
              className="bg-[hsl(349,98%,56%)] hover:bg-[hsl(349,98%,46%)] text-white border-0 rounded-full px-8"
              asChild
            >
              <Link to="/waitlist">
                Join gmv.live <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Link
              to="/for-brands"
              className="inline-flex items-center text-sm font-medium text-white/40 hover:text-white transition-colors"
            >
              Are you a brand? <ChevronRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-white/10 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-lg font-bold">gmv.live</p>
              <p className="mt-2 text-sm text-white/40">support@gmv.live</p>
            </div>
            <div className="space-y-2 text-sm text-white/40">
              <Link to="/for-brands" className="block hover:text-white">For Brands</Link>
              <Link to="/" className="block hover:text-white">For Creators</Link>
              <Link to="/coming-soon" className="block hover:text-white">Pricing</Link>
            </div>
            <div className="space-y-2 text-sm text-white/40">
              <Link to="/coming-soon" className="block hover:text-white">Privacy Policy</Link>
              <Link to="/coming-soon" className="block hover:text-white">Terms of Use</Link>
            </div>
          </div>
          <p className="mt-8 text-xs text-white/30">
            © {new Date().getFullYear()} gmv.live. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ForCreators;
