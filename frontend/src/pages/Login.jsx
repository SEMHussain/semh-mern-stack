import React, { useState , useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../slices/authSlice'
// import Spinner from '../components/Spinner';

export default function Login() {

  const [formData, setFormData] = useState({
  
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

  useEffect(()=>{
    if(isError){
      toast.error(message)
      console.log('Error Effect SEMH')
    }
    if(isSuccess && user){
      navigate('/db')
    }

  }, [user, isError, isSuccess, isLoading, message , dispatch , navigate])

  const {  email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

    // console.log(name);
  }

  const onsubmit = (e) => {
    e.preventDefault()
    const userData = {
        email,
        password
      }

      dispatch(login(userData))
  }

  return (

    <div className="container">
      <div className="row">
        <div className="col-6">

          <form onSubmit={onsubmit}>

            <div className="mb-3 mt-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={email} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" value={password} onChange={onChange} />
            </div>

            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
        <div className="col-1"></div>
        <div className="col-5"></div>
      </div>


    </div>
  )
}
