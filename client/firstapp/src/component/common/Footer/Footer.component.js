import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.component.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export const Footer = (props) => {
    return (
        <footer className="footer bg-light text-center text-lg-start mt-4">
            <div className="container p-4">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">E-Shop</h5>
                        <p>Discover the best deals on your favorite products at E-Shop. Your satisfaction is our priority.</p>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0 quick-links">
                        <h5 className="text-uppercase">Quick Links</h5>
                        <ul className="list-unstyled mb-0">
                            <li>
                                <Link to="/" className="text-dark">Home</Link>
                            </li>
                            <li>
                                <Link to="/shop" className="text-dark">Shop</Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-dark">About</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-dark">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0 follow-us">
                        <h5 className="text-uppercase">Follow Us</h5>
                        <div className="social-icons">
                            <a href="https://www.facebook.com" className="text-dark" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebook} size="2x" />
                            </a>
                            <a href="https://www.twitter.com" className="text-dark" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faTwitter} size="2x" />
                            </a>
                            <a href="https://www.instagram.com" className="text-dark" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} size="2x" />
                            </a>
                            <a href="https://www.linkedin.com" className="text-dark" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLinkedin} size="2x" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center p-3 bg-dark text-light">
                © 2024 E-Shop. All rights reserved.
            </div>
        </footer>
    );
};
