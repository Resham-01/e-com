import React, { Component } from 'react';
import { Button } from '../../common/Button/Button.component';
import { Footer } from '../../common/Footer/Footer.component';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formData = {
    username: "",
    // firstname: "",
    // lastname: "",
    email: "",
    dob: "",
    temporaryAddress: "",
    permanentAddress: "",
    password: "",
    confirmpassword: ""
}


export class Register extends Component {
    constructor() {
        super()
        this.state = {
            data: {
                ...formData
            },
            error: {
                ...formData
            },
            isValidForm: false,
            isSubmitting: false
        }
    }


    handlechange = e => {
        const { name, value } = e.target;
        this.setState(preState => ({
            data: {
                ...preState.data,
                [name]: value
            }
        }), () => {
            this.validateForm(name)
            console.log("data is", this.state.data)
        })
    }

    validateForm = fieldName => {
        // console.log("field data is:", fieldName)
        var errMsg;
        switch (fieldName) {
            case 'username':
                errMsg = this.state.data[fieldName]
                    ? this.state.data[fieldName].match(/^[a-z]/)
                        ? this.state.data[fieldName].length >= 4
                            ? !this.state.data[fieldName].match(/[!@#$_\-@]/)
                                ? ""
                                : "username must not have any special character"
                            : "username must be atleast 4 character"
                        : "username must start with lowercase"
                    : "require field"
                break

                case 'email':
                    errMsg = this.state.data[fieldName]
                        ? !this.state.data[fieldName].match(/[A-Z]/)
                            ? this.state.data[fieldName].match(/[@]gmail[.]com$/)
                                ? ""
                                : "email must be end with @gmail.com"
                            : "email doesn't contain any uppercase alphabet"
                        : "requirrd field"
                    break;

            // case 'email':
            //     errMsg = this.state.data[fieldName]
            //         ? this.state.data[fieldName].match(/[@]gmail[.]com$/)
            //             ? this.state.data[fieldName].match(/[A-Z]/)
            //                 ? "email doesn't contain any uppercase alphabet "
            //                 : ""
            //             : "email must be end with @gmail.com"
            //         : "requirrd field"
            //     break;

            case 'password':
                errMsg = this.state.data.confirmpassword
                    ? this.state.data[fieldName] === this.state.data['confirmpassword']
                        ? ""
                        : "Password doesn't match with Confirm Password..."
                    : this.state.data[fieldName]
                        ? this.state.data[fieldName].match(/[a-z]/)
                            ? this.state.data[fieldName].match(/[A-Z]/)
                                ? this.state.data[fieldName].match(/[!@#$%&*]/)
                                    ? this.state.data[fieldName].match(/[1-9]/)
                                        ? this.state.data[fieldName].length < 8
                                            ? "password must contain atleast 8 character"
                                            : this.state.data[fieldName].length >= 8 && this.state.data[fieldName].length <= 15
                                                ? ""
                                                : this.state.data[fieldName].length > 15
                                                    ? "password must not contain greater than 15 character"
                                                    : ""
                                        : "password must contain atleast one number"
                                    : "password must contain atleast one special character"
                                : "password must contain atleast one uppercase alphabet"
                            : "password must contain atleast one lowercase alphabet"
                        : "required field"
                break;

            case 'confirmpassword':
                errMsg = this.state.data.password
                    ? this.state.data[fieldName] === this.state.data['password']
                        ? ""
                        : "Confirm Password doesn't match with Password..."
                    : this.state.data[fieldName]
                        ? this.state.data[fieldName].match(/[a-z]/)
                            ? this.state.data[fieldName].match(/[A-Z]/)
                                ? this.state.data[fieldName].match(/[!@#$%&*]/)
                                    ? this.state.data[fieldName].match(/[1-9]/)
                                        ? this.state.data[fieldName].length < 8
                                            ? "password must contain atleast 8 character"
                                            : this.state.data[fieldName].length >= 8 && this.state.data[fieldName].length <= 15
                                                ? ""
                                                : this.state.data[fieldName].length > 15
                                                    ? "password must not contain greater than 15 character"
                                                    : ""
                                        : "password must contain atleast one number"
                                    : "password must contain atleast one special character"
                                : "password must contain atleast one uppercase alphabet"
                            : "password must contain atleast one lowercase alphabet"
                        : "required field"
                break;


            default:
                errMsg = ''
        }
        this.setState(preError => ({
            error: {
                ...preError.error,
                [fieldName]: errMsg
            }
        }), () => {
            // console.log("error is", this.state.error)
            var errorMSg = Object
                .values(this.state.error)
                // .filter(function(err){
                //     if(err){
                //         return err;
                //     }
                // })

                .filter(err => err)

            // if (errorMSg.length == 0) {
            //     this.setState({
            //         isValidForm: true
            //     })
            // }
            // else {
            //     this.setState({
            //         isValidForm: false
            //     })
            // }

            this.setState({
                isValidForm: errorMSg.length === 0
            })

            console.log("error Message: ", errorMSg)
        })
    }


    handleSubmit = event => {
        event.preventDefault()
        toast.info("Registering.....")
        this.setState({
            isSubmitting: true
        })

        // api call
        // data prepration
        // sending data to server

        setTimeout(() => {
            toast.error("Register fail...")
            this.setState({
                isSubmitting: false
            })
        }, 3000);
    }


    render() {
        return (
            <div className='w-50 shadow-lg p-3 m-auto'>
                <h1 className='text-center'>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='username'>Username</label>
                    <input type='text' name="username" className='form-control from-control-lg' onChange={this.handlechange} />
                    <span className='text-danger'>{this.state.error.username}</span>
                    {/* <br/>
                    <label htmlFor='firstname'>Firstname</label>
                    <input type='text' name="firstname" className='form-control from-control-lg' onChange={this.handlechange} />
                    <br />
                    <label htmlFor='lastname'>Lastname</label>
                    <input type='text' name="lastname" className='form-control from-control-lg' onChange={this.handlechange} /> */}
                    <br />
                    <label htmlFor='email'>Email Address</label>
                    <input type='email' name="email" className='form-control from-control-lg' onChange={this.handlechange} />
                    <span className='text-danger'>{this.state.error.email}</span>
                    <br />
                    <label htmlFor='dob'>Date Of Birth</label>
                    <input type='date' name="dob" className='form-control from-control-lg' onChange={this.handlechange} />

                    <br />

                    {/* <label htmlFor='gender'>Gender</label>
                    <input type='radio' name='gender' id='male' />
                    <label htmlFor='male'>Male</label>
                    <input type='radio' name='gender' id='female' />
                    <label htmlFor='female'>Female</label>
                    <input type='radio' name='gender' id='other' />
                    <label htmlFor='other'>Other</label>

                    <br /> */}

                    <label htmlFor='temporaryAddress'>Temporary Address</label>
                    <input type='text' name="temporaryAddress" className='form-control from-control-lg' onChange={this.handlechange} />
                    <br />
                    <label htmlFor='permanentAddress'>Permanent Address</label>
                    <input type='text' name="permanentAddress" className='form-control from-control-lg' onChange={this.handlechange} />
                    <br />
                    <label htmlFor='password'>New Password</label>
                    <input type='text' name='password' className='form-control from-control-lg' onChange={this.handlechange} />
                    <span className='text-danger'>{this.state.error.password}</span>
                    <br />
                    <label htmlFor='confirmpassword'>Confirm Password</label>
                    <input type='text' name='confirmpassword' className='form-control from-control-lg' onChange={this.handlechange} />
                    <span className='text-danger'>{this.state.error.confirmpassword}</span>
                    <br />
                    <Button
                        enabledLabel="Register"
                        disabledLabel="Registering..."
                        isSubmitting={this.state.isSubmitting}
                        isValidForm={this.state.isValidForm}
                    ></Button>

                </form>
                <Footer/>
            </div>
        )
    }
}