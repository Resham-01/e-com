import React, { useState } from 'react';
import { isAuthenticated } from '../../utility/isAuthenticated';
import "./Profile.component.css";

export const Profile = () => {
    let user = isAuthenticated();
    const [formData, setFormData] = useState({
        fullName: user.userName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        bio: user.bio || '',
        image: user.image?.[0] || ''
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // Save the updated profile data to the server or local storage
        setIsEditing(false);
        // Optionally, you can add a success notification here
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset form data to original user data
        setFormData({
            fullName: user.fullName || '',
            email: user.email || '',
            phoneNumber: user.phoneNumber || '',
            bio: user.bio || '',
            image: user.image?.[0] || ''
        });
    };

    return (
        <div className="outer-container">
            <div className="shadow-lg p-5 profile-container">
                <h1 className='ms-4'>{user.role === "admin" ? "Admin" : "User"} Profile</h1>
                <div className='profile-container text-center'>
                    {isEditing ? (
                        <>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Bio</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    className="form-control"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Profile Image</label>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="form-control"
                                />
                                {formData.image && (
                                    <img src={formData.image} alt="Profile" className="profile-preview" />
                                )}
                            </div>
                            <div className="form-group">
                                <button onClick={handleSave} className="btn btn-success me-2">Save</button>
                                <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <img src={formData.image} alt="Profile" className="profile" />
                            <h3>{formData.fullName}</h3>
                            <p>{formData.email}</p>
                            <p>{formData.phoneNumber}</p>
                            <p>{formData.bio}</p>
                            <button onClick={() => setIsEditing(true)} className="btn btn-primary">Edit Profile</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
