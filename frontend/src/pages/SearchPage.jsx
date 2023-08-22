import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export default function SearchPage() {
    let { api, setGuid, searchObject, searchList, setSearchList, setGameId, setGameObject, setSearchObject } = useOutletContext()
    let navigate = useNavigate()

    async function GetSearch() {
        if (searchObject) {
        let response = await api.get(`search/${searchObject}`)
        console.log(response.data)
        setSearchList(response.data.results)
        } else {
            setSearchObject(localStorage.getItem("searchObject"))
        }
    }

    useEffect(() => {
        GetSearch()
    },[searchObject])

    function clicker(element) {
        setGuid(element.guid)
        localStorage.setItem("guid", element.guid)
        setGameId(element.id)
        localStorage.setItem("game_id", element.id)
        setGameObject(null)
        navigate("/game")
    }

    return <>
    {searchList &&
    <>
    {searchList!="" ? <>
    <div className="searchlist" >{searchList.map((element, index) => (
        <div className="searchelem grow" onClick={() => clicker(element)} key={index}>
            <h2>{element.name}</h2>
            <img className="searchimg" src={element.image.original_url} />
        </div>
    ))}</div> </> : <h2>Looks like theres no results for that search, sorry!</h2>}
    </>}
    </>
}
