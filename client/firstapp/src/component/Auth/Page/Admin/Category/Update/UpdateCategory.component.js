// // import { useEffect, useState } from "react"
// // import { useNavigate, useParams } from "react-router-dom"
// // import httpClient from "../../../../../utility/httpClient"
// // import { Notify } from "../../../../../utility/toaster"
// // import { Sidebar } from "../../../../../common/Sidebar/Sidebar.component"
// // import { CategoryForm } from "../CategoryForm/CategoryForm.component"
// // import { ErrorHandler } from "../../../../../utility/ErrorHandler"

// // export const UpdateCategory = props => {
// //     const [isSubmitting, setIsSubmitting] = useState(false)
// //     const [isValidForm, setIsValidForm] = useState(true)
// //     const [category, setCategory] = useState({})
// //     const [isLoading, setIsLoading] = useState(false)
// //     const navigate = useNavigate()
// //     const { category_id } = useParams()


// //     useEffect(() => {
// //         setIsLoading(true)
// //         httpClient.GET(`/category/category_details/${category_id}`)
// //             .then(response => {
// //                 setCategory(response.data)
// //             })
// //             .catch(err => {
// //                 ErrorHandler(err)
// //             })
// //             .finally(() => {
// //                 setIsLoading(false)
// //             })
// //     }, [])


// //     const update = category => {
// //         setIsSubmitting(true)
// //         httpClient.PUT(`/category/update_category/${category_id})`, category)
// //             .then(response => {
// //                 setIsSubmitting(false)
// //                 Notify.ShowSuccess("Category Updated Successfully")
// //                 navigate("/admin/category/view")
// //             })
// //             .catch(err => {
// //                 setIsSubmitting(false)
// //                 ErrorHandler(err)
// //             })
// //     }

// //     return (
// //         <>
// //             <div className="row pt-0 mt-0">
// //                 <div className="col-md-3">
// //                     <Sidebar />
// //                 </div>

// //                 <div className="col-md-9 shadow-lg p-5">
// //                     <CategoryForm
// //                         title="Update Category"
// //                         enabledLabel="Update"
// //                         disabledLabel="Updating Category..."
// //                         isSubmitting={isSubmitting}
// //                         submitCallback={update}
// //                         isValidForm={isValidForm}
// //                         UpdateCategory={category}
// //                     ></CategoryForm>
// //                 </div>
// //             </div>
// //         </>
// //     )
// // }

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import httpClient from "../../../../../utility/httpClient";
// import { Notify } from "../../../../../utility/toaster";
// import { Sidebar } from "../../../../../common/Sidebar/Sidebar.component";
// import { CategoryForm } from "../CategoryForm/CategoryForm.component";
// import { ErrorHandler } from "../../../../../utility/ErrorHandler";
// import mongoose from "mongoose";

// export const UpdateCategory = props => {
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isValidForm, setIsValidForm] = useState(true);
//     const [category, setCategory] = useState({});
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();
//     const { category_id } = useParams();

//     useEffect(() => {
//         if (!mongoose.Types.ObjectId.isValid(category_id)) {
//             ErrorHandler({ message: 'Invalid category ID format' });
//             setIsLoading(false);
//             return;
//         }

//         setIsLoading(true);
//         httpClient.GET(`/category/category_details/${category_id}`)
//             .then(response => {
//                 setCategory(response.data);
//             })
//             .catch(err => {
//                 ErrorHandler(err);
//             })
//             .finally(() => {
//                 setIsLoading(false);
//             });
//     }, [category_id]);

//     const update = category => {
//         if (!mongoose.Types.ObjectId.isValid(category_id)) {
//             ErrorHandler({ message: 'Invalid category ID format' });
//             return;
//         }

//         setIsSubmitting(true);
//         httpClient.PUT(`/category/update_category/${category_id}`, category)
//             .then(response => {
//                 setIsSubmitting(false);
//                 Notify.ShowSuccess("Category Updated Successfully");
//                 navigate("/admin/category/view");
//             })
//             .catch(err => {
//                 setIsSubmitting(false);
//                 ErrorHandler(err);
//             });
//     }

//     return (
//         <>
//             <div className="row pt-0 mt-0">
//                 <div className="col-md-3">
//                     <Sidebar />
//                 </div>
//                 <div className="col-md-9 shadow-lg p-5">
//                     <CategoryForm
//                         title="Update Category"
//                         enabledLabel="Update"
//                         disabledLabel="Updating Category..."
//                         isSubmitting={isSubmitting}
//                         submitCallback={update}
//                         isValidForm={isValidForm}
//                         UpdateCategory={category}
//                     ></CategoryForm>
//                 </div>
//             </div>
//         </>
//     );
// }
