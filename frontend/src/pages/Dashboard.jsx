import { useEffect  } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import GoalForm from '../components/GoalForm'

export default function Dashboard() {

 

  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  console.log(user.name);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [])

  return (
    <div>
      DASHBOARD
      <h3> {user && user.name} </h3>
      <p>Goals Dashboard</p>
      <GoalForm />
      
    </div>
  )
  }