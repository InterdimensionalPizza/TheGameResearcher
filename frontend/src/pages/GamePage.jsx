import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export default function GamePage() {
    let { api, gameObject, setGameObject, guid, gameid, reviewsObject, setReviewsObject, addtowishlist, removefromwishlist, inWishlist, decideguy, setdecideguy, setGuid, setGameId, getWishlist, user, wishlist} = useOutletContext()

    async function getgame() {
        if (guid != null) {
        let response = await api.get(`game/${guid}`)
        console.log(response.data.results)
        setGameObject(response.data.results)
        }

        if (guid == null) {
            setGuid(localStorage.getItem("guid"))
        }
    }

    async function getreviews() {
        if (gameid != null) { 
        let response = await api.get(`reviews/${gameid}`)
        console.log(response.data.results)
        setReviewsObject(response.data.results)
        }
        
        if (gameid == null) {
            setGameId(localStorage.getItem("game_id"))
        }
    }

    useEffect(() => {
        setdecideguy(inWishlist(guid))
    }, [guid, gameid, wishlist])

    useEffect(() => {
        if (user) {
        getWishlist()
        }
    }, [user])

    useEffect(() => {
        getgame()
        getreviews()
    }, [guid, gameid])
    
    return <>
    {gameObject &&
    <div className="gamepagegame">
        <div className="gameheader">
        <button className="wishlistbutton" onClick={decideguy ? removefromwishlist : addtowishlist} >{decideguy ? "Remove From Wishlist" : "Add To Wishlist"}</button>
            <h2>{gameObject.name}</h2>
            <img className="mainimg" src={gameObject.image.original_url} />
            <div>
                { gameObject.images && <>
                <h2>Related Images</h2>
                <div className="relatedimg">{gameObject.images.map((element, index) => (
                    <img key={index} src={element.medium_url}/>
                ))}</div> </> }
                { gameObject.characters && <>
                <h2>Characters</h2>
                <div>{gameObject.characters.map((element, index) => (
                    <h4 key={index}>{element.name}</h4>
                ))}</div> </> }
            </div>
        </div>
    { gameObject.description ? 
    <div className="content" dangerouslySetInnerHTML={{__html: gameObject.description}}></div>
    : <h2>Doesnt look like we have much data for this game, try searching another game!</h2> }
    { reviewsObject &&
    <>
    <h1>User Reviews</h1>
    <div>{reviewsObject.map((element, index) => (
                    <div className="content" key={index}>
                    <h3>{element.reviewer}</h3>
                    <div dangerouslySetInnerHTML={{__html: element.description}}></div>
                    </div>
                ))}</div></>}
    </div>}
    </>
}