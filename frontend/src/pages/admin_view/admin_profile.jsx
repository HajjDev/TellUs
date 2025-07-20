import {Outlet, Link} from "react-router-dom"

function AdminProfile(){
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