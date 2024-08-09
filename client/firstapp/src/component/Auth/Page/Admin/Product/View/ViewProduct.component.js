import React, { useEffect, useState } from "react";
import httpClient from "../../../../../utility/httpClient";
import { ErrorHandler } from "../../../../../utility/ErrorHandler";
import { Sidebar } from "../../../../../common/Sidebar/Sidebar.component";
import { Loader } from "../../../../../common/Loader/Loader.component";
import { DateFormat } from "../../../../../utility/DateFormat";
import { Link } from "react-router-dom";
import "./ViewProduct.component.css"

export const ViewProduct = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [isSubmitting, setIsSubmitting] = useState(false);
    // const [isValidForm, setIsValidForm] = useState(true)

    useEffect(() => {
        setIsLoading(true);
        httpClient.GET("/product/view_product")
            .then(response => {
                setProducts(response.data);
            })
            .catch(err => {
                ErrorHandler(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);


    return (
        <>
            <div className="row pt-0 mt-0">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9 shadow-lg p-5">
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
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map((product, index) => {
                                            return <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td> <Link className="text-black" to={`/admin/product/view_details/${product._id}`}> {product.product_name}</Link></td>
                                                <td>
                                                    {
                                                        product.product_category
                                                            ? product.product_category.category_name
                                                            : " "
                                                    }
                                                </td>
                                                {/* <td></td> */}
                                                <td>{product.product_price}</td>
                                                <td>{product.productColor}</td>
                                                <td>
                                                    {DateFormat(product.mfg, 'LLL ')}
                                                </td>
                                                <td>
                                                    {DateFormat(product.expiryDate, 'LLL    ')}                                                </td>
                                                <td>
                                                    <Link to={`/admin/product/update/${product._id}`}>
                                                        <i
                                                            className="bi bi-pencil-square text-info me-3"
                                                            style={{ cursor: "pointer" }}
                                                            // onClick={() => handleUpdateClick(product)}
                                                        ></i>
                                                    </Link>

                                                    <Link to={`/admin/product/delete/${product._id}`}>
                                                        <i
                                                            className="bi bi-trash text-danger"
                                                            style={{ cursor: "pointer" }}
                                                        // onClick={() => handleDeleteClick(product)}
                                                        ></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div> 
        </>
    );
};


// -----------------------------for study propose------------------------



// {showDeleteModal && (
//     <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//         <div className="modal-dialog">
//             <div className="modal-content">
//                 <div className="modal-header">
//                     <h5 className="modal-title">Delete Product</h5>
//                     {/* <button type="button" className="btn-close" aria-label="Close" onClick={closeDeleteModal}></button> */}
//                 </div>
//                 <div className="modal-body">
//                     <p>Are you sure you want to delete <b>{productToDelete?.product_name}</b>?</p>
//                 </div>
//                 <div className="modal-footer">
//                     <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
//                     <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
//                 </div>
//             </div>
//         </div>
//     </div>
// )}


// {showAddModal && (
//     <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//         <div className="modal-dialog">
//             <div className="modal-content">
//                 <div className="modal-header">
//                     <h5 className="modal-title">Add Product</h5>
//                     <button type="button" className="btn-close" aria-label="Close" onClick={closeAddModal}></button>
//                 </div>
//                 <div className="modal-body">
//                     <ProductForm
//                         title="Add Product"
//                         enabledLabel="Add"
//                         disabledLabel="Adding Product..."
//                         isSubmitting={isSubmitting}
//                         submitCallback={addProduct}
//                         isValidForm={isValidForm}
//                     />
//                 </div>
//             </div>
//         </div>
//     </div>
// )}



// {showUpdateModal && (
//     <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//         <div className="modal-dialog">
//             <div className="modal-content">
//                 <div className="modal-header">
//                     <h5 className="modal-title">Update Product</h5>
//                     <button type="button" className="btn-close" aria-label="Close" onClick={closeUpdateModal}></button>
//                 </div>
//                 <div className="modal-body">
//                     <ProductForm
//                         title="Update Product"
//                         enabledLabel="Update"
//                         disabledLabel="Updating Product..."
//                         isSubmitting={isSubmitting}
//                         submitCallback={update}
//                         isValidForm={isValidForm}
//                         UpdateProdut={productToUpdate}
//                     />
//                 </div>
//             </div>
//         </div>
//     </div>
// )}