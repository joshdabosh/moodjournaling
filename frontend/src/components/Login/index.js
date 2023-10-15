import { useState } from "react"

import "./index.css"

const Login = (props) => {
    const [formData, setFormData] = useState({"username":"", "password":""})

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const resp = await fetch("http://localhost:5000/login", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const login_result = await resp.json()
        if (login_result.status == "login successful") {
            props.setIsUserLoggedIn(true)
            props.setAppState(1)
        }
        
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const resp = await fetch("http://localhost:5000/register", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        
    }

    return (
        <>
        {props.visible &&
        <form style={{ width: "20em" }}>
            <div>
                <label htmlFor="name">Username</label>
                <input placeholder="gburdell1" type="text" name="username" onChange={handleChange} />
            </div>
            
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={handleChange}/>
            </div>

            <button onClick={handleLogin}>
                Login
            </button>
            <button onClick={handleRegister}>
                Register
            </button>
        </form>
        }
        </>
    )
}

export default Login
