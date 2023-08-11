import { useState, useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../utilities";
import { useOutletContext } from "react-router-dom";

export default function RegisterPage() {
    const { user, setUser, username, setUsername, password, setPassword } = useOutletContext();
    const navigate = useNavigate()

    const register = async (e) => {
        e.preventDefault()
        let response = await api.post("user/signup/", {
            "email": username,
            "password": password
        })
        .catch((err) => {
            alert("Invalid credentials")
            console.log(err)
        })
        setUser(response.data.user)
        let token = response.data.token;
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`
        setUsername("")
        setPassword("")
        navigate("/home")
    }
    
    return <>
        <form onSubmit={(e) => register(e)}>
            <h2>Register</h2>
            <input placeholder="Email" type="email" value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <input type="submit" value="Register"></input>
        </form>
    </>
}