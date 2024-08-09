// import React, { useEffect, useState } from "react";
// import { Sidebar } from "../../../../../common/Sidebar/Sidebar.component";
// import { useNavigate, useParams } from "react-router-dom";
// import httpClient from "../../../../../utility/httpClient";
// import { ErrorHandler } from "../../../../../utility/ErrorHandler";
// import { Loader } from "../../../../../common/Loader/Loader.component";
// import { Notify } from "../../../../../utility/toaster";

// export const DeleteCategory = props => {
//     const [category, setCategory] = useState({})
//     const [isLoading, setIsLoading] = useState(false)
//     const { category_id } = useParams()
//     const navigate = useNavigate()

//     useEffect(() => {
//         setIsLoading(true)
//         httpClient.GET(`/category/category_details/${category_id}`)
//             .then(response => {
//                 setCategory(response.data)
//             })
//             .catch(err => {
//                 ErrorHandler(err)
//             })
//             .finally(() => {
//                 setIsLoading(false)
//             })
//     }, [])


//     const handleClick = e => {
//         httpClient.DELETE(`/category/delete_category/${category_id}`)
//             .then(response => {
//                 Notify.ShowSuccess(response.data.msg)
//                 navigate("/admin/category/view")
//             })
//             .catch(err => {
//                 ErrorHandler(err)
//             })
//     }

//     const handleCancelClick = () => {
//         navigate("/admin/category/view");
//     };

//     return (
//         <>
//             <div className="row pt-0 mt-0">
//                 <div className="col-md-3">
//                     <Sidebar />
//                 </div>

//                 <div className="col-md-9 shadow-lg p-5">
//                     {
//                         isLoading
//                             ? <Loader />
//                             : <>
//                                 <p className="fs-3">Are you sure? You want to Delete <b>{category.category_name}</b> ? </p>
//                                 <button className="me-4 btn btn-danger" onClick={handleClick}>Delete</button>

//                                 <button className="ms-4 btn btn-secondary" onClick={handleCancelClick}>Cancel</button>
//                             </>
//                     }
//                 </div>
//             </div>
//         </>
//     )
// }
