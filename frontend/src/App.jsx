import { Outlet, renderMatches } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { api } from "./utilities"
import { useNavigate, useLocation } from "react-router-dom";

export default function App() {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gameObject, setGameObject] = useState(null)
  const [searchObject, setSearchObject] = useState(null)
  const [reviewsObject, setReviewsObject] = useState(null)
  const [guid, setGuid] = useState(null)
  const [gameid, setGameId] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [searchList, setSearchList] = useState(null)
  const [wishlist, setWishlist] = useState([])
  const [decideguy, setdecideguy] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const lastVisited = useRef()

  useEffect(() => {
    whoAmI();
  }, []);

  useEffect(() => {
    lastVisited.current = location.pathname;
  }, [location]);


  const whoAmI = async () => {
    let token = localStorage.getItem("token")
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`
      let response = await api.get("user/info/")
      if (response.data.email) {
        setUser(response.data)
        if (lastVisited.current) {
          navigate(lastVisited.current)
        } else {
          navigate("/")
        }
      }
    }
  }

  async function logout() {
    let response = await api.post("user/logout/")
    if (response.status == 204) {
      localStorage.removeItem("token")
      setUser(null)
      setWishlist([])
      delete api.defaults.headers.common["Authorization"]
      navigate("/")
    }
  }

  async function getWishlist() {
      let response = await api.get("wishlist/")
      setWishlist([...response.data])
  }

  async function addtowishlist() {
    if (user) {
    let response = await api.post("games/create/", {
        "title": gameObject.name,
        "guid": gameObject.guid,
        "game_id": gameObject.id,
        "img_url": gameObject.image.original_url
    })
    setWishlist([...wishlist, response.data])
    getWishlist()
    // setdecideguy(!decideguy)
  } else {
    alert("Looks like youre not signed in. Create an account or sign in to add games to your wishlist.")
  }
  }

  async function removefromwishlist() {
    if (user) {
    let response = await api.delete(`games/delete/${gameObject.guid}`)
    console.log(gameObject.guid)
    console.log(response)
    //setdecideguy(!decideguy)
    let newwishlist = []
    for (let i = 0; i < wishlist.length; i++) {
      if (wishlist[i].guid != gameObject.guid) {
        newwishlist.push(wishlist[i])
      }
      setWishlist([...newwishlist])
      getWishlist()
    }

    } else {
      alert("Looks like youre not signed in. Create an account or sign in to add games to your wishlist.")
    }
  }

  function inWishlist(guid) {
    let value = 0
    for (let i=0; i < wishlist.length; i++) {
      if (wishlist[i].guid == guid) {
        value += 1
      }
    }
    return value>=1
  }
  
  return <div id="app">
  <header>
    <nav>
      {user ? (
      <>
      <h1>The Game Researcher</h1>
      <Link to='/'>Home</Link>
      <Link to='/wishlist'>Wishlist</Link>
      <form className="searchform" onSubmit={() => {navigate(`/search`), setSearchObject(inputValue), localStorage.setItem("searchObject", inputValue), setInputValue(""), setGameObject(null), setSearchList(null)}}>
      <input placeholder="Search for a game" value={inputValue} onChange={(event) => (setInputValue(event.target.value))}></input>
      <input className="searchbutton" type="submit" value="submit"/>
      </form>
      <button onClick={logout}>Log out</button>
      </>
      ) : (
      <>
      <h1>The Game Researcher</h1>
      <Link to='/'>Home</Link>
      <Link to='/wishlist'>Wishlist</Link>
      <form className="searchform" onSubmit={() => {navigate(`/search`), setSearchObject(inputValue), localStorage.setItem("searchObject", inputValue), setInputValue(""), setGameObject(null), setSearchList(null)}}>
      <input placeholder="Search for a game" value={inputValue} onChange={(event) => (setInputValue(event.target.value))}></input>
      <input className="searchbutton" type="submit" value="submit"/>
      </form>
      <Link to='/register'>Register</Link>
      <Link to='/login'>Log In</Link>
      </>
      )}
    </nav>
  </header>
  <Outlet context={{
    user, setUser,
    username, setUsername,
    password, setPassword,
    inputValue, setInputValue,
    gameObject, setGameObject,
    searchObject, setSearchObject,
    guid, setGuid,
    searchList, setSearchList,
    reviewsObject, setReviewsObject,
    gameid, setGameId,
    api,
    addtowishlist, removefromwishlist,
    wishlist, setWishlist,
    getWishlist,
    inWishlist,
    decideguy, setdecideguy
  }}/>
  </div>
}
