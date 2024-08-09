import React, { useEffect, useState } from "react"
import { Sidebar } from "../../../../../common/Sidebar/Sidebar.component"
import { useParams } from "react-router-dom"
import httpClient from "../../../../../utility/httpClient"
import { ErrorHandler } from "../../../../../utility/ErrorHandler"
import { Loader } from "../../../../../common/Loader/Loader.component"
import './ProductDetails.component.css'
import { ProductInformation } from "../../../../../common/ProductInformation/ProductInformation.component"

export const ProductDetails = props => {
    const [product, setProudct] = useState({})
    const { product_id } = useParams()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        httpClient.GET(`/product/product_details/${product_id}`)
            .then(response => {
                setProudct(response.data)
            })
            .catch(err => {
                ErrorHandler(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [product_id])



    return (
        <>
            <div className="row pt-0 mt-0">
                <div className="col-md-3">
                    <Sidebar />
                </div>

                <div className="col-md-9 shadow-lg p-5">
                    {
                        isLoading
                            ? <Loader />
                            :
                            <ProductInformation
                                productData={product}
                            ></ProductInformation>
                    }

                </div>
            </div>

        </>
    )
}