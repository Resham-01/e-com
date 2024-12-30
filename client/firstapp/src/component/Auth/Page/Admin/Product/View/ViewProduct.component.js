import React, { useEffect, useState } from "react";
import httpClient from "../../../../../utility/httpClient";
import { ErrorHandler } from "../../../../../utility/ErrorHandler";
import { Sidebar } from "../../../../../common/Sidebar/Sidebar.component";
import { Loader } from "../../../../../common/Loader/Loader.component";
import { DateFormat } from "../../../../../utility/DateFormat";
import { Link } from "react-router-dom";
import "./ViewProduct.component.css";

const IMG_URL = 'http://localhost:8000/file/images';

export const ViewProduct = props => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setIsLoading(true);
        if (props.searchResult) {
            console.log("props is: ", props.searchResult);
            setProducts(props.searchResult);
            setFilteredProducts(props.searchResult); // Initialize both products and filteredProducts
            setIsLoading(false);
        } else {
            httpClient.GET("/product/view_product")
                .then(response => {
                    setProducts(response.data);
                    setFilteredProducts(response.data); // Initialize filteredProducts with the full product list
                })
                .catch(err => {
                    ErrorHandler(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [props.searchResult]);

    // Handle search query input
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter products based on the search query
        const filtered = products.filter(product =>
            product.product_name.toLowerCase().includes(query) ||
            (product.product_category?.category_name.toLowerCase() || "").includes(query) ||
            product.product_price.toString().includes(query) ||
            product.productColor.toLowerCase().includes(query) ||
            DateFormat(product.mfg, 'LLL ').toLowerCase().includes(query) ||
            DateFormat(product.expiryDate, 'LLL ').toLowerCase().includes(query)
        );

        setFilteredProducts(filtered);
    };

    return (
        <>
            <div className="row pt-0 mt-0">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9 shadow-lg p-5">
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Search by product name, category, price, color, or date"
                        value={searchQuery}
                        onChange={handleSearch}
                    />

                    {isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            <h4 className="">View Products</h4>
                            <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Product Name</th>
                                        <th>Category</th>
                                        <th>Product Price</th>
                                        <th>Product Color</th>
                                        <th>MFG Date</th>
                                        <th>Expiry Date</th>
                                        <th>Created At</th>
                                        <th>Product Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(searchQuery ? filteredProducts : products).map((product, index) => {
                                        // Get the first image from the product_img array
                                        const firstImage = product.product_img?.[0];

                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <Link className="text-black" to={`/admin/product/view_details/${product._id}`}>
                                                        {product.product_name}
                                                    </Link>
                                                </td>
                                                <td>
                                                    {product.product_category
                                                        ? product.product_category.category_name
                                                        : " "}
                                                </td>
                                                <td>{product.product_price}</td>
                                                <td>{product.productColor}</td>
                                                <td>
                                                    {DateFormat(product.mfg, 'LLL ')}
                                                </td>
                                                <td>
                                                    {DateFormat(product.expiryDate, 'LLL ')}
                                                </td>
                                                <td>
                                                    {DateFormat(product.createdAt, 'LLL ')}
                                                </td>
                                                <td>
                                                    {/* Render only the first image */}
                                                    {firstImage ? (
                                                        <img
                                                            src={`${IMG_URL}/${firstImage}`}
                                                            alt={product.product_name}
                                                            width="100px"
                                                            height="100px"
                                                            className="me-2"
                                                        />
                                                    ) : (
                                                        <span>No Image Available</span>
                                                    )}
                                                </td>
                                                <td>
                                                    <Link to={`/admin/product/update/${product._id}`}>
                                                        <i
                                                            className="bi bi-pencil-square text-info me-3"
                                                            style={{ cursor: "pointer" }}
                                                        ></i>
                                                    </Link>

                                                    <Link to={`/admin/product/delete/${product._id}`}>
                                                        <i
                                                            className="bi bi-trash text-danger"
                                                            style={{ cursor: "pointer" }}
                                                        ></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {
                                props.searchResult && 
                                <button onClick={props.clearSearchData} className="btn btn-warning">Search Again</button>
                            }
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
