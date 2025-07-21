import {Outlet, Link, Navigate} from "react-router-dom";

function AdminProfile({ authorized }){
    if (!authorized){
        return <Navigate to="/login" />; 

    }

    return (
        <>
            <div>
               <h2>The User profile goes here</h2> 
               <Link to="/enable_mfa">Enable Mfa</Link>
            </div>
            <Outlet />
        </>
    )
}

export default AdminProfile