import React, { useState } from 'react';
import { Button } from '../../common/Button/Button.component';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { Notify } from '../../utility/toaster';
import httpClient from '../../utility/httpClient';
import { ErrorHandler } from '../../utility/ErrorHandler';
import "./Login.component.css"
import { isAuthenticated } from '../../utility/isAuthenticated';


const initialFormData = {
    userName: "",
    password: ""
}

export const SignIn = props => {

    const [formData, setFormData] = useState(initialFormData)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isValidForm, setIsValidForm] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedFormData = {
            ...formData,
            [name]: value
        };
        setFormData(updatedFormData);
        setIsValidForm(updatedFormData.userName.trim() !== '' && updatedFormData.password.trim() !== '');
    };

    const handleSubmit = event => {
        event.preventDefault()
        setIsSubmitting(true)
        httpClient.POST("auth/login", formData)
            .then(response => {
                Notify.ShowSuccess(`Welcome ${formData.userName}`)
                // console.log(response);
                // localStorage.setItem("user_details", JSON.stringify(response.data.user_details))
                localStorage.setItem("user_details", JSON.stringify(response.data.user_details))
                console.log(isAuthenticated())

                if (isAuthenticated() && isAuthenticated().role === "admin") {
                    navigate("/admin/dashboard?")
                }
                else {
                    navigate("/user/profile")
                }
                // isAuthenticated() && isAuthenticated().role === "admin" ?
                // navigate("/admin/dashboard?")
                // : navigate("/user/profile")
                // navigate("/")
            })
            .catch(err => {
                setIsSubmitting(false)
                // Notify.ShowError(err.response.data.err)
                ErrorHandler(err)
            }
            )
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='signin-background'>
            <div className='signin-container'>
                <h1 className='text-center'>Log In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        name="userName"
                        className='form-control from-control-lg'
                        onChange={handleChange}
                    />

                    <label htmlFor='password'>Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        className='form-control from-control-lg'
                        onChange={handleChange}
                    />
                    <div className="form-check mt-2">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="showPassword"
                            checked={showPassword}
                            onChange={toggleShowPassword}
                        />
                        <label className="form-check-label" htmlFor="showPassword">
                            Show Password
                        </label>
                    </div>

                    <Button
                        enabledLabel="Login"
                        disabledLabel="LoginingIn..."
                        isSubmitting={isSubmitting}
                        isValidForm={isValidForm}
                    ></Button>
                    <div className="d-flex justify-content-between">
                    <p>Don't have an Account? <Link to={"/register"} className='text-info'>Register</Link></p>
                    <Link to={"/forgot-password"} className='text-danger'>Forgot password?</Link>
                    </div>
                </form>
            </div>
        </div>

    )
}

