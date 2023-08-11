import axios from "axios";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function SearchPage() {
    let { api, gameObject, setGameObject, guid, setGuid, inputValue, searchObject } = useOutletContext()

    async function GetSearch() {
        if (searchObject) {
        let response = await api.get(`search/${searchObject}`)
        console.log(response.data)
        setGameObject(response.data.results)

        }
    }
    console.log(gameObject)

    useEffect(() => {
        GetSearch()
    },[searchObject])

    return <>
    <h1>Search</h1>
    {gameObject &&
    <div>{gameObject.map((element, index) => (
        <div key={index}>{element.name}</div>
    ))}</div>}
    </>
}