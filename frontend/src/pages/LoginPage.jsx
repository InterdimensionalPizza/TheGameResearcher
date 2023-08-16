import { useState, useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../utilities";
import { useOutletContext } from "react-router-dom";

export default function LoginPage() {
    const { user, setUser, username, setUsername, password, setPassword } = useOutletContext();
    const navigate = useNavigate()

    const Login = async (e) => {
        e.preventDefault()
        let response = await api.post("user/login/", {
            "email": username,
            "password": password
        })
        .catch((err) => {
            alert("Invalid credentials")
            console.log(err)
        })
        let token = response.data.token 
        setUser(response.data.user)
        localStorage.setItem("token", token)
        api.defaults.headers.common["Authorization"] = `Token ${token}`
        setPassword("")
        navigate("/home")
    }
    
    return <>
    <div className="">
    <form onSubmit={(e) => Login(e)}>
        <h2 className="">Login</h2>
        <input className="" placeholder="Email" type="email" value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <input className="" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <input className="" type="submit" value="Login"></input>
    </form>
    </div>
</>
}