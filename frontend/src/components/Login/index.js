import { useState } from "react"

import "./index.css"

const Login = () => {
    const [formData, setFormData] = useState({"username":"", "password":""})

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:5000/register", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
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
                Enter
            </button>
        </form>
    )
}

export default Login