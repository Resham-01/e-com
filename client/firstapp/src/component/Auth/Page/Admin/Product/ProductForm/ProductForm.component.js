import React, { useState, useEffect } from 'react';
import { ErrorHandler } from '../../../../../utility/ErrorHandler';
import httpClient from '../../../../../utility/httpClient';
import { Button } from '../../../../../common/Button/Button.component';
import { DateFormat } from '../../../../../utility/DateFormat';

export const ProductForm = (props) => {
    const [data, setData] = useState({
        product_name: '',
        product_category: '',
        product_price: '',
        productColor: '',
        mfg: '',
        expiryDate: '',
        product_description: '',
        warrentyStatus: false,
        warrentyPeriod: '',
        product_model: '',
        discountedItem: false,
        discountedType: '',
        discountedValue: '',
        product_tag: '',
    });

    const [categories, setCategories] = useState([])

    // object destruct
    const { product_name, product_category, product_price, productColor, mfg, expiryDate, product_description, warrentyStatus, warrentyPeriod, product_model, discountedItem, discountedType, discountedValue, product_tag } = data

    useEffect(() => {
        httpClient.GET("/category/view_category")
            .then(response => {
                setCategories(response.data)
            })
            .catch(err => {
                ErrorHandler(err)
            })
    }, [])

    useEffect(() => {
        // console.log("props in product update: ", props.productData)
        if (props.productData) {
            setData(pre => ({
                ...pre.data,
                data: props.productData,
                product_tag: props.productData.product_tag.join(",")
            }))
        }
    }, [props.productData])

    const handleChange = e => {
        var { name, value, type, checked } = e.target;
        // console.log("type is: ", type)
        // console.log("checked: ", checked)
        if (type === "checkbox") {
            value = checked
        }
        setData({
            ...data,
            [name]: value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();
        props.submitCallback(data);
    };

    return (
        <div className="form-container">
            <h5 className='font-weight-bold'>{props.title}</h5>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="product_name">Product Name</label>
                    <input
                        name="product_name"
                        id="product_name"
                        value={product_name}
                        className="form-control form-control-lg"
                        onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="product_category">Product Category</label>
                    <select name='product_category' value={product_category} onChange={handleChange} className='form-control form-control-lg' required>
                        <option>Choose Category</option>
                        {
                            categories.map((category, index) => {
                                return <option key={index} value={category._id}>{category.category_name}</option>
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="product_price">Product Price</label>
                    <input
                        name="product_price"
                        id="product_price"
                        value={product_price}
                        className="form-control form-control-lg"
                        onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="productColor">Product Color</label>
                    <input
                        name="productColor"
                        id="productColor"
                        value={productColor}
                        className="form-control form-control-lg"
                        onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="mfg">Manufacturing Date</label>
                    <input
                        type="date"
                        name="mfg"
                        id="mfg"
                        value={DateFormat(mfg)}
                        className="form-control form-control-lg"
                        onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                        type="date"
                        name="expiryDate"
                        id="expiryDate"
                        value={DateFormat(expiryDate)}
                        className="form-control form-control-lg"
                        onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="product_description">Product Description</label>
                    <textarea
                        name="product_description"
                        id="product_description"
                        value={product_description}
                        className="form-control form-control-lg"
                        onChange={handleChange} required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="prodcut_model">Product Model</label>
                    <input
                        name="product_model"
                        id="prodcut_model"
                        value={product_model}
                        className="form-control form-control-lg"
                        onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="prodcut_model">Product Tag</label>
                    <input
                        name="product_tag"
                        id="prodcut_tag"
                        value={product_tag}
                        className="form-control form-control-lg"
                        onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <input
                        type="checkbox"
                        name="warrentyStatus"
                        className='me-2'
                        id="warrentyStatus"
                        value={warrentyStatus}
                        onChange={handleChange} />
                    <label htmlFor="warrentyStatus" className='me-2'>Warrenty Status</label>
                </div>
                {
                    warrentyStatus &&
                    <div className="form-group">
                        <label htmlFor="warrentyPeriod">Warrenty Period</label>
                        <input
                            name="warrentyPeriod"
                            id="warrentyPeriod"
                            value={warrentyPeriod}
                            className="form-control form-control-lg"
                            onChange={handleChange} />
                    </div>
                }
                <div className="form-group">
                    <input
                        type="checkbox"
                        name="discountedItem"
                        className='me-2'
                        id="discountedItem"
                        value={discountedItem}
                        onChange={handleChange} />
                    <label htmlFor="discountedItem" className='me-2'>Discounted Item</label>
                </div>
                {
                    discountedItem &&
                    <>
                        <div className="form-group">
                            <label htmlFor="discountedType">Discounted Type</label>
                            <select
                                name="discountedType"
                                id="discountedType"
                                value={discountedType}
                                className="form-control form-control-lg"
                                onChange={handleChange}>
                                <option value="">Select Discount Type</option>
                                <option value="percentage">Percentage</option>
                                <option value="quantity">Quantity</option>
                                <option value="value">Value</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="discountedValue">Discounted Value</label>
                            <input
                                name="discountedValue"
                                id="discountedValue"
                                value={discountedValue}
                                className="form-control form-control-lg"
                                onChange={handleChange} />
                        </div>
                    </>
                }

                <Button
                    enabledLabel={props.enabledLabel}
                    disabledLabel={props.disabledLabel}
                    isSubmitting={props.isSubmitting}
                    isValidForm={props.isValidForm}
                ></Button>
            </form>
        </div>
    );
};