import axios from "axios";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function HomePage() {
    let { inputValue, setSearchObject, setInputValue, setGameObject, setSearchList } = useOutletContext()
    let navigate = useNavigate()
    
    return <div className="backgroundimg">
    <h2 className="homeh2">Home</h2>
    <div className="maincontainer">
    <div className="mainsearch">
    <form onSubmit={() => {navigate(`/search`), setSearchObject(inputValue), localStorage.setItem("searchObject", inputValue), setInputValue(""), setGameObject(null), setSearchList(null)}}>
    <input className="mainsearchbar" placeholder="Search for a game" value={inputValue} onChange={(event) => (setInputValue(event.target.value))}></input>
    </form>
    </div>
    </div>
    </div>
}