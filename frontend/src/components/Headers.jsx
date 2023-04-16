import React from 'react'
import { FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { logOut  } from '../slices/authSlice'

export default function Headers() {

    const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const onLogOut = ()=>{
    localStorage.removeItem('user')
    dispatch(logOut())
    navigate('/login')
  }

//   const semh = ()=>{
//     console.log("semh")
//     const user = JSON.parse(localStorage.getItem('user'))
//     console.log(user.name)
//     dispatch(semha())
//   }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid d-flex">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
                        <div className="navbar-nav ">
                            <Link className="nav-link" to="/">Home</Link>
                            {
                                user ? <button className='btn btn-link' onClick={onLogOut}> <FaSignOutAlt/> Log Out   </button> 
                                :<Link className="nav-link" to="login"> <FaSignOutAlt/> Login </Link>
                            }
                            
                            <Link className="nav-link" to="register"> <FaUser/> Register</Link>
                        </div>
                    </div>
                    {/* <div>
                        <button className='navbar-collapse btn btn-success ' onClick={semh}>semh</button>
                    </div> */}
                </div>
            </nav>
        </div>
    )
}
