import React from "react";
import Link from "next/link";
import { Home, MapPin, Layers3, Package, Recycle, Menu, Settings, HelpCircle } from "lucide-react";

const navigationItems = [
	{ label: "Dashboard", icon: Home, href: "#" },
	{ label: "Map", icon: MapPin, href: "#" },
	{ label: "Waste Bank", icon: Layers3, href: "#", active: true },
	{ label: "Points", icon: Package, href: "#" },
	{ label: "Rewards", icon: Recycle, href: "#" },
	{ label: "Education", icon: Menu, href: "#" },
];

export default function CreateReportLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="page-shell">
			<aside className="sidebar">
				<div>
					<div className="brand">Curator</div>

					<nav className="nav-list" aria-label="Sidebar navigation">
						{navigationItems.map((item) => {
							const Icon = item.icon;

							return (
								<Link
									key={item.label}
									href={item.href}
									className={`nav-item ${item.active ? "is-active" : ""}`}
								>
									<Icon className="nav-icon" />
									<span>{item.label}</span>
								</Link>
							);
						})}
					</nav>
				</div>

				<div className="sidebar-bottom">
					<button type="button" className="recycle-button">
						<Recycle className="button-icon" />
						Recycle Now
					</button>

					<div className="secondary-links">
						<button type="button" className="secondary-link">
							<Settings className="secondary-icon" />
							Settings
						</button>
						<button type="button" className="secondary-link">
							<HelpCircle className="secondary-icon" />
							Help
						</button>
					</div>
				</div>
			</aside>

			<div className="content-column">
				<main className="content-area">{children}</main>

				<footer className="footer-bar">
					<div>
						<div className="footer-brand">CURATOR</div>
						<div className="footer-copy">© 2026 TEAM 35 . VINIX7.</div>
					</div>

					<nav className="footer-links" aria-label="Footer navigation">
						<a href="#">Privacy Policy</a>
						<a href="#">Report</a>
						<a href="#">Terms of Service</a>
						<a href="#">Contact Archive</a>
					</nav>
				</footer>
			</div>

			<style>{`
				.page-shell {
					min-height: 100vh;
					display: flex;
					background: #f7f6ef;
					color: #1c1c1b;
					font-family: var(--font-plus-jakarta-sans), sans-serif;
				}

				.sidebar {
					width: 260px;
					flex-shrink: 0;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 24px 16px 24px 22px;
					background: #f5f3eb;
					border-right: 1px solid #e1ddd2;
				}

				.brand {
					margin: 2px 0 32px;
					font-size: 22px;
					font-weight: 700;
					color: #154232;
				}

				.nav-list {
					display: flex;
					flex-direction: column;
					gap: 10px;
				}

				.nav-item {
					display: flex;
					align-items: center;
					gap: 14px;
					padding: 11px 14px;
					border-left: 4px solid transparent;
					border-radius: 0;
					color: #2d302d;
					font-size: 15px;
					text-decoration: none;
				}

				.nav-item.is-active {
					background: #ece8dc;
					border-left-color: #154232;
					font-weight: 700;
				}

				.nav-icon {
					width: 17px;
					height: 17px;
					flex-shrink: 0;
				}

				.sidebar-bottom {
					display: flex;
					flex-direction: column;
					gap: 18px;
				}

				.recycle-button {
					width: 100%;
					border: 0;
					border-radius: 10px;
					background: #154232;
					color: #f5f5f0;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					gap: 6px;
					padding: 14px 12px;
					font-size: 15px;
					font-weight: 700;
					box-shadow: 0 8px 18px rgba(21, 66, 50, 0.18);
				}

				.button-icon {
					width: 15px;
					height: 15px;
				}

				.secondary-links {
					display: flex;
					flex-direction: column;
					gap: 8px;
					color: #7b7c70;
					font-size: 14px;
				}

				.secondary-link {
					border: 0;
					background: transparent;
					color: inherit;
					display: inline-flex;
					align-items: center;
					gap: 6px;
					padding: 0;
					text-align: left;
				}

				.secondary-icon {
					width: 14px;
					height: 14px;
				}

				.content-column {
					flex: 1;
					min-width: 0;
					display: flex;
					flex-direction: column;
					background: #ffffff;
				}

				.content-area {
					flex: 1;
					padding: 36px 48px 0;
					display: flex;
					justify-content: center;
					align-items: stretch;
					position: relative;
				}

				.content-area > * {
					width: 100%;
				}

				.footer-bar {
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 40px;
					padding: 20px 48px;
					background: #0f5a42;
					color: #edf1ea;
					border-top: 1px solid #0c4a36;
					margin-top: auto;
				}

				.footer-brand {
					font-size: 14px;
					font-weight: 700;
					letter-spacing: 0.2em;
				}

				.footer-copy {
					margin-top: 8px;
					font-size: 12px;
					color: rgba(237, 241, 234, 0.9);
				}

				.footer-links {
					display: flex;
					align-items: center;
					gap: 32px;
					font-size: 12px;
					color: rgba(237, 241, 234, 0.9);
				}

				.footer-links a {
					color: inherit;
					text-decoration: none;
					transition: opacity 0.2s ease;
				}

				.footer-links a:hover {
					opacity: 0.8;
				}

				@media (max-width: 768px) {
					.page-shell {
						flex-direction: column;
					}

					.sidebar {
						width: 100%;
					}

					.footer-bar {
						flex-direction: column;
						align-items: flex-start;
					}
				}

				.report-form {
					width: 100%;
					max-width: 820px;
					display: flex;
					flex-direction: column;
					gap: 20px;
				}

				.report-header {
					margin-bottom: 8px;
				}

				.report-header h1 {
					margin: 0;
					font-size: 22px;
					font-weight: 600;
					color: #064E3B;
				}

				.report-form-body {
					display: flex;
					flex-direction: column;
					gap: 18px;
					flex: 1;
				}

				.field {
					display: flex;
					flex-direction: column;
					gap: 6px;
				}

				.field > label {
					font-size: 13px;
					font-weight: 600;
					color: #29483a;
				}

				.field input {
					width: 100%;
					height: 46px;
					border: 1px solid #d8ddd4;
					border-radius: 12px;
					background: #fcfcf8;
					padding: 0 14px;
					font-size: 14px;
					color: #1c1c1b;
					outline: none;
				}

				.field input::placeholder {
					color: #9ca399;
				}

				.photo-dropzone {
					min-height: 170px;
					border: 1px dashed #cfd6c8;
					border-radius: 14px;
					background: #fcfcf8;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					text-align: center;
					gap: 4px;
					padding: 16px;
					cursor: pointer;
				}

				.photo-dropzone input {
					display: none;
				}

				.photo-title {
					font-size: 14px;
					font-weight: 600;
					color: #3f4a42;
				}

				.photo-subtitle {
					font-size: 12px;
					color: #55645c;
				}

				.photo-icon {
					color: #9ca399;
					margin-bottom: 4px;
				}

				.photo-name {
					font-size: 12px;
					color: #154232;
					font-weight: 500;
					margin-top: 4px;
				}

				.waste-type-select {
					width: 100%;
					height: 46px;
					border: 1px solid #d8ddd4;
					border-radius: 12px;
					background: #fcfcf8 url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231c1c1b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e") no-repeat right 12px center;
					background-size: 20px;
					padding: 0 40px 0 14px;
					padding-right: 48px;
					font-size: 14px;
					color: #1c1c1b;
					outline: none;
					font-family: var(--font-plus-jakarta-sans), sans-serif;
					cursor: pointer;
					appearance: none;
					-webkit-appearance: none;
					-moz-appearance: none;
				}

				.waste-type-select:focus {
					border-color: #154232;
					box-shadow: 0 0 0 3px rgba(21, 66, 50, 0.1);
				}

				.waste-type-select option {
					color: #1c1c1b;
					background: #ffffff;
					padding: 8px 0;
				}

				.location-row {
					display: grid;
					grid-template-columns: repeat(2, minmax(0, 1fr));
					gap: 16px;
				}

				.location-meta {
					display: flex;
					flex-direction: column;
					gap: 6px;
				}

				.location-meta span {
					font-size: 13px;
					font-weight: 600;
					color: #29483a;
				}

				.location-meta input {
					width: 100%;
					height: 46px;
					border: 1px solid #d8ddd4;
					border-radius: 12px;
					background: #f6f7f2;
					padding: 0 14px;
					font-size: 14px;
					color: #4a5248;
				}

				.detect-button,
				.submit-button {
					width: 100%;
					height: 46px;
					border: 0;
					border-radius: 8px;
					font-size: 14px;
					font-weight: 600;
				}

				.detect-button {
					background: #154232;
					color: #f5f5f0;
				}

				.submit-button {
					background: #cfd2cb;
					color: #242824;
				}

				.status-text {
					margin: 0;
					font-size: 12px;
					color: #7b7c70;
				}

				@media (max-width: 640px) {
					.location-row {
						grid-template-columns: 1fr;
					}
				}

				@media (max-width: 768px) {
					.sidebar {
						width: 100%;
					}

					.content-area {
						padding: 24px 16px 0;
					}

					.report-card {
						min-height: auto;
					}
				}
			`}</style>
		</div>
	);
}
