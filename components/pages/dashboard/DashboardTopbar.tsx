"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { signOut } from "@/app/actions/auth";
import { Search, Bell, User, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function DashboardTopbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("q")?.toString() || "",
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Update URL search params when search query changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("q", searchQuery);
    } else {
      params.delete("q");
    }

    // Debounce the URL update
    const timeout = setTimeout(() => {
      replace(`${pathname}?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery, pathname, replace, searchParams]);

  // Handle click outside profile dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="dashboard-topbar">
      {/* Search */}
      <div className="topbar-search">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Cari laporan atau edukasi..."
          id="dashboard-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="topbar-actions">
        <ThemeToggle />
        <button
          className="topbar-icon-btn"
          aria-label="Notifications"
          id="btn-notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="notification-dot" />
        </button>
        <div className="relative" ref={profileRef}>
          <button
            className="topbar-icon-btn"
            aria-label="Profile"
            id="btn-profile"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <User className="w-5 h-5" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100 z-50">
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
