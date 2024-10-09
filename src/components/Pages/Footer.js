import React from 'react';
import './Footer.css'; // Add your custom CSS for the footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p id="footer-h">&copy; 2024 Kim&Kwon Book. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
