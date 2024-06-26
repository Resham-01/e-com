import React from 'react';
import { Link } from 'react-router-dom';
import './Home.component.css';
import { Footer } from '../../common/Footer/Footer.component';

export const Home = (prop) => {
    return (
        <div className="fade-in">

            {/* Hero Section */}
            <div className="jumbotron jumbotron-fluid text-center">
                <div className="container">
                    <h1 className="display-4">Welcome to E-Shop</h1>
                    <p className="lead">Your one-stop shop for all things amazing!</p>
                    <Link to="/shop" className="btn btn-primary btn-lg bounce-in">Shop Now</Link>
                </div>
            </div>

            {/* Product Showcase */}
            <div className="container">
                <div className="row">
                    {["Product 1", "Product 2", "Product 3"].map((product, index) => (
                        <div className="col-lg-4 col-md-6 mb-4" key={index}>
                            <div className="card">
                                <img src={`https://via.placeholder.com/300?text=${product}`} className="card-img-top" alt={product} />
                                <div className="card-body">
                                    <h5 className="card-title">{product}</h5>
                                    <p className="card-text">${(index + 1) * 10 + 9.99}</p>
                                    <button className="btn btn-primary">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
};
