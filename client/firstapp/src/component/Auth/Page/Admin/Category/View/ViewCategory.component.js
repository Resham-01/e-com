import React, { useEffect, useState } from "react";
import httpClient from "../../../../../utility/httpClient";
import { ErrorHandler } from "../../../../../utility/ErrorHandler";
import { Sidebar } from "../../../../../common/Sidebar/Sidebar.component";
import { Loader } from "../../../../../common/Loader/Loader.component";
import { Notify } from "../../../../../utility/toaster";
import { CategoryForm } from "../CategoryForm/CategoryForm.component";
import mongoose from "mongoose";
// import { useParams } from "react-router-dom";

export const ViewCategory = props => {
    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToUpdate, setCategoryToUpdate] = useState(null);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isValidForm, setIsValidForm] = useState(true);
    // const { category_id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        httpClient.GET("/category/view_category")
            .then(response => {
                console.log("response is: ", response);
                setCategory(response.data);
            })
            .catch(err => {
                ErrorHandler(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleUpdateClick = category => {
        if (!mongoose.Types.ObjectId.isValid(category._id)) {
            ErrorHandler({ message: 'Invalid category ID format' });
            return;
        }
        setCategoryToUpdate(category);
        setShowUpdateModal(true);
    };

    const handleDeleteClick = category => {
        if (!mongoose.Types.ObjectId.isValid(category._id)) {
            ErrorHandler({ message: 'Invalid category ID format' });
            return;
        }
        setCategoryToDelete(category);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        httpClient.DELETE(`/category/delete_category/${categoryToDelete._id}`, true)
            .then(response => {
                Notify.ShowSuccess(response.data.msg);
                setCategory(category.filter(item => item._id !== categoryToDelete._id));
                setShowDeleteModal(false);
                setCategoryToDelete(null);
            })
            .catch(err => {
                ErrorHandler(err);
            });
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setCategoryToDelete(null);
    };

    const update = category => {
        setIsSubmitting(true);
        httpClient.PUT(`/category/update_category/${categoryToUpdate._id}`, category, true)
            .then(response => {
                setIsSubmitting(false);
                Notify.ShowSuccess("Category Updated Successfully");
                // setCategory(category.map(item => item._id === categoryToUpdate._id ? response.data : item));
                setCategory((prevCategory) =>
                    prevCategory.map((item) => (item._id === categoryToUpdate._id ? response.data : item))
                );
                setShowUpdateModal(false);
                setCategoryToUpdate(null);
            })
            .catch(err => {
                setIsSubmitting(false);
                ErrorHandler(err);
            });
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
        setCategoryToUpdate(null);
    };

    return (
        <>
            <div className="row pt-0 mt-0">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9 shadow-lg p-5">
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <>
                        <h4>View Category</h4>
                            <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Category Name</th>
                                        <th>Created At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.category_name}</td>
                                            <td>{item.createdAt}</td>
                                            <td>
                                                <i
                                                    className="bi bi-pencil-square text-info me-3"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleUpdateClick(item)}
                                                ></i>

                                                <i
                                                    className="bi bi-trash text-danger"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleDeleteClick(item)}
                                                ></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>

            {showDeleteModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete Category</h5>
                                {/* <button type="button" className="btn-close" aria-label="Close" onClick={closeDeleteModal}></button> */}
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete <b>{categoryToDelete?.category_name}</b>?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showUpdateModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Category</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeUpdateModal}></button>
                            </div>
                            <div className="modal-body">
                                <CategoryForm
                                    enabledLabel="Update"

                                    disabledLabel="Updating Category..."
                                    isSubmitting={isSubmitting}
                                    submitCallback={update}
                                    isValidForm={isValidForm}
                                    UpdateCategory={categoryToUpdate}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
