import axios from 'axios'

const API_URL = 'http://localhost:8000/api/goals'

const createGoal = async (goalData , token)=>{

    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL , { text : goalData} , config)
    if(response.data){
        localStorage.setItem('user' , JSON.stringify(response.data))
    }

    return response.data
}

const goalService = {
    createGoal
}

export default goalService