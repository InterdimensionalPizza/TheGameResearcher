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
        navigate("/game")
    }
    console.log(wishlist)

    return <> 
    <h2>Wishlist</h2>
    {wishlist && 
    <div className="searchlist" >{wishlist.map((element, index) => (
        <div className="searchelem" onClick={() => clicker(element)} key={index}>
            <h2>{element.title}</h2>
            <img className="searchimg" src={element.img_url} alt={element.img_url} />
        </div>
    ))}</div>}
</>
}