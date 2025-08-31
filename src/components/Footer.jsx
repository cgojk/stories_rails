import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Site Info or Logo */}
        <div className="footer-brand">
          <Link to="/">
                  <img src="/images/logo4_1.png" className="footer-logo" alt="Podcast logo" />

               </Link>

          <p className="paragraph_footer">&copy; {new Date().getFullYear()} Where the Rails meet memories.</p>
          <p className="paragraph_footer">All rights reserved.</p>

        </div>

        {/* Footer Navigation */}
        <ul className="footer-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/podcasts">Podcasts community</Link></li>
          <li><Link to="/contact">Historical Events</Link></li>
          <li><Link to="/press">Events & Gallery</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>
    </footer>
  );
}