"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, Home, Award, Gift, BookOpen, Recycle, Settings, HelpCircle, MapPin, Truck } from "lucide-react";

const navItems = [
  {
    label: "Map",
    href: "/dashboard",
    icon: <Map className="w-5 h-5" />,
  },
  {
    label: "Jemput Sampah",
    href: "/dashboard/pickup",
    icon: <Truck className="w-5 h-5" />,
  },
  {
    label: "Points",
    href: "/dashboard/points",
    icon: <Award className="w-5 h-5" />,
  },
  {
    label: "Rewards",
    href: "/dashboard/rewards",
    icon: <Gift className="w-5 h-5" />,
  },
  {
    label: "Education",
    href: "/articles",
    icon: <BookOpen className="w-5 h-5" />,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="dashboard-sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <h1>The Collector</h1>
        <span>Living Archive</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-nav-item ${isActive ? "active" : ""}`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Recycle Now FAB */}
      <button className="recycle-fab">
        <Recycle className="w-5 h-5" />
        Recycle Now
      </button>

      {/* Footer */}
      <div className="sidebar-footer" style={{ marginTop: "12px" }}>
        <button className="sidebar-footer-item">
          <Settings className="w-5 h-5" />
          Settings
        </button>
        <button className="sidebar-footer-item">
          <HelpCircle className="w-5 h-5" />
          Help
        </button>
      </div>
    </aside>
  );
}
