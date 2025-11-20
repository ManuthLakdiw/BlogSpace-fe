import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {lazy, Suspense} from "react";
import NotFound from "../pages/NotFound.tsx";
import Loading from "../components/Loading.tsx";

const Login = lazy(() => import("../pages/Login.tsx"));
const Register = lazy(() => import("../pages/Register.tsx"))
const Home = lazy(() => import("../pages/Home.tsx"))
const Blogs = lazy(() => import("../pages/Blogs.tsx"))
const MyBlogs = lazy(() => import("../pages/MyBlogs.tsx"))
const Layout = lazy(() => import("../components/Layout.tsx"))


const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>
    },
    {
      path: "/register",
      element: <Register/>
    },
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/blogs",
                element: <Blogs/>
            },
            {
                path: "/myblogs",
                element: <MyBlogs/>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }
])

export default function Router() {
    return (
        <Suspense fallback={<Loading/>}>
            <RouterProvider router={router}/>
        </Suspense>
    )

}