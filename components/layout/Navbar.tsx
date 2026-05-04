import Link from "next/link";

export const Navbar = () => {
  return (
    <header>
      <nav className="landing-navbar">
        <Link href="/" className="logo">
          <span className="logo-badge">BETA</span>
          EcoTrack
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/#features">Fitur</Link>
          </li>
          <li>
            <Link href="/#how-it-works">Cara Kerja</Link>
          </li>
          <li>
            <Link href="/#edukasi">Edukasi</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/services">Services</Link>
          </li>
          <li>
            <Link href="/auth/register" className="nav-cta">
              Bergabung / Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
