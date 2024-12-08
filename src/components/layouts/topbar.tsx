import { useTheme } from "@/components/theme/theme-provider";
import { Button } from "@/components/ui/button";
import { ThemeSwitch } from "@/components/ui/switch";
import { useAuthStore } from "@/store/auth";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const { profile, logout } = useAuthStore();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ThemeSwitch
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
          />
        </div>
        <div
          className="flex items-center gap-2 border rounded-full px-2.5 py-1 hover:bg-accent/10 transition-colors cursor-pointer"
          onClick={() => navigate("/settings")}
        >
          <div className="rounded-full bg-primary/10 p-2">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {profile?.fullName || profile?.email || "Guest"}
            </span>
            <span className="text-xs text-muted-foreground">
              {profile?.roles?.[0] || "No Role"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2 hover:bg-destructive/20 hover:text-destructive hover:font-medium"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
