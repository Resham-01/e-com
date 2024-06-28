import React from 'react';
import { Footer } from '../../../common/Footer/Footer.component';
import "./About.component.css"

export const AboutUs = () => {
    return (
        <div className="fade-in">
            {/* About Us Section */}
            <section className="about-us-section">
                <div className="container">
                    <h2 className="section-title">About Us</h2>
                    <p className="section-description">
                        E-Shop is your ultimate destination for finding amazing products online. We strive to provide the best shopping experience for our customers by offering a wide range of high-quality products at affordable prices.
                    </p>
                    <p className="section-description">
                        Our mission is to make online shopping convenient, enjoyable, and secure for everyone. Whether you're looking for electronics, fashion, home essentials, or gifts, E-Shop has everything you need.
                    </p>
                    <h3 className="sub-section-title">Our Vision</h3>
                    <p className="sub-section-description">
                        At E-Shop, we envision creating a seamless online shopping experience that exceeds our customers' expectations. We aim to become the go-to platform for people worldwide to discover and purchase their favorite products effortlessly.
                    </p>
                    <h3 className="sub-section-title">Our Values</h3>
                    <ul className="value-list">
                        <li className="value-item">Customer Satisfaction: Ensuring our customers are happy and satisfied with their shopping experience is our top priority.</li>
                        <li className="value-item">Quality Products: We source only the highest quality products from trusted suppliers to guarantee customer satisfaction.</li>
                        <li className="value-item">Innovation: We continuously innovate and adapt to provide the latest trends and technologies in the online shopping space.</li>
                        <li className="value-item">Integrity: We uphold honesty, transparency, and ethical business practices in all our interactions.</li>
                        <li className="value-item">Community Engagement: We actively engage with our community to understand their needs and preferences, fostering a strong bond with our customers.</li>
                    </ul>
                </div>
            </section>
            <Footer />
        </div>
    );
};
