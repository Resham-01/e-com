import { Link } from "react-router-dom"
// import { Notify } from "../../utility/toaster"
// import { ErrorHandler } from "../../utility/ErrorHandler"
// import httpClient from "../../utility/httpClient"

export const ProductInformation = ({ productData, deleteProduct, deleteCallback }) => {
    // const navigate = useNavigate()

    const handleDelete = e => {
        e.preventDefault();
        deleteCallback();
    }


    return (
        <>
            <div className="w-75 m-auto">
                <div className="card">
                    <div className="container-fliud">
                        <div className="wrapper row">
                            <div className="preview col-md-6">

                                <div className="preview-pic tab-content">
                                    <div className="tab-pane active" id="pic-1">
                                        <img src="https://imgs.search.brave.com/rTTdR2Cb4DXYB0G1bDY5kDBUbIOX8j66BH1jCie8vVM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YXRj/aGJveC1wcm9kdWN0/LWNkbi5pbWdpeC5u/ZXQvbmV3LWdvb2Rz/L0NSV1NUQTAwNDFf/Mi5qcGc_YXV0bz1m/b3JtYXQsY29tcHJl/c3MmYmctcmVtb3Zl/PXRydWUmdz0xNDgw/Jmg9MTQ4MCZmaXQ9/ZmlsbCZmaWxsPXNv/bGlkJnE9MTAw" alt="pic"/>
                                    </div>
                                    <div className="tab-pane" id="pic-2">
                                        <img src="https://imgs.search.brave.com/rTTdR2Cb4DXYB0G1bDY5kDBUbIOX8j66BH1jCie8vVM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YXRj/aGJveC1wcm9kdWN0/LWNkbi5pbWdpeC5u/ZXQvbmV3LWdvb2Rz/L0NSV1NUQTAwNDFf/Mi5qcGc_YXV0bz1m/b3JtYXQsY29tcHJl/c3MmYmctcmVtb3Zl/PXRydWUmdz0xNDgw/Jmg9MTQ4MCZmaXQ9/ZmlsbCZmaWxsPXNv/bGlkJnE9MTAw" alt="pic" />
                                    </div>
                                    <div className="tab-pane" id="pic-3">
                                        <img src="https://imgs.search.brave.com/rTTdR2Cb4DXYB0G1bDY5kDBUbIOX8j66BH1jCie8vVM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YXRj/aGJveC1wcm9kdWN0/LWNkbi5pbWdpeC5u/ZXQvbmV3LWdvb2Rz/L0NSV1NUQTAwNDFf/Mi5qcGc_YXV0bz1m/b3JtYXQsY29tcHJl/c3MmYmctcmVtb3Zl/PXRydWUmdz0xNDgw/Jmg9MTQ4MCZmaXQ9/ZmlsbCZmaWxsPXNv/bGlkJnE9MTAw" alt="pic" />
                                    </div>
                                    <div className="tab-pane" id="pic-4">
                                        <img src="https://imgs.search.brave.com/rTTdR2Cb4DXYB0G1bDY5kDBUbIOX8j66BH1jCie8vVM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YXRj/aGJveC1wcm9kdWN0/LWNkbi5pbWdpeC5u/ZXQvbmV3LWdvb2Rz/L0NSV1NUQTAwNDFf/Mi5qcGc_YXV0bz1m/b3JtYXQsY29tcHJl/c3MmYmctcmVtb3Zl/PXRydWUmdz0xNDgw/Jmg9MTQ4MCZmaXQ9/ZmlsbCZmaWxsPXNv/bGlkJnE9MTAw" alt="pic" />
                                    </div>
                                    <div className="tab-pane" id="pic-5">
                                        <img src="https://imgs.search.brave.com/rTTdR2Cb4DXYB0G1bDY5kDBUbIOX8j66BH1jCie8vVM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YXRj/aGJveC1wcm9kdWN0/LWNkbi5pbWdpeC5u/ZXQvbmV3LWdvb2Rz/L0NSV1NUQTAwNDFf/Mi5qcGc_YXV0bz1m/b3JtYXQsY29tcHJl/c3MmYmctcmVtb3Zl/PXRydWUmdz0xNDgw/Jmg9MTQ4MCZmaXQ9/ZmlsbCZmaWxsPXNv/bGlkJnE9MTAw" alt="pic" />
                                    </div>
                                </div>
                                <ul className="preview-thumbnail nav nav-tabs">
                                    <li className="active">
                                        <Link to={""} data-target="#pic-1" data-toggle="tab">
                                            <img src="https://imgs.search.brave.com/rTTdR2Cb4DXYB0G1bDY5kDBUbIOX8j66BH1jCie8vVM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YXRj/aGJveC1wcm9kdWN0/LWNkbi5pbWdpeC5u/ZXQvbmV3LWdvb2Rz/L0NSV1NUQTAwNDFf/Mi5qcGc_YXV0bz1m/b3JtYXQsY29tcHJl/c3MmYmctcmVtb3Zl/PXRydWUmdz0xNDgw/Jmg9MTQ4MCZmaXQ9/ZmlsbCZmaWxsPXNv/bGlkJnE9MTAw" alt="pic" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={""} data-target="#pic-2" data-toggle="tab">
                                            <img src="https://imgs.search.brave.com/rTTdR2Cb4DXYB0G1bDY5kDBUbIOX8j66BH1jCie8vVM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YXRj/aGJveC1wcm9kdWN0/LWNkbi5pbWdpeC5u/ZXQvbmV3LWdvb2Rz/L0NSV1NUQTAwNDFf/Mi5qcGc_YXV0bz1m/b3JtYXQsY29tcHJl/c3MmYmctcmVtb3Zl/PXRydWUmdz0xNDgw/Jmg9MTQ4MCZmaXQ9/ZmlsbCZmaWxsPXNv/bGlkJnE9MTAw" alt="pic" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={""} data-target="#pic-3" data-toggle="tab">
                                            <img src="https://imgs.search.brave.com/rTTdR2Cb4DXYB0G1bDY5kDBUbIOX8j66BH1jCie8vVM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YXRj/aGJveC1wcm9kdWN0/LWNkbi5pbWdpeC5u/ZXQvbmV3LWdvb2Rz/L0NSV1NUQTAwNDFf/Mi5qcGc_YXV0bz1m/b3JtYXQsY29tcHJl/c3MmYmctcmVtb3Zl/PXRydWUmdz0xNDgw/Jmg9MTQ4MCZmaXQ9/ZmlsbCZmaWxsPXNv/bGlkJnE9MTAw" alt="pic" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={""} data-target="#pic-4" data-toggle="tab">
                                            <img src="https://imgs.search.brave.com/rTTdR2Cb4DXYB0G1bDY5kDBUbIOX8j66BH1jCie8vVM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YXRj/aGJveC1wcm9kdWN0/LWNkbi5pbWdpeC5u/ZXQvbmV3LWdvb2Rz/L0NSV1NUQTAwNDFf/Mi5qcGc_YXV0bz1m/b3JtYXQsY29tcHJl/c3MmYmctcmVtb3Zl/PXRydWUmdz0xNDgw/Jmg9MTQ4MCZmaXQ9/ZmlsbCZmaWxsPXNv/bGlkJnE9MTAw" alt="pic" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={""} data-target="#pic-5" data-toggle="tab">
                                            <img src="https://imgs.search.brave.com/rTTdR2Cb4DXYB0G1bDY5kDBUbIOX8j66BH1jCie8vVM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YXRj/aGJveC1wcm9kdWN0/LWNkbi5pbWdpeC5u/ZXQvbmV3LWdvb2Rz/L0NSV1NUQTAwNDFf/Mi5qcGc_YXV0bz1m/b3JtYXQsY29tcHJl/c3MmYmctcmVtb3Zl/PXRydWUmdz0xNDgw/Jmg9MTQ4MCZmaXQ9/ZmlsbCZmaWxsPXNv/bGlkJnE9MTAw" alt="pic" />
                                        </Link>
                                    </li>
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
                                <p className="product-description">{productData.product_description}.</p>
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
                                {
                                    deleteProduct
                                        ? <div className="action">
                                            <button className="btn btn-secondary btn-lg me-3" type="button"> <Link to={'/admin/product/view'}>cancel</Link> </button>
                                            <button className="btn btn-danger btn-lg" type="button" onClick={handleDelete}>Delete</button>
                                        </div>
                                        : <button className="btn btn-secondary btn-lg me-3" type="button"> <Link to={'/admin/product/view'}>Back to List</Link> </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


