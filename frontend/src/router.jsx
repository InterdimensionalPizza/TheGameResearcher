import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import WishlistPage from "./pages/WishlistPage";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <RegisterPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "home",
                element: <HomePage />
            },
            {
                path: "wishlist",
                element: <WishlistPage />
            },
            {
                path: "game",
                element: <GamePage />
            }
        ]
    }
]);

export default router