import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import RegisterView from "../pages/registerView/RegisterView";
// import RecipesView from "../pages/recipesView/RecipesView";
import Recipe from "../pages/recipe/Recipe";
import CreateRecipe from "../pages/createRecipe/CreateRecipe";
import EditRecipe from "../pages/editRecipe/EditRecipe";
// import Perfil from "../pages/perfil/Perfil";
import EditProfile from "../pages/editProfile/EditProfile";
import Profile from "../pages/profile/Profile";
import { PrivateRoutes } from "../utils/PrivateRoutes";
import User from '../components/User/User.jsx';
// import Perfil from "../pages/perfil/Perfil";
// import Dropdown from "../components/dropdown/Dropdown";

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

    // {
    //     path: "/recipes",
    //     element: <RecipesView />,
    // },

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
        element: <User />
    },

    {
        path: '/profile',
        element: <Profile />
    },

    {
        path: '/edit-profile',
        element: <EditProfile />
    }

    // {
    //     path: '/dropdown',
    //     element: <Dropdown />
    // },
]);

export default router;
