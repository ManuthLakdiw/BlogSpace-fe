import {AnimatePresence, motion} from "framer-motion";
import {Eye, EyeOff, Undo2} from "lucide-react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import FormNotify, {type FormNotifyType} from "../components/FormNotify.tsx";
import {getMyDetails, login} from "../services/auth.ts";
import {useAuth} from "../context/AuthContext.tsx";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();
    const { user ,setUser } = useAuth()

    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    interface formNotify {
        type: FormNotifyType;
        message: string;
    }

    const [formNotify, setFormNotify] = useState<formNotify>({
        type: "success",
        message: "",
    });


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleNavigateBack = () => {
        setIsVisible(false);
        navigate("/")
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const {email, password} = form;

        if (!email || !password) {
            return setFormNotify({
                type: "error",
                message: "Please fill in all fields",
            });
        }


        try {

            const result = await login(email, password);
            if (result.success) {
                localStorage.setItem("accessToken", result.data.accessToken);
                localStorage.setItem("refreshToken", result.data.refreshToken);
                setFormNotify({
                    type: "success",
                    message: result.message || "Login successful!",
                });

                const userData = await getMyDetails()

                setUser(userData)

                console.log(user)


                setTimeout(() => navigate("/"), 1000);
            } else {
                setFormNotify({
                    type: "error",
                    message: result.message || "Login failed",
                });
            }
        }catch (error:any) {
            setFormNotify({
                type: "error",
                message: error.response?.data?.message || "Something went wrong",
            });
        }




    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 50
                    }}
                    animate={{
                        opacity: 1,
                        y: 0

                    }}
                    exit={{
                        opacity: 0,
                        y: 0
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                        damping: 0
                    }}

                    key="login"
                    className="w-screen h-screen flex justify-center items-center bg-zinc-100 text-zinc-950"
                >
                    <Undo2
                        onClick={handleNavigateBack}
                        className="absolute top-5 left-5 cursor-pointer text-zinc-950 hover:text-zinc-500 transition transition-all duration-300"
                    />
                    <form
                        onSubmit={handleSubmit}
                        className="w-1/3 flex flex-col px-8 py-5 gap-6 bg-white rounded-lg shadow-md border-1 border-zinc-200"
                    >
                        <h1 className="self-center text-2xl font-bold">Welcome Back</h1>

                        <div>
                            <p className="text-sm">Email</p>
                            <input
                                value={form.email}
                                onChange={handleChange}
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                className="w-full p-2 text-sm border border-zinc-200 rounded-md focus:outline-zinc-400/50"
                            />
                        </div>

                        <div className="relative">
                            <p className="text-sm">Password</p>
                            <input
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                className="w-full p-2 text-sm border border-zinc-200 rounded-md focus:outline-zinc-400/50"
                                maxLength={50}
                            />

                            {showPassword ? (
                                <EyeOff
                                    className="text-zinc-500 absolute top-[30px] right-3 cursor-pointer"
                                    size={17}
                                    onClick={togglePasswordVisibility}
                                />
                            ) : (
                                <Eye
                                    className="text-zinc-500 absolute top-[30px] right-3 cursor-pointer"
                                    size={17}
                                    onClick={togglePasswordVisibility}
                                />
                            )}
                        </div>

                        {formNotify.message && (
                            <FormNotify
                                key={formNotify.message}
                                message={formNotify.message}
                                type={formNotify.type}
                            />
                        )}

                        <button
                            type="submit"
                            className="bg-zinc-950 text-white py-2 rounded-md cursor-pointer transition transition-all duration-300 hover:bg-zinc-800 text-sm"
                        >
                            Sign In
                        </button>

                        <h4 className="self-center text-zinc-500 text-sm">
                            Don't have an account?
                            <span
                                onClick={() => navigate("/register")}
                                className="text-zinc-950 hover:underline cursor-pointer transition transition-all duration-300"
                            >
                                {" "}
                                Sign Up
                            </span>
                        </h4>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Login