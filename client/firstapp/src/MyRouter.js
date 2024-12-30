import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Home } from "./component/Auth/Page/User/Home.component";
import { Navbar } from "./component/common/Header/Header.component";
import { Count } from "./component/Pages/count.component";
import { SignUp } from "./component/Auth/Register/signup.component";
import { Product } from "./component/Auth/Page/User/Product.component";
import { AboutUs } from "./component/Auth/Page/User/About.component";
import { Gallery } from "./component/Auth/Page/User/Gallery.component";
import { SignIn } from "./component/Auth/Login/SignIn";
import { AdminDashboard } from "./component/Auth/Page/Admin/Dashboard/Dashboard.component";
import { AddCategory } from "./component/Auth/Page/Admin/Category/Add/AddCategory.component";
import { ViewCategory } from "./component/Auth/Page/Admin/Category/View/ViewCategory.component";
import { DeleteCategory } from "./component/Auth/Page/Admin/Category/Delete/DeleteCategory.component";
import { AddProduct } from "./component/Auth/Page/Admin/Product/Add/AddProduct.component";
import { UpdateCategory } from "./component/Auth/Page/Admin/Category/Update/UpdateCategory.component";
import { ViewProduct } from "./component/Auth/Page/Admin/Product/View/ViewProduct.component";
import { UserProfile } from "./component/Auth/Page/User/User Profile/Userprofile.component";
import { Setting } from "./component/Auth/Page/User/Setting/Setting.component";
import { ProductDetails } from "./component/Auth/Page/Admin/Product/ProductDetails/ProductDetails.component";
import { DeleteProduct } from "./component/Auth/Page/Admin/Product/Delete/DeleteProduct.component";
import { UpdateProduct } from "./component/Auth/Page/Admin/Product/Update/UpdateProduct.component";
import { SearchProduct } from "./component/Auth/Page/Admin/Product/SearchProduct/SearchProduct.component";
import { ForgotPassword } from "./component/Auth/Forget Password/Forgotpassword.Component";
import { ResetPassword } from "./component/Auth/Reset Password/ResetPassword.component";

const PageNotFound = () => {
    return (
        <div className="text-center">
            <h1>Page Not Found</h1>
            <img 
                src="https://static.vecteezy.com/system/resources/previews/024/217/744/non_2x/design-template-for-web-page-with-404-error-isometric-page-not-working-error-png.png" 
                alt="404 error" 
                width={"400px"} 
                height={"400px"}
            />
            <p>Go To <NavLink to="/" className={"text-primary"}>Home Page</NavLink></p>
        </div>
    );
}

export const MyRoute = () => { 
    return (
        <BrowserRouter>
            <Navbar isLoggedIn={false} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product" element={<Product />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/count" element={<Count />} />
                
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/category/add" element={<AddCategory />} />
                <Route path="/admin/category/view" element={<ViewCategory />} />
                <Route path="/admin/category/delete/:category_id" element={<DeleteCategory />} />
                <Route path="/admin/category/update/:category_id" element={<UpdateCategory />} />
                
                <Route path="/admin/product/add" element={<AddProduct />} />
                <Route path="/admin/product/view" element={<ViewProduct />} />
                <Route path="/admin/product/view_details/:product_id" element={<ProductDetails />} />
                <Route path="/admin/product/delete/:product_id" element={<DeleteProduct />} />
                <Route path="/admin/product/update/:product_id" element={<UpdateProduct />} />
                <Route path="/admin/product/search" element={<SearchProduct />} />
                
                <Route path="/admin/profile" element={<AdminDashboard />} />
                <Route path="/user/profile" element={<UserProfile />} />
                <Route path="/setting" element={<Setting />} />
                
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
