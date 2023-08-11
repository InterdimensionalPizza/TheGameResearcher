import axios from "axios";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function SearchPage() {
    let { api, gameObject, setGameObject, guid, setGuid, inputValue, searchObject, searchList, setSearchList, setGameId } = useOutletContext()
    let navigate = useNavigate()

    async function GetSearch() {
        if (searchObject) {
        let response = await api.get(`search/${searchObject}`)
        console.log(response.data)
        setSearchList(response.data.results)

        }
    }
    console.log(gameObject)

    useEffect(() => {
        GetSearch()
    },[searchObject])

    function clicker(element) {
        setGuid(element.guid)
        setGameId(element.id)
        navigate("/game")
    }

    return <>
    <h1>Search</h1>
    {searchList &&
    <div className="searchlist" >{searchList.map((element, index) => (
        <div className="searchelem" onClick={() => clicker(element)} key={index}>
            <h2>{element.name}</h2>
            <img className="searchimg" src={element.image.original_url} />
        </div>
    ))}</div>}
    </>
}