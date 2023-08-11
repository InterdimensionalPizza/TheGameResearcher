import axios from "axios";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function GamePage() {
    let { api, gameObject, setGameObject, guid, setGuid, gameid, setGameId, reviewsObject, setReviewsObject } = useOutletContext()

    async function getgame() {
        let response = await api.get(`game/${guid}`)
        console.log(response.data.results)
        setGameObject(response.data.results)
    }

    async function getreviews() {
        let response = await api.get(`reviews/${gameid}`)
        console.log(response.data.results)
        setReviewsObject(response.data.results)
        console.log(reviewsObject)
    }

    useEffect(() => {
        getgame()
        getreviews()
    }, [])
    
    return <>
    { gameObject &&
    <div className="gamepagegame">
        <div className="gameheader">
            <h2>{gameObject.name}</h2>
            <img src={gameObject.image.original_url} />
            <div>
                <h2>Related Images</h2>
                <div className="relatedimg">{gameObject.images.map((element, index) => (
                    <img key={index} src={element.medium_url}/>
                ))}</div>
                <h2>Characters</h2>
                <div>{gameObject.characters.map((element, index) => (
                    <h4 key={index}>{element.name}</h4>
                ))}</div>
            </div>
        </div>
    <div className="content" dangerouslySetInnerHTML={{__html: gameObject.description}}></div>
    { reviewsObject &&
    <>
    <h1>User Reviews</h1>
    <div>{reviewsObject.map((element, index) => (
                    <div className="content">
                    <h3>{element.reviewer}</h3>
                    <div dangerouslySetInnerHTML={{__html: element.description}}></div>
                    </div>
                ))}</div></>}
    </div>}
    </>
}