import React, { useState, useEffect } from 'react';
import { Button } from '../../../common/Button/Button.component';
import { Link } from 'react-router-dom';
import httpClient from './../../../utility/httpClient';
import { Footer } from '../../../common/Footer/Footer.component';
import './Product.component.css';

const IMG_URL = 'http://localhost:8000/file/images';

export const Product = () => {
    // const { productId } = useParams();
    const [products, setProducts] = useState(null);
    const [quantity, setQuantity] = useState(1);
    // const [isAddingToCart, setIsAddingToCart] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await httpClient.GET(`/product/view_product`);
                setProducts(response.data);
            } catch (error) {
                console.error('There was an error fetching the product!', error);
            }
        };

        fetchProduct();
    }, []);

    // const handleAddToCart = () => {
    //     setIsAddingToCart(true);
    //     // Simulating a call to the backend to add the product to the cart
    //     setTimeout(() => {
    //         console.log(`Added ${quantity} of ${product.product_name} to cart.`);
    //         setIsAddingToCart(false);
    //     }, 1000);
    // };

    if (!products) {
        return (
            <div className="product-page container fade-in">
                <h2>Product not found</h2>
                <p>We couldn't find the product you're looking for. Please go back to the <Link to="/" className="text-primary">Home Page</Link>.</p>
            </div>
        );
    }

    return (
        <div className="product-page container fade-in">
            <div className="row">
                <div className="col-md-6">
                    {/* <img src={`http://localhost:8000${product.product_img?.[0]}`} alt={product.product_name} className="img-fluid bounce-in" /> */}
                </div>
                <div className="col-md-6">
                    <h1>{products.product_name}</h1>
                    <p className="price">${products.product_price}</p>
                    <p>{products.product_description}</p>
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
                    <Button
                        enabledLabel="Add to Cart"
                        disabledLabel="Adding to Cart..."
                        // isSubmitting={isAddingToCart}
                        isValidForm={true}
                        // onClick={handleAddToCart}
                    />
                </div>
            </div>

            <div className="container m-5">
                <div className="row">
                {products.map((product) => {
                        // Get the first image from the product_img array
                        const firstImage = product.product_img?.[0];

                        return (
                            <div className="col-lg-4 col-md-6 mb-4" key={product._id}>
                                <div className="card">
                                    {/* Render the first image if it exists */}
                                    {firstImage ? (
                                        <img
                                            src={`${IMG_URL}/${firstImage}`}
                                            className="card-img-top"
                                            alt={product.product_name}
                                        />
                                    ) : (
                                        <img
                                            src="path/to/placeholder.jpg" // Placeholder image if no product_img
                                            className="card-img-top"
                                            alt="Placeholder"
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
