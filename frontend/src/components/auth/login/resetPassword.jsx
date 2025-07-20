import {Link, Outlet} from 'react-router-dom'

function ResetPassword(){
    return (
        <div>
            <p>Password Forgotten, reset it here: <Link to="/password/reset">reset password</Link></p>
            <Outlet/>
        </div>
    )
}

export default ResetPassword