import {Outlet} from "react-router-dom";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";


const Layout = () => {
    return (
        <div className={"w-screen min-h-screen overflow-x-hidden"}>
            <Header/>
            <main className={"mt-18 w-full"}>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}
export default Layout
