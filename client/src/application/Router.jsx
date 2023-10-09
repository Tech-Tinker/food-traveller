import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Recipe from "../pages/recipe/Recipe";
import CreateRecipe from "../pages/createRecipe/CreateRecipe";
import EditRecipe from "../pages/editRecipe/EditRecipe";
import EditProfile from "../pages/editProfile/EditProfile";
import Profile from "../pages/profile/Profile";
import { PrivateRoutes } from "../utils/PrivateRoutes";

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
        element: <Register />,
    },

    {
        path: "/create-recipe",
        element: <PrivateRoutes><CreateRecipe /></PrivateRoutes>,
    },

    {
        path: "/recipe/:id",
        element: <PrivateRoutes><Recipe /></PrivateRoutes>,
    },

    {
        path: "/edit-recipe/:id",
        element: <PrivateRoutes><EditRecipe /></PrivateRoutes>,
    },

    {
        path: '/profile',
        element: <PrivateRoutes><Profile /></PrivateRoutes>
    },

    {
        path: '/edit-profile',
        element: <PrivateRoutes><EditProfile /></PrivateRoutes>
    }

]);

export default router;
