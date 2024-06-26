import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Product.component.css';
import { Footer } from '../../common/Footer/Footer.component';

const productData = {
    1: {
        id: 1,
        name: 'Product 1',
        description: 'This is a detailed description of Product 1.',
        price: 19.99,
        imageUrl: 'https://via.placeholder.com/300'
    },
    2: {
        id: 2,
        name: 'Product 2',
        description: 'This is a detailed description of Product 2.',
        price: 29.99,
        imageUrl: 'https://via.placeholder.com/300'
    },
    3: {
        id: 3,
        name: 'Product 3',
        description: 'This is a detailed description of Product 3.',
        price: 39.99,
        imageUrl: 'https://via.placeholder.com/300'
    }
};

export const Product = () => {
    const { productId } = useParams();
    const product = productData[productId];
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        // Logic to add product to cart
        console.log(`Added ${quantity} of ${product.name} to cart.`);
    };

    if (!product) {
        return (
            <div className="product-page container fade-in">
                <h2>Product not found</h2>
                <p>We couldn't find the product you're looking for. Please go back to the <Link to="/" className={"text-primary"}>Home Page</Link>.</p>
            </div>
        );
    }

    return (
        <div className="product-page container fade-in">
            <div className="row">
                <div className="col-md-6">
                    <img src={product.imageUrl} alt={product.name} className="img-fluid bounce-in" />
                </div>
                <div className="col-md-6">
                    <h1>{product.name}</h1>
                    <p className="price">${product.price.toFixed(2)}</p>
                    <p>{product.description}</p>
                    <div className="quantity">
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            min="1"
                        />
                    </div>
                    <button className="btn btn-primary mt-3" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};
