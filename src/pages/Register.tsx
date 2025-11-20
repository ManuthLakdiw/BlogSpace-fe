import {useState} from "react";
import {Eye, EyeOff, Undo2} from "lucide-react";
import FormNotify from "../components/FormNotify.tsx";
import type {FormNotifyType} from "../components/FormNotify.tsx";
import {useNavigate} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import {register} from "../services/auth.ts";

const Register = () => {

    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(true);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    interface formNotify {
        type: FormNotifyType;
        message: string;
    }

    const [formNotify, setFormNotify] = useState<formNotify>({
        type: "success",
        message: "",
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const {name, email, password, confirmPassword} = form;

        if (!name || !email || !password || !confirmPassword) {
            setFormNotify((prevState) => {
                return {
                    ...prevState,
                    type: "error",
                    message: "Please fill in all fields",
                };
            })
            return;
        }

        if (password.length < 6) {
            setFormNotify((prevState) => {
                return {
                    ...prevState,
                    type: "error",
                    message: "Password must be at least 6 characters long",
                };
            })
            return;
        }

        if (password !== confirmPassword) {
            setFormNotify((prevState) => {
                return {
                    ...prevState,
                    type: "error",
                    message: "Passwords do not match",
                };
            })
            return;
        }

        try {
            const result = await register(name, email, password)

            if (result.success) {
                setFormNotify({
                    type: "success",
                    message: result.message || "Registration successful!",
                });

                setForm({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });

                setTimeout(() => navigate("/login"), 2000);

            } else {
                setFormNotify({
                    type: "error",
                    message: result.message || "Registration failed",
                });
            }

        } catch (error: any) {
            setFormNotify({
                type: "error",
                message: error.response?.data?.message || "Something went wrong",
            });
        }

    };

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                        scale: 0
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                        damping: 0
                    }}

                    key={"register"}


                    className="w-screen h-screen flex justify-center items-center bg-zinc-100 text-zinc-950"
                >
                    <Undo2
                        onClick={() => {
                            setIsVisible(false);
                            setTimeout(() => navigate("/"), 500);
                        }}
                        className="absolute top-5 left-5 cursor-pointer text-zinc-950 hover:text-zinc-500 transition transition-all duration-300"
                    />
                    <form
                        className="w-1/3    flex flex-col px-8 py-5 gap-6 bg-white rounded-lg shadow-md border-1 border-zinc-200"
                        onSubmit={handleSubmit}
                    >
                        <h1 className="self-center text-2xl font-bold">Create Account</h1>

                        <div>
                            <p className="text-sm">Name</p>
                            <input
                                name="name"
                                onChange={handleChange}
                                type="text"
                                value={form.name}
                                placeholder="John Doe"
                                className="w-full p-2 text-sm border border-zinc-200 rounded-md focus:outline-zinc-400/50"
                            />
                        </div>

                        <div>
                            <p className="text-sm">Email</p>
                            <input
                                name="email"
                                onChange={handleChange}
                                type="email"
                                value={form.email}
                                placeholder="you@example.com"
                                className="w-full p-2 text-sm border border-zinc-200 rounded-md focus:outline-zinc-400/50"
                            />
                        </div>

                        <div className="relative">
                            <p className="text-sm">Password</p>
                            <input
                                name="password"
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                value={form.password}
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

                        <div>
                            <p className="text-sm">Confirm Password</p>
                            <input
                                name="confirmPassword"
                                onChange={handleChange}
                                type="password"
                                value={form.confirmPassword}
                                placeholder="********"
                                className="w-full p-2 text-sm border border-zinc-200 rounded-md focus:outline-zinc-400/50"
                            />
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
                            Sign Up
                        </button>

                        <h4 className="self-center text-zinc-500 text-sm">
                            Already have an account?
                            <span
                                onClick={() => navigate("/login")}
                                className="text-zinc-950 hover:underline cursor-pointer transition transition-all duration-300"
                            >
                                {" "}
                                Sign In
                            </span>
                        </h4>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Register;