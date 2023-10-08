import { createBrowserRouter} from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import RegisterView from "../pages/registerView/RegisterView";
import Recipe from "../pages/recipe/Recipe";
import CreateRecipe from "../pages/createRecipe/CreateRecipe";
import EditRecipe from "../pages/editRecipe/EditRecipe";
import EditProfile from "../pages/editProfile/EditProfile";
import Profile from "../pages/profile/Profile";
import { PrivateRoutes } from "../utils/PrivateRoutes";
import Result from "../pages/result/Result";


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
    },

    {
        path: '/search',
        element: <Result />
    }

]);

export default router;
