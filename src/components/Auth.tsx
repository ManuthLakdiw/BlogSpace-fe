import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {useAuth} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

const Auth = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {setUser} = useAuth()
    const navigate = useNavigate()


    const imageUrl = "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const handleLogout = () => {
        setUser(null)
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        setTimeout(() => {
            navigate("/login")

        },1000)
    };

    return (
            <div className={"flex flex-col relative items-end"}>
                <div
                    className={"flex items-center gap-3 relative cursor-pointer transition transition-all duration-300"}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div
                        className="w-[42px] h-[42px] rounded-full border border-[1.5px] border-zinc-950/50 bg-cover bg-center shadow-xl"
                        style={{ backgroundImage: `url('${imageUrl}')` }}
                    />

                    <motion.div
                        animate={{
                            rotate: isOpen ? 180 : 0,
                        }}
                        transition={{
                            duration: 0.3,
                        }}
                    >
                        <ChevronDown className={"text-zinc-950"} size={20} />
                    </motion.div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className={"w-[150px] h-[90px] bg-white shadow-xl rounded-lg overflow-hidden absolute mt-12"}
                        >
                            <div
                                className={"w-full h-1/2 border-b-1 border-zinc-500/50 flex items-center justify-center text-zinc-950 font-light cursor-pointer hover:bg-zinc-100/10 hover:text-zinc-600 transition duration-300"}
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                            >
                                Profile
                            </div>

                            <div
                                className={"w-full h-1/2 flex items-center justify-center text-zinc-950 font-light cursor-pointer hover:bg-zinc-100/10 hover:text-red-500 transition duration-300"}
                                onClick={() => {
                                    setIsOpen(false);
                                    handleLogout();
                                }}
                            >
                                Logout
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
    );
};

export default Auth;