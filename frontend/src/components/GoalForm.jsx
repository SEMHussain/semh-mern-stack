import { useState } from 'react'
import {  useDispatch } from 'react-redux'
import { createGoal } from '../slices/goals/goalSlice'

export default function GoalForm() {

    const [text, setText] = useState('')

    const dispatch = useDispatch();

    const onsubmit = (e) => {
        e.preventDefault()
        console.log(text);
        dispatch(createGoal(text))
        setText('')
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-6">

                    <form onSubmit={onsubmit}>
                        <div className="mb-3 mt-3">
                            <label htmlFor="nameLable" className="form-label">Name</label>
                            <input type="text" className="form-control" id="nameLable" name="name" value={text} onChange={(e) => { setText(e.target.value); console.log(e.target.value) }} />
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
