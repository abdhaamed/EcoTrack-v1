import React from "react";

export default function DashboardLoading() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-8 w-48 bg-gray-200 rounded"></div>
        <div className="h-10 w-64 bg-gray-200 rounded"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-xl border border-gray-200"></div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-96 bg-gray-100 rounded-xl border border-gray-200"></div>
        <div className="space-y-4">
          <div className="h-8 w-32 bg-gray-200 rounded"></div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-gray-50 rounded-lg border border-gray-100"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
