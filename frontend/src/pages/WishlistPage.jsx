import { Outlet, Link, useOutletContext } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function WishlistPage() {
    let { wishlist, setGuid, getWishlist, setGameId, setGameObject, user } = useOutletContext()
    let navigate = useNavigate()
    
    useEffect(() => {
        if (user) {
            getWishlist()
        }
    }, [user])

    function clicker(element) {
        setGuid(element.guid)
        localStorage.setItem("guid", element.guid)
        setGameId(element.game_id)
        localStorage.setItem("game_id", element.game_id)
        setGameObject(null)
        navigate("/game")
    }

    return <> 
    {user ? <>
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
    } </>
    : <h2 className="wishlistnoaccount">Looks like youre not signed in. Create an account or sign in to access your wishlist.</h2>}
</>
}