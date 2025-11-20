import {AnimatePresence, motion, useScroll, useTransform} from "framer-motion";
import Logo from "./Logo.tsx";
import {Link, useLocation} from "react-router-dom";
import {useState} from "react";
import clsx from "clsx";
import {useAuth} from "../context/AuthContext.tsx";
import Auth from "./Auth.tsx";

const Header = () => {


    const {scrollYProgress} = useScroll();

    const progressX = useTransform(
        scrollYProgress,
        [0, 1],
        ["0vw", "100vw"]
    );

    const [isVisible, setIsVisible] = useState(true);
    const location = useLocation();
    const {pathname} = location;
    const {user} = useAuth();

    const links = [
        {
            path: "/",
            name: "Home"
        },
        {
            path: "/blogs",
            name: "Blogs"
        },
        {
            path: "/myblogs",
            name: "My Blogs"
        }
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{
                        y: -100
                    }}
                    animate={{
                        y: 0
                    }}
                    transition={{
                        duration: 0.8,
                        damping: 0,
                    }}
                    exit={{
                        y: -100
                    }}
                    key="header"
                    className="w-full h-18 border-b-1 border-zinc-300 bg-zinc-100/80 backdrop-blur-md flex items-center justify-between px-30 fixed top-0 z-50">
                    <motion.div
                        style={{
                            width: progressX
                        }}
                        className={"h-1 bg-zinc-500 absolute top-0 left-0"}></motion.div>
                    <Logo isAnimated={true}/>

                    <div className="flex gap-10">
                        {links.map(({path, name}, index) => (
                            <Link
                                key={index}
                                to={path}
                                className={clsx(
                                    "relative cursor-pointer hover:text-zinc-950 text-zinc-500 text-[0.9rem] transition-colors duration-300 pb-1",
                                    {
                                        "text-zinc-950": pathname === path,
                                    }
                                )}
                            >
                                {name}
                                {pathname === path && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-950"
                                        initial={false}
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 30
                                        }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    <div>
                        {!user ? (
                            <div>
                                <Link
                                    onClick={() => setIsVisible(false)}
                                    to="/login"
                                    className="text-zinc-950 py-3 px-4 cursor-pointer rounded-md text-sm"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    onClick={() => setIsVisible(false)}
                                    to="/register"
                                    className="bg-zinc-950 text-white py-3 px-4 rounded-md cursor-pointer transition transition-all duration-300 hover:bg-zinc-800 text-sm"
                                >
                                    Sign Up
                                </Link>
                            </div>

                        ) :  <Auth/>


                        }



                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Header;