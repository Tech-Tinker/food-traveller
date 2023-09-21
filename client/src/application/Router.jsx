import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import RegisterView from "../pages/registerView/RegisterView";
import RecipeView from "../pages/recipeView/RecipeView";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },

    {
        path: '/login',
        element: <Login />
    },

    {
        path: "/register",
        element: <RegisterView />,
    },

    {
        path: "/recipe",
        element: <RecipeView />,
    },



]);

export default router;
