import {Link, Outlet} from 'react-router-dom'

function ResetPassword(){
    return (
        <div>
            <p>Password Forgotten, reset it here: <Link to="/reset_password">reset password</Link></p>
            <Outlet/>
        </div>
    )
}

export default ResetPassword