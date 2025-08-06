import { BarChart3, Calendar, Home, Settings, Users, FileText, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

export function DashboardSidebar({ activeItem, onItemClick }: SidebarProps) {
  const menuItems = [
    { id: "overview", label: "Vue d'ensemble", icon: Home },
    { id: "analytics", label: "Analyses", icon: BarChart3 },
    { id: "users", label: "Utilisateurs", icon: Users },
    { id: "reports", label: "Rapports", icon: FileText },
    { id: "trends", label: "Tendances", icon: TrendingUp },
    { id: "calendar", label: "Calendrier", icon: Calendar },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  return (
    <div className="w-64 bg-card border-r border-border h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl">Tableau de Bord</h2>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeItem === item.id ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => onItemClick(item.id)}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
}