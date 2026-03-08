import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, MessageSquare, Package, User, Settings } from "lucide-react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { role, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <Link to="/feed" className="text-lg font-bold text-foreground">GMV</Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/feed">Feed</Link>
            </Button>
            {role === "brand" && (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/my-products"><Package className="mr-1 h-4 w-4" />Products</Link>
              </Button>
            )}
            <Button variant="ghost" size="sm" asChild>
              <Link to="/messages"><MessageSquare className="mr-1 h-4 w-4" />Messages</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/settings/profile"><Settings className="mr-1 h-4 w-4" />Settings</Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSignOut} title="Sign out">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
};

export default AppLayout;
