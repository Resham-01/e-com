import { Link } from "react-router-dom";

const IMG_URL = 'http://localhost:8000/file/images';

export const ProductInformation = ({ productData, deleteProduct, deleteCallback }) => {
    const handleDelete = (e) => {
        e.preventDefault();
        deleteCallback();
    };
    console.log("jhdcjdcnjd,", productData)

    return (
        <>
            <div className="w-75 m-auto">
                <div className="card">
                    <div className="container-fluid">
                        <div className="wrapper row">
                            <div className="preview col-md-6">
                                <div className="preview-pic tab-content">
                                    {productData.product_img && productData.product_img.length > 0 ? (
                                        productData.product_img.map((image, index) => (
                                            <div
                                                key={index}
                                                className={`tab-pane ${index === 0 ? "active" : ""}`}
                                                id={`pic-${index + 1}`}
                                            >
                                                <img src={`${IMG_URL}/${image}`} alt={`pic-${index + 1}`} />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="tab-pane active" id="pic-1">
                                            <img
                                                src="https://via.placeholder.com/860x500?text=No+Image+Available"
                                                alt="No image available"
                                            />
                                        </div>
                                    )}
                                </div>
                                <ul className="preview-thumbnail nav nav-tabs">
                                    {productData.product_img && productData.product_img.length > 0 ? (
                                        productData.product_img.map((image, index) => (
                                            <li key={index} className={index === 0 ? "active" : ""}>
                                                <Link to={""} data-target={`#pic-${index + 1}`} data-toggle="tab">
                                                    <img src={`${IMG_URL}/${image}`} alt={`thumbnail-${index + 1}`} />
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="active">
                                            <Link to={""} data-target="#pic-1" data-toggle="tab">
                                                <img
                                                    src="https://via.placeholder.com/150x150?text=No+Image+Available"
                                                    alt="No image available"
                                                />
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="details col-md-6">
                                <h3 className="product-title">{productData.product_name}</h3>
                                <div className="rating">
                                    <div className="stars">
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star"></span>
                                        <span className="fa fa-star"></span>
                                    </div>
                                    <span className="review-no">41 reviews</span>
                                </div>
                                <p className="product-description">{productData.product_description}</p>
                                <h4 className="price">current price: <span>NRS {productData.product_price}</span></h4>
                                <p className="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
                                <h5 className="sizes">sizes:
                                    <span className="size" data-toggle="tooltip" title="small">s</span>
                                    <span className="size" data-toggle="tooltip" title="medium">m</span>
                                    <span className="size" data-toggle="tooltip" title="large">l</span>
                                    <span className="size" data-toggle="tooltip" title="xtra large">xl</span>
                                </h5>
                                <h5 className="colors">colors:
                                    {productData.productColor}
                                </h5>
                                {deleteProduct ? (
                                    <div className="action">
                                        <button className="btn btn-secondary btn-lg me-3" type="button">
                                            <Link to={'/admin/product/view'}>Cancel</Link>
                                        </button>
                                        <button className="btn btn-danger btn-lg" type="button" onClick={handleDelete}>Delete</button>
                                    </div>
                                ) : (
                                    <button className="btn btn-secondary btn-lg me-3" type="button">
                                        <Link to={'/admin/product/view'}>Back to List</Link>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
