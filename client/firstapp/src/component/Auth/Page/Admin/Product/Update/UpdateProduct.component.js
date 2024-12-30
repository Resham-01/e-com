import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import httpClient from '../../../../../utility/httpClient';
import { ErrorHandler } from '../../../../../utility/ErrorHandler';
import { Notify } from '../../../../../utility/toaster';
import { Sidebar } from '../../../../../common/Sidebar/Sidebar.component';
import { Loader } from '../../../../../common/Loader/Loader.component';
import { ProductForm } from '../ProductForm/ProductForm.component';

export const UpdateProduct = props => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isValidForm] = useState(true);
    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { product_id } = useParams()
    
    useEffect(() => {
        setIsLoading(true)
        httpClient.GET(`/product/product_details/${product_id}`)
            .then(response => {
                setProduct(response.data)
            })
            .catch(err => {
                ErrorHandler(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [product_id])

    const updateProduct = product => {
        setIsSubmitting(true);
        httpClient.PUT(`/product/update_product/${product_id}`, product, true)
            .then(response => {
                Notify.ShowSuccess("Product Updated Successfully");
                navigate("/admin/product/view")
            })
            .catch(err => {
                ErrorHandler(err);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const goBack = () => {
        navigate(-1); // Navigates to the previous page
    };

    return (
        <>
            <div className="row pt-0 mt-0">
                <div className="col-md-3">
                    <Sidebar />
                </div>

                <div className="col-md-9 shadow-lg p-5">
                    <i className="bi bi-arrow-left-circle-fill" onClick={goBack}></i>
                    {
                        isLoading
                            ? <Loader />
                            : <ProductForm
                                title="Update Product"
                                enabledLabel="Update"
                                disabledLabel="Updating Product..."
                                isSubmitting={isSubmitting}
                                submitCallback={updateProduct}
                                isValidForm={isValidForm}
                                productData={product}
                            ></ProductForm>
                    }

                </div>
            </div>
        </>
    );
}


