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
        filesToUpload: [],
        imagesToRemove: [] // New state for tracking images to remove
    });

    const [categories, setCategories] = useState([])
    const IMG_URL = 'http://localhost:8000/file/images'

    // object destruct
    const { product_name, product_category, product_price, productColor, mfg, expiryDate, product_description, warrentyStatus, warrentyPeriod, product_model, discountedItem, discountedType, discountedValue, product_tag, filesToUpload, imagesToRemove } = data

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
        if (props.productData) {
            setData(pre => ({
                ...pre,
                data: props.productData,
                product_tag: props.productData.product_tag.join(","),
                imagesToRemove: [] // Reset images to remove on update
            }))
        }
    }, [props.productData])

    const handleChange = e => {
        var { name, value, type, checked, files } = e.target;

        if (files) {
            setData(prevState => ({
                ...prevState,
                filesToUpload: [...prevState.filesToUpload, ...files]
            }))
        }
        else if (type === "checkbox") {
            setData(prevState => ({
                ...prevState,
                [name]: checked
            }))
        }
        else {
            setData(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
    };

    const handleImageRemove = (image) => {
        setData(prevState => ({
            ...prevState,
            imagesToRemove: [...prevState.imagesToRemove, image]
        }))
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.submitCallback(data, filesToUpload, imagesToRemove);
    };

    const imageData = props.productData && props.productData.product_img && props.productData.product_img.length > 0 &&
        <>
            <label htmlFor=''>Previous Images</label>
            <br />
            {
                props.productData.product_img.map((image, index) => {
                    return (
                        <div key={index} className="position-relative d-inline-block me-3">
                            <img src={`${IMG_URL}/${image}`} alt="" width={'100px'} height={'100px'} className='border-end border-3' />
                            <i className="bi bi-x position-absolute top-0 end-0 fs-2"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleImageRemove(image)}></i>
                        </div>
                    )
                })
            }
        </>

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
                {/* -----------for warrenty status checked------------------- */}
                <input
                    type="checkbox"
                    name="warrentyStatus"
                    className='me-2'
                    id="warrentyStatus"
                    value={warrentyStatus}
                    onChange={handleChange} />
                <label htmlFor="warrentyStatus" className='me-2'>Warrenty Status</label>
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
                <br /> 
                {/* --------------for discount checked------------- */}
                <input
                    type="checkbox"
                    name="discountedItem"
                    className='me-2'
                    id="discountedItem"
                    value={discountedItem}
                    onChange={handleChange} />
                <label htmlFor="discountedItem" className='me-2'>Discounted Item</label>
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

                {
                    props.productData && imageData
                }
                <div className="form-group mt-4">
                    <label htmlFor="product_image">Product Image</label>
                    <input
                        type="file"
                        id="product_image"
                        className="form-control form-control-lg"
                        onChange={handleChange} />
                </div>

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

