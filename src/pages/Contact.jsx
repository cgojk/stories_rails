import React from "react";
import FormsContact from "../components/FormsContact.jsx";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube, 
  FaPinterest 
} from "react-icons/fa";

export default function Contact() {
  return (
    <section className="contact-section container">
      <div className="contact-header center">
        <h1 className="contact-title">Contact Us</h1>
        <p className="title_section-sm__contact">
          We’d love to hear from you! Whether you have a question, feedback, or 
          just want to say hi, feel free to reach out.
        </p>
      </div>

      <div className="contact-wrapper">
        {/* Contact Form */}
        <div className="contact-form">
          <FormsContact />
        </div>

        {/* Social Media */}
        <div className="contact-info__social">
          <h2 className="subtitle_contact">Stay Connected</h2>
          <p className="title_section-sm_contact">
            Follow us on social media for updates and news:
          </p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook size={32} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter size={32} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram size={32} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={32} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube size={32} />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <FaPinterest size={32} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
