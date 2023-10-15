import { useState } from "react"

import "./index.css"

const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    const [formData, setFormData] = useState({"username":"", "password":""})

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (
        <form style={{ width: "20em" }}>
            <div>
                <label htmlFor="name">Username</label>
                <input placeholder="gburdell1" type="text" name="username" onChange={handleChange} />
            </div>
            
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={handleChange}/>
            </div>

            <button onClick={handleSubmit}>
                Register
            </button>
        </form>
    )
}

export default Login