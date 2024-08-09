import React, { useState } from 'react';
import { Sidebar } from "../../../../../common/Sidebar/Sidebar.component";
import { ProductForm } from "../ProductForm/ProductForm.component";
import httpClient from "../../../../../utility/httpClient";
import { ErrorHandler } from "../../../../../utility/ErrorHandler";
import { Notify } from "../../../../../utility/toaster";
import { useNavigate } from 'react-router-dom';

export const AddProduct = props => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isValidForm, setIsValidForm] = useState(true);
    const navigate = useNavigate()

    const addProduct = product => {
        setIsSubmitting(true);
        httpClient.POST("/product/add_product", product, true)
            .then(response => {
                Notify.ShowSuccess("Product Added Successfully");
                setIsSubmitting(false);
                navigate("/admin/product/view")
            })
            .catch(err => {
                setIsSubmitting(false);
                ErrorHandler(err);
            });
    };

    return (
        <>
            <div className="row pt-0 mt-0">
                <div className="col-md-3">
                    <Sidebar />
                </div>

                <div className="col-md-9 shadow-lg p-5">
                    <ProductForm
                        title="Add Product"
                        enabledLabel="Add"
                        disabledLabel="Adding Product..."
                        isSubmitting={isSubmitting}
                        submitCallback={addProduct}
                        isValidForm={isValidForm}
                    ></ProductForm>
                </div>
            </div>
        </>
    );
}
