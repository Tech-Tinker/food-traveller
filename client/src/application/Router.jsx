import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import RegisterView from "../pages/registerView/RegisterView";
import RecipeView from "../pages/recipeView/RecipeView";
import CreateRecipe from "../pages/createRecipe/CreateRecipe";
import EditRecipe from "../pages/editRecipe/EditRecipe";

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
        element: <RecipeView />,
    },

    {
        path: "/edit-recipe/:id",
        element: <EditRecipe />,
    }
]);

export default router;
