import React, { useState } from 'react';
import { Button } from '../../common/Button/Button.component';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { Notify } from '../../utility/toaster';
import httpClient from '../../utility/httpClient';
import { ErrorHandler } from '../../utility/ErrorHandler';
import "./Login.component.css"


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
                navigate("/")
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
                <p>Don't have an Account? <Link to={"/register"} className='text-info'>Register</Link></p>
            </form>
        </div>
    </div>

    )
}

