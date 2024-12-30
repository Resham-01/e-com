import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Sidebar.component.css";

export const Sidebar = () => {
    const [activeSection, setActiveSection] = useState(null);

    const handleCollapseToggle = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div className="sidebar bg-info pt-0 mt-0" style={{ height: "700px" }}>
            <div className="flex-shrink-0 p-3" style={{ width: "280px" }}>
                <Link to="/" className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
                    <i className="bi bi-speedometer2 me-2"></i>
                    <span className="fs-5 fw-semibold">Admin Dashboard</span>
                </Link>
                <ul className="list-unstyled ps-0">
                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0"
                            onClick={() => handleCollapseToggle('home')}>
                            <i className={`bi bi-chevron-right rotate-icon ${activeSection === 'home' ? 'expanded' : 'collapsed'}`}></i>
                            Home
                        </button>
                        <div className={`collapse ms-5 ${activeSection === 'home' ? 'show' : ''}`}>
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><Link to="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Overview</Link></li>
                                <li><Link to="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Updates</Link></li>
                                <li><Link to="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Reports</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0"
                            onClick={() => handleCollapseToggle('dashboard')}>
                            <i className={`bi bi-chevron-right rotate-icon ${activeSection === 'dashboard' ? 'expanded' : 'collapsed'}`}></i>
                            Dashboard
                        </button>
                        <div className={`collapse ms-5 ${activeSection === 'dashboard' ? 'show' : ''}`}>
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><Link to="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Overview</Link></li>
                                <li><Link to="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Weekly</Link></li>
                                <li><Link to="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Monthly</Link></li>
                                <li><Link to="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Annually</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0"
                            onClick={() => handleCollapseToggle('category')}>
                            <i className={`bi bi-chevron-right rotate-icon ${activeSection === 'category' ? 'expanded' : 'collapsed'}`}></i>
                            Category
                        </button>
                        <div className={`collapse ms-5 ${activeSection === 'category' ? 'show' : ''}`}>
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><Link to="/admin/category/add" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Add</Link></li>
                                <li><Link to="/admin/category/view" className="link-body-emphasis d-inline-flex text-decoration-none rounded">View</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0"
                            onClick={() => handleCollapseToggle('product')}>
                            <i className={`bi bi-chevron-right rotate-icon ${activeSection === 'product' ? 'expanded' : 'collapsed'}`}></i>
                            Product
                        </button>
                        <div className={`collapse ms-5 ${activeSection === 'product' ? 'show' : ''}`}>
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><Link to="/admin/product/add" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Add</Link></li>
                                <li><Link to="/admin/product/view" className="link-body-emphasis d-inline-flex text-decoration-none rounded">View</Link></li>
                            </ul>
                        </div>
                    </li>

                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0"
                            onClick={() => handleCollapseToggle('searchProduct')}>
                            <i className={`bi bi-chevron-right rotate-icon ${activeSection === 'searchProduct' ? 'expanded' : 'collapsed'}`}></i>
                            Search Product
                        </button>
                        <div className={`collapse ms-5 ${activeSection === 'searchProduct' ? 'show' : ''}`}>
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><Link to="/admin/product/search" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Search</Link></li>
                            </ul>
                        </div>
                    </li>


                    <li className="border-top my-3"></li>
                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0"
                            onClick={() => handleCollapseToggle('account')}>
                            <i className={`bi bi-chevron-right rotate-icon ${activeSection === 'account' ? 'expanded' : 'collapsed'}`}></i>
                            Statistics
                        </button>
                        <div className={`collapse ms-5 ${activeSection === 'account' ? 'show' : ''}`}>
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><Link to="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">New...</Link></li>
                                <li><Link to="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Profile</Link></li>
                                <li><Link to="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Settings</Link></li>
                                <li><Link to="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Sign out</Link></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}