import Link from "next/link";

export function LandingNavbar() {
  return (
    <header>
      <nav className="landing-navbar">
        <Link href="#" className="logo">
          <span className="logo-badge">BETA</span>
          EcoTrack
        </Link>
        <ul className="nav-links">
          <li>
            <a href="#features">Fitur</a>
          </li>
          <li>
            <a href="#how-it-works">Cara Kerja</a>
          </li>
          <li>
            <a href="#edukasi">Edukasi</a>
          </li>
          <li>
            <a href="#cta" className="nav-cta">
              Bergabung
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
