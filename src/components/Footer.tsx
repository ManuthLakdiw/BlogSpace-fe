import Logo from "./Logo.tsx";
import {Github, Linkedin, Twitter} from "lucide-react";

const Footer = () => {
    return (
        <div className={"w-screen text-zinc-950"}>
            <div className={"w-full flex pt-12 pb-9 pl-30 gap-[150px] border-t-1 border-zinc-200"}>
                <div className={"flex flex-col gap-4"}>
                    <Logo/>
                    <p className={"text-zinc-500 text-sm font-light"} >Share your stories and connect with readers<br/>from around the world.</p>
                </div>
                <div className={"flex flex-col gap-4"}>
                    <h3 className={"font-medium"} >Quick Links</h3>
                    <ul className={"text-zinc-500 text-sm font-light flex flex-col gap-3"}>
                        <li className={"hover:text-zinc-950 cursor-pointer transition transition-all duration-300"} >Home</li>
                        <li className={"hover:text-zinc-950 cursor-pointer transition transition-all duration-300 "} >Blogs</li>
                        <li className={"hover:text-zinc-950 cursor-pointer transition transition-all duration-300 "} >My Blogs</li>
                    </ul>
                </div>
                <div className={"flex flex-col gap-4"}>
                    <h3 className={"font-medium"} >Resources</h3>
                    <ul className={"text-zinc-500 text-sm font-light flex flex-col gap-3 "} >
                        <li className={"hover:text-zinc-950 cursor-pointer transition transition-all duration-300 "} >About Us</li>
                        <li className={"hover:text-zinc-950 cursor-pointer transition transition-all duration-300"} >Contact</li>
                        <li className={"hover:text-zinc-950 cursor-pointer transition transition-all duration-300"} >Privacy Policy</li>
                    </ul>
                </div>
                <div className={"flex flex-col gap-4"}>
                    <h3 className={"font-medium"} >Follow Us</h3>
                    <div className={"flex gap-4"}>
                        <Twitter className={"text-zinc-500 hover:text-zinc-950 cursor-pointer transition transition-all duration-300 "} size={22} />
                        <Github className={"text-zinc-500 hover:text-zinc-950 cursor-pointer transition transition-all duration-300 "} size={22} />
                        <Linkedin className={"text-zinc-500 hover:text-zinc-950 cursor-pointer transition transition-all duration-300 "} size={22} />

                    </div>

                </div>
            </div>
            <div className={"w-full"} >
                <h4 className={"w-10/12 border-t-1 border-zinc-200 m-auto p-8 text-center text-zinc-500 text-sm font-light"} >© 2025 BlogSpace. All rights reserved.</h4>
            </div>
        </div>
    )
}
export default Footer
