import React, { useState } from "react";
import httpClient from "../../utility/httpClient";
import { ErrorHandler } from "../../utility/ErrorHandler";
import { Button } from "../../common/Button/Button.component";
import { useParams } from "react-router-dom";
import { Notify } from "../../utility/toaster";
import "./ResetPassword.component.css";

const initialState = {
    newPassword: "",
    confirmPassword: "",
};

export const ResetPassword = props => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState(initialState);
    const [isValidForm, setIsValidForm] = useState(false);

    const { token } = useParams()

    const validatePassword = (name, value) => {
        let errMsg = "";

        if (name === "newPassword") {
            errMsg = value
                ? value.match(/[a-z]/)
                    ? value.match(/[A-Z]/)
                        ? value.match(/[0-9]/)
                            ? value.match(/[!@#$%&*]/)
                                ? value.length >= 8
                                    ? value.length <= 15
                                        ? ""
                                        : "Password must not exceed 15 characters"
                                    : "Password must be at least 8 characters long"
                                : "Password must contain at least one special character"
                            : "Password must contain at least one number"
                        : "Password must contain at least one uppercase letter"
                    : "Password must contain at least one lowercase letter"
                : "Password is required";
        } else if (name === "confirmPassword") {
            errMsg =
                value !== formData.newPassword
                    ? "Passwords do not match"
                    : value
                        ? ""
                        : "Confirm password is required";
        }

        return errMsg;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update formData state
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Validate the changed field and update errors state
        const error = validatePassword(name, value);
        setErrors((prevState) => ({
            ...prevState,
            [name]: error,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform overall form validation here before submission
        const formErrors = {
            newPassword: validatePassword("newPassword", formData.newPassword),
            confirmPassword: validatePassword("confirmPassword", formData.confirmPassword),
        };

        // Set all the errors
        setErrors(formErrors);

        // Check if there are any errors in the form
        const hasErrors = Object.values(formErrors).some(err => err !== "");

        if (hasErrors) {
            Notify.ShowError("Please fix the errors before submitting");
            return;
        }

        // Proceed with the form submission if valid
        httpClient.POST(`/auth/reset-password/${token}`, { newPassword: formData.newPassword })
            .then((response) => {
                Notify.ShowSuccess(response.data.msg);
            })
            .catch((err) => {
                ErrorHandler(err);
            });
    };


    // const handleSubmit = e => {
    //     e.preventDefault()
    //     httpClient.POST(`/auth/reset-password/${token}`, { "newPassword": newPassword })
    //         .then(response => {
    //             Notify.ShowSuccess(response.data.msg)
    //         })
    //         .catch(err => {
    //             ErrorHandler(err)
    //         })
    // }



    return (
        <>
            <div className='reset-background'>

                <div className="reset-container w-50 m-auto shadow-lg p-5">
                    <h1>Reset Password Here</h1>
                    <form onSubmit={handleSubmit}>
                        <label>New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            className="form-control form-control-lg"
                            onChange={handleChange}
                        />
                        <span className="text-danger">{errors.newPassword}</span>
                        <br />
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control form-control-lg"
                            onChange={handleChange}
                        />
                        <span className="text-danger">{errors.confirmPassword}</span>
                        <br />
                        <Button
                            enabledLabel="Reset Password"
                            disabledLabel="Resetting..."
                            isValidForm={true}
                        ></Button>
                    </form>
                </div>
            </div>
        </>
    )
}