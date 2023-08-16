import { Outlet, Link, useOutletContext } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function WishlistPage() {
    let { wishlist, setGuid, getWishlist, setGameId, setGameObject } = useOutletContext()
    let navigate = useNavigate()
    
    useEffect(() => {
        getWishlist()
    }, [])

    function clicker(element) {
        setGuid(element.guid)
        setGameId(element.game_id)
        setGameObject(null)
        navigate("/game")
    }
    console.log(wishlist)

    return <> 
    <h2>Wishlist</h2>
    {wishlist && <>
    { wishlist!="" ? <>
    <div className="searchlist" >{wishlist.map((element, index) => (
        <div className="searchelem grow" onClick={() => clicker(element)} key={index}>
            <h2>{element.title}</h2>
            <img className="searchimg" src={element.img_url} alt={element.img_url} />
        </div>
    ))}</div>
    </> : <h2>Looks like you dont have any games in your wishlist! Try searching for a game and clicking the add to wishlist button!</h2>}
    </>
    }
</>
}