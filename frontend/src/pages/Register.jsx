import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reset, register } from '../slices/authSlice'
import Spinner from '../components/Spinner';

export default function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

  useEffect(()=>{
    if(isError){
      toast.error(message)
      console.log('Error Effect SEMH')
    }
    if(isSuccess && user){
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, isLoading, message , dispatch , navigate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

    // console.log(name);
  }

  const onsubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Password Didnt Match')
    } else {
      const userData = {
        name,
        email,
        password
      }

      dispatch(register(userData))
    }
  }

  if(isLoading){
    <Spinner/>
  }

  return (

    <div className="container">
      <div className="row">
        <div className="col-6">

          <form onSubmit={onsubmit}>
            <div className="mb-3 mt-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name="name" value={name} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">email</label>
              <input type="email" className="form-control" id="email" name="email" value={email} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" value={password} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="c-password" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="c-password" name="password2" value={password2} onChange={onChange} />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="col-1"></div>
        <div className="col-5"></div>
      </div>


    </div>
  )
}
