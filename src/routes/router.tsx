import { createBrowserRouter } from "react-router-dom"

/* Pages */
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Verify from "@/pages/Verify"
import Perfil from "@/pages/Perfil"

/* Layouts */
import LayoutPage from "@/layouts/LayoutPage"

const routes = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "/perfil", element: <Perfil /> }
        ]
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register />},
    { path: "/verify/:id", element: <Verify />}
])

export default routes
