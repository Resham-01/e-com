import React from "react";

import { BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import { Home } from "./component/Auth/Page/Home.component";
import { Navbar } from "./component/common/Header/Header.component";
import { Count } from "./component/Pages/count.component";
import { SignUp } from "./component/Auth/Register/signup.component";
import { Product } from "./component/Auth/Page/Product.component";
import { AboutUs } from "./component/Auth/Page/About.component";
import { Gallery } from "./component/Auth/Page/Gallery.component";
import { SignIn } from "./component/Auth/Login/SignIn";

const PageNotFound = props => {
    return (
        <div className="text-center">
            <h1>Page Not Found</h1>
            <img src="https://static.vecteezy.com/system/resources/previews/024/217/744/non_2x/design-template-for-web-page-with-404-error-isometric-page-not-working-error-png.png" alt="404 error" width={"400px"} height={"400px"}/>
            <p>Go To <NavLink to="/" className={"text-primary"}>Home Page</NavLink></p>
        </div>
    )
}

export const MyRoute = (props) => { 
    return <BrowserRouter>
    <Navbar isLoggedIn={false} />
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/product" element={<Product/>}/>
            <Route path="/aboutus" element={<AboutUs/>}/>
            <Route path="/gallery" element={<Gallery/>}/>
            <Route path="/login" element={<SignIn/>} />
            <Route path="/register" element={<SignUp/>} />
            <Route path="/count" element={<Count/>} />
            <Route path="*" element={<PageNotFound/>} />
            
        </Routes>
    </BrowserRouter>
}