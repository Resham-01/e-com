import React, { useState } from 'react';
import { Button } from '../../common/Button/Button.component';
import httpClient from '../../utility/httpClient';
import { ErrorHandler } from '../../utility/ErrorHandler';
import './Forgotpassword.Component.css';
import { Notify } from '../../utility/toaster';

export const ForgotPassword = props => {
    const [email, setEmail] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        httpClient.POST("/auth/forgot-password", {"email": email})
        .then(response => {
            Notify.ShowInfo(response.data.msg)
        })
        .catch(err => {
            ErrorHandler(err)
        })
    }

    const handleEmail = e => {
        const { value } = e.target;
        setEmail(value)
    }

    return (
        <div className='forgotpassword-background'>
            <div className='forgotpassword-container'>
                <h1 className='text-center'>Forgot Password</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name="email"
                        className='form-control from-control-lg'
                        onChange={handleEmail}
                    />

                    

                    <Button
                        enabledLabel="Submit"
                        disabledLabel="Submitting..."
                        isValidForm={true}
                    ></Button>
                </form>
            </div>
        </div>

    )
}

