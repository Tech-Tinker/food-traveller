import { createBrowserRouter } from "react-router-dom";
import RegisterForm from '../pages/register/registerView';


const routes = [
    {
        path: "/",
        element: <Home />,
    },

    {
        path: "/register",
        element: <RegisterForm />,
    },
]

const router = createBrowserRouter(routes);

export default router;