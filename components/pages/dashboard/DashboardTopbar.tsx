"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { signOut } from "@/app/actions/auth";

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
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
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
        <button
          className="topbar-icon-btn"
          aria-label="Notifications"
          id="btn-notifications"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span className="notification-dot" />
        </button>
        <div className="relative" ref={profileRef}>
          <button
            className="topbar-icon-btn"
            aria-label="Profile"
            id="btn-profile"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100 z-50">
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
