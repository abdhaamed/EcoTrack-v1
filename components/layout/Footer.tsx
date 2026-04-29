import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="landing-footer">
      <div className="footer-inner">
        <Link href="/" className="footer-logo">
          EcoTrack
        </Link>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact</a>
        </nav>
        <p className="footer-copy">© 2026 Team 35 – Vinix7</p>
      </div>
    </footer>
  );
};
