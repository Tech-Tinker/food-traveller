

import { createBrowserRouter } from "react-router-dom";
import RegisterView from "../pages/registerView/RegisterView";



const routes = [
    /*{
        path: "/",
        element: <Home />,
    },*/

    {
        path: "/register",
        element: <RegisterView />,
    },

]

const router = createBrowserRouter(routes);

export default router;