import React, { useEffect, useState, useCallback } from 'react';
import { Button } from '../../common/Button/Button.component';
import { Link, useNavigate } from "react-router-dom";
import { Notify } from '../../utility/toaster';
import httpClient from '../../utility/httpClient';
import { ErrorHandler } from '../../utility/ErrorHandler';
import "./Register.component.css"


const initialFormData = {
    userName: "",
    email: "",
    dob: "",
    temporaryAddress: "",
    permanentAddress: "",
    password: "",
    confirmpassword: ""
}

const initialErrors = {
    userName: "",
    email: "",
    dob: "",
    temporaryAddress: "",
    permanentAddress: "",
    password: "",
    confirmpassword: ""
};



export const SignUp = (props) => {
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState(initialErrors)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isValidForm, setIsValidForm] = useState(true)

    const navigate = useNavigate()

    const validateForm = useCallback(() => {
        let newErrors = { ...initialErrors };
        let isValid = true;

        if (!formData.userName) {
            newErrors.userName = "Required field";
            isValid = false;
        } else if (!/^[a-z]/.test(formData.username)) {
            newErrors.userName = "username must start with lowercase";
            isValid = false;
        } else if (formData.userName.length < 4) {
            newErrors.userName = "Username must be at least 4 characters";
            isValid = false;
        } else if (/[!@#$_\-@]/.test(formData.userName)) {
            newErrors.userName = "Username must not have any special character";
            isValid = false;
        }

        if (!formData.email) {
            newErrors.email = "Required field";
            isValid = false;
        } else if (/[A-Z]/.test(formData.email)) {
            newErrors.email = "Email must not contain any uppercase alphabet";
            isValid = false;
        } else if (!/[@]gmail[.]com$/.test(formData.email)) {
            newErrors.email = "Email must end with @gmail.com";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Required field";
            isValid = false;
        } else if (!/[a-z]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one lowercase alphabet";
            isValid = false;
        } else if (!/[A-Z]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one uppercase alphabet";
            isValid = false;
        } else if (!/[!@#$%&*]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one special character";
            isValid = false;
        } else if (!/[1-9]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one number";
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must contain at least 8 characters";
            isValid = false;
        } else if (formData.password.length > 15) {
            newErrors.password = "Password must not contain more than 15 characters";
            isValid = false;
        } else if (formData.confirmpassword && formData.password !== formData.confirmpassword) {
            newErrors.password = "Password doesn't match with Confirm Password";
            isValid = false;
        }

        if (!formData.confirmpassword) {
            newErrors.confirmpassword = "Required field";
            isValid = false;
        } else if (formData.confirmpassword !== formData.password) {
            newErrors.confirmpassword = "Confirm Password doesn't match with Password";
            isValid = false;
        }

        setErrors(newErrors);
        setIsValidForm(isValid);
    }, [formData]);


    useEffect(() => {
        console.log("form data: ", formData)
        validateForm();
    }, [formData, validateForm])


    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }



    const handleSubmit = event => {
        event.preventDefault()
        // toast.info("Registering.....")
        // axios.post(`${BaseURL}/auth/register`, formData, {
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        httpClient.POST("auth/register", formData)
            .then(response => {
                Notify.ShowSuccess(`hi, ${response.data.userName} your register is Successfull, Please check your email to activate your account `)
                navigate("/login")
            })
            .catch(err => {
                // Notify.ShowError(err.response.data.err)
                ErrorHandler(err)
            })

        // api call
        // data prepration
        // sending data to server

        setIsSubmitting(true)
    }

    return (
        <div className='register-background'>
            <div className='register-container w-50 shadow-lg p-3 m-auto'>
                <h1 className='text-center'>Register</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='userName'>Username</label>
                    <input
                        type='text'
                        name="userName"
                        className='form-control form-control-lg'
                        onChange={handleChange}
                    />
                    {errors.userName && <div className="error text-danger">{errors.userName}</div>}
                    <br />
                    <label htmlFor='email'>Email Address</label>
                    <input
                        type='email'
                        name="email"
                        className='form-control form-control-lg'
                        onChange={handleChange}
                    />
                    {errors.email && <div className="error text-danger">{errors.email}</div>}
                    <br />
                    <label htmlFor='dob'>Date Of Birth</label>
                    <input
                        type='date'
                        name="dob"
                        className='form-control form-control-lg'
                        onChange={handleChange}
                    />
                    {errors.dob && <div className="error text-danger">{errors.dob}</div>}
                    <br />
                    <label htmlFor='temporaryAddress'>Temporary Address</label>
                    <input
                        type='text'
                        name="temporaryAddress"
                        className='form-control form-control-lg'
                        onChange={handleChange}
                    />
                    {errors.temporaryAddress && <div className="error text-danger">{errors.temporaryAddress}</div>}
                    <br />
                    <label htmlFor='permanentAddress'>Permanent Address</label>
                    <input
                        type='text'
                        name="permanentAddress"
                        className='form-control form-control-lg'
                        onChange={handleChange}
                    />
                    {errors.permanentAddress && <div className="error text-danger">{errors.permanentAddress}</div>}
                    <br />
                    <label htmlFor='password'>New Password</label>
                    <input
                        type='password'
                        name='password'
                        className='form-control form-control-lg'
                        onChange={handleChange}
                    />
                    {errors.password && <div className="error text-danger">{errors.password}</div>}
                    <br />
                    <label htmlFor='confirmpassword'>Confirm Password</label>
                    <input
                        type='password'
                        name='confirmpassword'
                        className='form-control form-control-lg'
                        onChange={handleChange}
                    />
                    {errors.confirmpassword && <div className="error text-danger">{errors.confirmpassword}</div>}
                    <br />
                    <Button
                        enabledLabel="Register"
                        // disabledLabel="Registering..."
                        isSubmitting={isSubmitting}
                        isValidForm={isValidForm}
                    ></Button>
                    <p>Already have an account? <Link to={"/login"} className='text-info'>Login</Link></p>
                </form>
            </div>
        </div>
    )
}


