// import React from 'react';
// import "./Header.component.css";
// import { NavLink } from 'react-router-dom';

// function Header(props) {
//     return (
//         <div className="header"> {/* Apply the header class here */}
//             {props.isLoggedIn ?
//                 <ul>
//                     {/* Navigation links for logged-in users */}
//                     <li><NavLink to="/">Home</NavLink></li>
//                     <li><NavLink to="/product">Product</NavLink></li>
//                     <li><NavLink to="/gallery">Gallery</NavLink></li>
//                     <li><NavLink to="/logout">LogOut</NavLink></li>
//                 </ul>
//                 :
//                 <ul>
//                     {/* Navigation links for non-logged-in users */}
//                     <li><NavLink to="/">Home</NavLink></li>
//                     <li><NavLink to="/product">Product</NavLink></li>
//                     <li><NavLink to="/gallery">Gallery</NavLink></li>
//                     <li><NavLink to="/aboutUs">About Us</NavLink></li>
//                     <li><NavLink to="/login">LogIn</NavLink></li>
//                     <li><NavLink to="/register">Register</NavLink></li>
//                 </ul>
//             }
//         </div>
//     );
// }

// export const Navbar = Header;


import React, { useState } from 'react';
import "./Header.component.css";
import { NavLink } from 'react-router-dom';

function Header(props) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="header">
            <div className="toggle-button" onClick={handleToggle}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                {props.isLoggedIn ? (
                    <>
                        <li><NavLink exact to="/" activeClassName="active-class">Home</NavLink></li>
                        <li><NavLink to="/product" activeClassName="active-class">Product</NavLink></li>
                        <li><NavLink to="/gallery" activeClassName="active-class">Gallery</NavLink></li>
                        <li><NavLink to="/logout" activeClassName="active-class">LogOut</NavLink></li>
                    </>
                ) : (
                    <>
                        <li><NavLink exact to="/" activeClassName="active-class">Home</NavLink></li>
                        <li><NavLink to="/product" activeClassName="active-class">Product</NavLink></li>
                        <li><NavLink to="/gallery" activeClassName="active-class">Gallery</NavLink></li>
                        <li><NavLink to="/aboutUs" activeClassName="active-class">About Us</NavLink></li>
                        <li><NavLink to="/login" activeClassName="active-class">LogIn</NavLink></li>
                        <li><NavLink to="/register" activeClassName="active-class">Register</NavLink></li>
                    </>
                )}
            </ul>
        </div>
    );
}

export const Navbar = Header;
