const logoPlaceholders = Array.from({ length: 10 }, (_, i) => `Brand ${i + 1}`);

const SocialProofBar = () => {
  return (
    <section className="border-y border-border/50 bg-background py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
          Trusted by 200+ e-commerce brands going live every week.
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll-logos w-max gap-12 px-6">
          {[...logoPlaceholders, ...logoPlaceholders].map((name, i) => (
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
  );
};

export default SocialProofBar;
