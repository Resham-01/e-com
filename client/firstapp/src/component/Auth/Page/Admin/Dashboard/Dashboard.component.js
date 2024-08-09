import React from "react";
import { Sidebar } from "../../../../common/Sidebar/Sidebar.component";
import { Profile } from "../../../../common/Profile/Profile.component";

export const AdminDashboard = props => {
    return (
        <>
            <div className="row pt-0 mt-0">
                <div className="col-md-3">
                    <Sidebar/>
                </div>

                <div className="col-md-9">
                    <Profile/>
                </div>
            </div>

        </>
    )
}