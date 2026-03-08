import { ReactNode } from "react";
import { Link } from "react-router-dom";
import OnboardingProgress from "./OnboardingProgress";

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  showSkip?: boolean;
  onSkip?: () => void;
}

const OnboardingLayout = ({ children, currentStep, totalSteps, showSkip, onSkip }: OnboardingLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
          <Link to="/" className="text-xl font-bold text-foreground">🤩 gmv.live</Link>
          {showSkip && onSkip && (
            <button
              onClick={onSkip}
              className="min-h-[44px] text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip for now
            </button>
          )}
        </div>
      </div>
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
        <OnboardingProgress currentStep={currentStep} totalSteps={totalSteps} />
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
