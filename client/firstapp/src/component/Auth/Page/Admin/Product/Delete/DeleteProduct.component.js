    import React, { useEffect, useState } from "react";
    import { Sidebar } from "../../../../../common/Sidebar/Sidebar.component";
    import { useNavigate, useParams } from "react-router-dom";
    import httpClient from "../../../../../utility/httpClient";
    import { ErrorHandler } from "../../../../../utility/ErrorHandler";
    import { Loader } from "../../../../../common/Loader/Loader.component";
    import { Notify } from "../../../../../utility/toaster";
    import { ProductInformation } from "../../../../../common/ProductInformation/ProductInformation.component";

    export const DeleteProduct = props => {
        const [product, setProducts] = useState({});
        const { product_id } = useParams();
        const [isLoading, setIsLoading] = useState(false)
        const [delete_product, setDeleteProduct] = useState(true)
        const navigate = useNavigate()

        useEffect(() => {
            setIsLoading(true);
            httpClient.GET(`/product/product_details/${product_id}`)
                .then(response => {
                    setProducts(response.data);
                })
                .catch(err => {
                    ErrorHandler(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, [product_id]);

        const handleDelete = e => {
            httpClient.DELETE(`/product/delete_product/${product._id}`, true)
                .then(response => {
                    Notify.ShowSuccess(response.data.msg)
                    navigate("/admin/product/view")
                })
                .catch(err => {
                    ErrorHandler(err)
                })
        }

        return (
            <>
                <div className="row pt-0 mt-0">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9 shadow-lg p-5">
                        {
                            isLoading ? <Loader />
                                :
                                <ProductInformation
                                    productData={product}
                                    deleteProduct={delete_product}
                                    handleDelete = {delete_product}
                                    deleteCallback={handleDelete}
                                ></ProductInformation>
                        }
                    </div>
                </div>
            </>
        );
    };

