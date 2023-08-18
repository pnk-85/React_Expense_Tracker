import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Profile = () => {
    return (
        <div>
            <h1>Welcome to Expense_Tracker!!!</h1>
            <h3 className="float-end me-">
                Your profile is incomplete
                <Link to="/profilepage">Complete Now</Link>
            </h3>
        </div>

    )
};


export default Profile;