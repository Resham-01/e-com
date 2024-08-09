import React, { useState } from 'react';
import "./Header.component.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utility/isAuthenticated';

function Header(props) {
    let user = isAuthenticated();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    console.log(user);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="header">
            <div className="toggle-button" onClick={handleToggle}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                <li><NavLink exact to="/" activeClassName="active-class">Home</NavLink></li>
                <li><NavLink to="/product" activeClassName="active-class">Product</NavLink></li>
                <li><NavLink to="/gallery" activeClassName="active-class">Gallery</NavLink></li>
                <li><NavLink to="/aboutUs" activeClassName="active-class">About Us</NavLink></li>
                {!user && (
                    <>
                        <li><NavLink to="/login" activeClassName="active-class">LogIn</NavLink></li>
                        <li><NavLink to="/register" activeClassName="active-class">Register</NavLink></li>
                    </>
                )}
                {user && (
                    <>
                        <li className="profile-menu" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                            <NavLink to={user.role === "admin" ? "/admin/profile" : "/user/profile"} activeClassName="active-class">
                                {user.userName} &nbsp;
                                <img src={user.image?.[0]} alt="Profile" className="profile-picture" />
                            </NavLink>
                            {showDropdown && (
                                <div className="dropdown-menu">
                                    <NavLink to={user.role === "admin" ? "/admin/profile" : "/user/profile"}>View Profile</NavLink>
                                    <NavLink to="/setting">Settings</NavLink>
                                    <NavLink to="/help-center">Help Center</NavLink>
                                    <div onClick={handleLogout}>Log Out</div>
                                </div>
                            )}
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

export const Navbar = Header;


