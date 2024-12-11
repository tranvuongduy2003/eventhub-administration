import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  Building2,
  ChevronDown,
  LayoutDashboard,
  LockIcon,
  ScrollText,
  Settings,
  Shield,
  UserCircle,
  Users,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isPathActive = (path: string) => currentPath.startsWith(path);

  const isAdminSectionActive = ["/users", "/roles", "/audit-logs"].some(
    (path) => isPathActive(path)
  );
  const isSecuritySectionActive = ["/permissions", "/security-settings"].some(
    (path) => isPathActive(path)
  );

  return (
    <div className="relative w-full min-h-screen p-6 pt-0 border-r bg-background">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <img src="/eventhub-icon.png" alt="EventHub" className="w-8 h-8" />
          <h2 className="text-lg font-semibold">EventHub</h2>
        </div>
      </div>
      <nav className="space-y-2">
        <Link to="/dashboard">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2",
              isPathActive("/dashboard") && "bg-accent text-white"
            )}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Button>
        </Link>

        <Collapsible defaultOpen={isAdminSectionActive}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn("w-full justify-start gap-2")}
            >
              <Building2 className="w-4 h-4" />
              Administration
              <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-4 space-y-2">
            <Link to="/users">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2",
                  isPathActive("/users") && "bg-accent text-white"
                )}
              >
                <Users className="w-4 h-4" />
                Users
              </Button>
            </Link>
            <Link to="/roles">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2",
                  isPathActive("/roles") && "bg-accent text-white"
                )}
              >
                <UserCircle className="w-4 h-4" />
                Roles
              </Button>
            </Link>
            <Link to="/audit-logs">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2",
                  isPathActive("/audit-logs") && "bg-accent text-white"
                )}
              >
                <ScrollText className="w-4 h-4" />
                Audit Logs
              </Button>
            </Link>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen={isSecuritySectionActive}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="justify-start w-full gap-2">
              <Shield className="w-4 h-4" />
              Security
              <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-4 space-y-2">
            <Link to="/permissions">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2",
                  isPathActive("/permissions") && "bg-accent text-white"
                )}
              >
                <LockIcon className="w-4 h-4" />
                Permissions
              </Button>
            </Link>
            <Link to="/security-settings">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2",
                  isPathActive("/security-settings") && "bg-accent text-white"
                )}
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </Link>
          </CollapsibleContent>
        </Collapsible>
      </nav>
    </div>
  );
};

export default Sidebar;
