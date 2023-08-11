import axios from "axios";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function GamePage() {
    let { api, gameObject, setGameObject, guid, setGuid } = useOutletContext()

    async function getgame() {
        setGuid('3030-32697')
        let response = await api.get(`game/${guid}`)
        console.log(response.data)
        setGameObject(response.data.results)
    }

    useEffect(() => {
        //getgame()
    }, [])
    
    return <>
    <h2>Game</h2>
    { gameObject &&
    <>
    <h3>{gameObject.name}</h3>
    <div className="content" dangerouslySetInnerHTML={{__html: gameObject.description}}></div>
    </>}
    </>
}