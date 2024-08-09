import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import httpClient from '../../../utility/httpClient';
import { Footer } from '../../../common/Footer/Footer.component';
import './Home.component.css';

export const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await httpClient.GET('/product/view_product');
                setProducts(response.data);
                console.log("response is", response.data)
            } catch (error) {
                console.error('There was an error fetching the products!', error);
            }
        };

        fetchProducts();
    }, []);

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
                    {products.map((product) => {
                        const imgUrl = product.product_img?.[0] ? `${product.product_img?.[0]}` : "";
                        return (
                            <div className="col-lg-4 col-md-6 mb-4" key={product._id}>
                                <div className="card">
                                    {imgUrl && (
                                        <img
                                            src={imgUrl}
                                            className="card-img-top"
                                            alt={product.product_name}
                                        />
                                    )}

                                    <div className="card-body">
                                        <h5 className="card-title">{product.product_name}</h5>
                                        <p className="card-text">${product.product_price?.toFixed(2)}</p>
                                        <button className="btn btn-primary">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
};
