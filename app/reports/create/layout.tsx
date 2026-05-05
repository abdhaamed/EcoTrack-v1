import React from "react";
import DashboardSidebar from "@/components/pages/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/pages/dashboard/DashboardTopbar";

export default function CreateReportLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="dashboard-layout">
			<DashboardSidebar />
			<main className="dashboard-main">
				<DashboardTopbar />
				<div className="dashboard-content">
					{children}
				</div>
			</main>
		</div>
	);
}
