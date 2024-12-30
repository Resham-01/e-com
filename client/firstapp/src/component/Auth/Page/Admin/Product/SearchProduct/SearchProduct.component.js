import React, { useEffect, useState } from "react";
import { Sidebar } from "../../../../../common/Sidebar/Sidebar.component";
import { Button } from "../../../../../common/Button/Button.component";
import httpClient from "../../../../../utility/httpClient";
import { ErrorHandler } from "../../../../../utility/ErrorHandler";
import { Notify } from "../../../../../utility/toaster";
import { ViewProduct } from "../View/ViewProduct.component";

const defaultForm = {
    product_name: "",
    color: '',
    minPrice: '',
    maxPrice: '',
    category: "",
    fromDate: '',
    toDate: '',
    model: '',
    salesDate: '',
    purchaseDate: '',
    multipleDateRange: "",
}

export const SearchProduct = props => {
    const [data, setData] = useState(defaultForm)
    const [allProducts, setAllProducts] = useState([])
    const [categories, setCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        httpClient.POST("/product/search_product", {}, true)
            .then(response => {
                var cats = []
                response && response.data && response.data.forEach((item, index) => {
                    if (!cats.includes(item.product_category.category_name)) {
                        cats.push(item.product_category.category_name)
                    }
                })
                setAllProducts(response.data)
                setCategory(cats)
            })
            .catch(err => {
                ErrorHandler(err)
            })
    }, [])

    useEffect(() => {
        if (selectedCategory === "") {
            setFilteredProducts(allProducts)
        }
        else {
            var filtered_product = allProducts.filter(item => item.product_category.category_name === selectedCategory)
            setFilteredProducts(filtered_product)
        }
    }, [selectedCategory, allProducts])


    const handleChangeCategory = e => {
        setSelectedCategory(e.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault();
        httpClient.POST("/product/search_product", data, true)
        
            .then(response => {
                if (!response.data.length) {
                    return Notify.ShowInfo("No any product matched your search Query")
                }
                setSearchResult(response.data)
            })
            .catch(err => {
                ErrorHandler(err)
            })
    }

    const handleChange = e => {
        var { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            value = checked
        }
        setData(pre => ({
            ...pre,
            [name]: value
        }))
    }

    const clearingData = e => {
        setSearchResult([])
        setData({})
    }

    return (
        <>
            {
                searchResult && searchResult.length > 0 ?
                    <ViewProduct
                        searchResult={searchResult}
                        clearSearchData = {clearingData}
                    ></ViewProduct>
                    :
                    <div className="row pt-0 mt-0">
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-9">
                            <div className="shadow-lg m-5 p-5 border rounded" style={{ backgroundColor: "#f9f9f9" }}>
                                <h1 className="mb-4">Advanced Product Search</h1>
                                <form onSubmit={handleSubmit}>

                                    <div className="col">
                                        <label>Category</label>
                                        <select className="form-control form-control-lg" name="category" onChange={handleChangeCategory}>
                                            <option value={""}>-----------Select Category--------------</option>
                                            {
                                                categories && categories.length && categories.map((category, index) => {
                                                    return <option key={index} value={category}>{category}</option>
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="col">
                                        <label>Product Name</label>
                                        <select className="form-control form-control-lg" name="product_name" onChange={handleChange} >
                                            {
                                                filteredProducts && filteredProducts.length && filteredProducts.map(product => {
                                                    return <option key={product._id} value={""}>{product.product_name}</option>
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="col">
                                        <label>Color</label>
                                        <input type="text" className="form-control form-control-lg" name="color" onChange={handleChange} />
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label>Minimum Price</label>
                                            <input type="number" className="form-control form-control-lg" name="minPrice" onChange={handleChange} />
                                        </div>
                                        <div className="col">
                                            <label>Maximum Price</label>
                                            <input type="number" className="form-control form-control-lg" name="maxPrice" onChange={handleChange} />
                                        </div>
                                    </div>


                                    
                                        <div className="col">
                                            <label>From Date</label>
                                            <input type="date" className="form-control form-control-lg" name="from_date" onChange={handleChange} />
                                        </div>

                                        <input type="checkbox" className="my-3 me-2" name="multipleDateRange" onChange={handleChange}></input>
                                        <label htmlFor="multipleDateRange">Multiple Date Range?</label>
                                        <br />
                                        {
                                            data.multipleDateRange &&
                                            <>
                                                <div className="col">
                                                    <label>To Date</label>
                                                    <input type="date" className="form-control form-control-lg" name="to_date" onChange={handleChange} />
                                                </div>
                                            </>
                                        }
                                    


                                    <div className="d-flex justify-content-end mt-4">
                                        <Button
                                            enabledLabel="Search Product"
                                            disabledLabel="Searching Product"
                                            isSubmitting={false}
                                            isValidForm={true}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            }

        </>
    );
};
