import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return ( 
    <footer className="bg-body-tertiary text-dark py-4 ">
      <div className="container text-center">
        <h5 className="mb-3">All Rights Reserved</h5>
        <p className="mb-0">
          <Link to="/about" className="text-decoration-none text-dark mx-2">
            About
          </Link>
          |
          <Link to="/contact" className="text-decoration-none text-dark mx-2">
            Contact
          </Link>
          |
          <Link to="/policy" className="text-decoration-none text-dark mx-2">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
