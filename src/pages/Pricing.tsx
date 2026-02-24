import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Check, X, ChevronRight, ShieldCheck, DollarSign, Users } from "lucide-react";

const comparisonRows = [
  { feature: "Free to start — no upfront cost", us: true, them: false },
  { feature: "Vetted college student creators", us: true, them: false },
  { feature: "Escrow payments with guaranteed refund", us: true, them: false },
  { feature: "Creator goes live or money back", us: true, them: false },
  { feature: "Software-powered — low fees", us: true, them: false },
  { feature: "End-to-end campaign management", us: true, them: "Partial" },
  { feature: "Direct messaging with creators", us: true, them: "Partial" },
  { feature: "Real-time analytics dashboard", us: true, them: "Partial" },
  { feature: "No monthly subscription", us: true, them: false },
];

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="cloud-blob bg-primary w-[500px] h-[500px] -top-40 -left-40 absolute" />
        <div className="cloud-blob bg-accent w-[400px] h-[400px] top-20 -right-40 absolute" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Free to Use. We Only Win When You Win.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            There's zero cost to get started. We make money by taking a small commission on successful matchmaking and campaign management — that's it. Your success is literally our business model.
          </p>
        </div>
      </section>

      {/* ═══════ VALUE PROPS ═══════ */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">Commission-Based</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We take a small commission on each booking. No subscriptions, no hidden fees, no cost until a campaign runs.
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">Escrow Protection</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Your payment is held in escrow. If the creator doesn't fulfill their part of the contract, you get your money back — guaranteed.
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">Software-Powered</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Because we're a software platform — not an agency — our fees stay dramatically lower than traditional alternatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ COMPARISON TABLE ═══════ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            gmv.live vs. The Rest
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">
            See how we stack up against agencies and other platforms.
          </p>

          <div className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-left font-medium text-muted-foreground">Feature</th>
                  <th className="p-4 text-center font-semibold text-primary">gmv.live</th>
                  <th className="p-4 text-center font-medium text-muted-foreground">Others</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="p-4 text-card-foreground">{row.feature}</td>
                    <td className="p-4 text-center">
                      {row.us === true ? (
                        <Check className="mx-auto h-5 w-5 text-primary" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-destructive" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {row.them === true ? (
                        <Check className="mx-auto h-5 w-5 text-primary" />
                      ) : row.them === "Partial" ? (
                        <span className="text-xs font-medium text-muted-foreground">Partial</span>
                      ) : (
                        <X className="mx-auto h-5 w-5 text-destructive" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to Go Live?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Join the waitlist and start connecting with vetted college creators — completely free.
          </p>
          <div className="mt-10">
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

export default Pricing;
