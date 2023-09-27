import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import RegisterView from "../pages/registerView/RegisterView";
import RecipesView from "../pages/recipesView/RecipesView";
import Recipe from "../pages/recipe/Recipe";
import CreateRecipe from "../pages/createRecipe/CreateRecipe";
import EditRecipe from "../pages/editRecipe/EditRecipe";
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
        element: <CreateRecipe />,
    },

    {
        path: "/recipes",
        element: <RecipesView />,
    },

    {
        path: "/recipe/:id",
        element: <Recipe />,
    },

    {
        path: "/edit-recipe/:id",
        element: <EditRecipe />,
    },

    // {
    //     path: '/perfil',
    //     element: <Perfil />
    // },

    // {
    //     path: '/dropdown',
    //     element: <Dropdown />
    // },
]);

export default router;
