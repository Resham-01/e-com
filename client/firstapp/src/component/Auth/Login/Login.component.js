// import React, { Component } from 'react';
// import { Button } from '../../common/Button/Button.component';
// // import { Footer } from '../../common/Footer/Footer.component';
// import { toast } from 'react-hot-toast';
// import { Link } from 'react-router-dom';

// export class Login extends Component {
//     constructor() {
//         super()
//         this.state = {
//             username: "",
//             password: "",
//             isValidForm: false
//         }
//     }

//     handlechange = (event) => {         // es6
//         // console.log(event.target)
//         const { name, value } = event.target;
//         // asynchronous
//         this.setState({
//             [name]: value
//         }, () => {
//             console.log(this.state)
//         })
//     }

//     handlesubmit = (event) => {
//         event.preventDefault()
//         toast.loading("Login in progress...")
//         this.setState({
//             isSubmitting: true
//         })
//         setTimeout(() => {
//             toast.error("Login failed")
//             this.setState({
//                 isSubmitting: false
//             })
//         }, 3000);
//     }

//     render() {
//         return (
//             <div className='w-50 shadow-lg p-3 m-auto'>
//                 <h1 className='text-center'>Login</h1>
//                 <form onSubmit={this.handlesubmit}>
//                     <label htmlFor='username'>Username</label>
//                     <input type='text' name="username" className='form-control from-control-lg' onChange={this.handlechange} />

//                     <label htmlFor='password'>Password</label>
//                     <input type='password' name='password' className='form-control from-control-lg' onChange={this.handlechange} />

//                     <Button
//                         enabledLabel="Login"
//                         disabledLabel="LoginingIn..."
//                         isValidForm={!this.state.isValidForm}
//                     ></Button>
//                 <p>Don't have an Account? <Link to={"/register"} className='text-info'>Register</Link></p>
//                 </form>
//             </div>
//         )
//     }
// }
