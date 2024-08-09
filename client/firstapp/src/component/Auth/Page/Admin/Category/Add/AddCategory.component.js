import { useState } from "react"
import { Sidebar } from "../../../../../common/Sidebar/Sidebar.component"
import { CategoryForm } from "../CategoryForm/CategoryForm.component"
import httpClient from "../../../../../utility/httpClient"
import { ErrorHandler } from "../../../../../utility/ErrorHandler"
import { Notify } from "../../../../../utility/toaster"
import { useNavigate } from "react-router-dom"

export const AddCategory = props => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isValidForm, setIsValidForm] = useState(true)
    const navigate = useNavigate()

    const add = category => {
        setIsSubmitting(true)
        httpClient.POST("/category/add_category", category, true)
            .then(response => {
                setIsSubmitting(false)
                Notify.ShowSuccess("Category Added Successfully")
                navigate("/admin/category/view")
            })
            .catch(err => {
                setIsSubmitting(false)
                ErrorHandler(err)
            })
    }

    return (
        <>
            <div className="row pt-0 mt-0">
                <div className="col-md-3">
                    <Sidebar />
                </div>

                <div className="col-md-9 shadow-lg p-5">
                    <CategoryForm
                        title="Add Category"
                        enabledLabel="Add"
                        disabledLabel="Adding Category..."
                        isSubmitting={isSubmitting}
                        submitCallback={add}
                        isValidForm={isValidForm}
                    ></CategoryForm>
                </div>
            </div>
        </>
    )
}

