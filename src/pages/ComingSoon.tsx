import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ComingSoon = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Coming Soon
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        We're Building Something Big
      </p>
      <Button className="mt-8" asChild>
        <Link to="/">← Back to Home</Link>
      </Button>
    </div>
  );
};

export default ComingSoon;
