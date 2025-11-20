import {Link} from "react-router-dom";
import {ArrowRight} from "lucide-react";
import {motion, useMotionValueEvent, useScroll, useTransform} from "framer-motion";
import {getLatestBlogs} from "../services/auth.ts";
import {useEffect, useState} from "react";
import BlogCard from "../components/BlogCard.tsx";


const Home = () => {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    const {scrollYProgress} = useScroll();
    const buttonX = useTransform(
        scrollYProgress,
        [0, 0.15],
        [0, window.innerWidth/1.9]
    );

    const buttonTwo = useTransform(
        scrollYProgress,
        [0, 0.10 , 0.11],
        [0, 0 , -85]
    )

    const buttonY = useTransform(
        scrollYProgress,
        [0, 0.15 , 1],
        [0, 100 , 1.69 * window.innerHeight]
    );

    const buttonRotate = useTransform(
        scrollYProgress,
        [0, 0.15],
        [0, 90]
    );

    const sectionX = useTransform(
        scrollYProgress,
        [0, 1],
        [-1000, 0]
    );

    useMotionValueEvent(scrollYProgress, "change", (latest) =>{
        console.log(latest)
    })


    const title = "share Your Stories";
    const letters = title.split("");

    console.log(blogs)

    useEffect(() => {
        setLoading(true);
        setError(null);

        getLatestBlogs()
            .then((result) => {
                setBlogs(result.data);
            })
            .catch((e) => {
                setError(e.response?.data?.message || "Error loading blogs");
                console.error(e , error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    return (
        <div className={"w-full min-h-screen bg-zinc-100"}>
            <section className={"w-full h-1/2 bg-gradient-to-br from-white to-zinc-200 flex flex-col items-center py-18"} >
                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 50
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.8,
                        damping: 0,
                    }}
                    className={"text-7xl mb-10 font-extrabold bg-gradient-to-r from-zinc-950 via-zinc-950 to-zinc-400 bg-clip-text text-transparent tracking-tight"}
                >
                    {letters.map((letter, i) => (
                        <motion.span
                            key={i}
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.3,
                                delay: i * 0.05,
                            }}
                            whileHover={{
                                fontSize: "100px",

                            }}
                            className={"cursor-default"}
                        >
                            {letter === " " ? "\u00A0" : letter}
                        </motion.span>
                    ))}
                </motion.h1>
                <motion.h2
                    initial={{
                        opacity: 0,
                        y: 50
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.8,
                        damping: 0,
                        delay: 0.2
                    }}

                    className={"text-zinc-500 text-2xl text-center font-light tracking-wide"}
                >
                    A modern platform for writers and readers to connect through <br/>powerful storytelling.
                </motion.h2>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 50
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.8,
                        damping: 0,
                        delay: 0.4
                    }}

                    className={"flex gap-5 mt-7"}
                >
                    <motion.div
                        style={{
                            x: buttonX,
                            y: buttonY,
                            rotate: buttonRotate
                        }}
                        className={"flex items-center gap-2 bg-zinc-950 border border-1 border-zinc-300 px-3 py-[10px] rounded-xl text-zinc-100 text-sm cusor-pointer hover:bg-zinc-800 transition transition-all duration-300"}>
                        <Link to={"/blogs"}>Explore BLogs</Link>
                        <ArrowRight size={18} />
                    </motion.div>
                    <motion.div
                        style={{
                            x: buttonTwo,

                        }}
                        className={"bg-white border border border-zinc-300  px-10 py-[10px] rounded-xl text-zinc-950 text-sm cusor-pointer"}>
                        <Link
                            to={"/myblogs"}
                        >
                            My Blogs
                        </Link>
                    </motion.div>

                </motion.div>
            </section>
            <section className={"w-full min-h-1/2 mt-20 flex flex-col items-center"}>
                <motion.h2
                    initial={{
                        opacity: 0,
                        y: 50
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.8,
                        damping: 0,
                        delay: 0.4
                    }}
                    className={"text-zinc-950 text-4xl font-bold"}>Featured Stories</motion.h2>
                <motion.h3
                    initial={{
                        opacity: 0,
                        y: 50
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.8,
                        damping: 0,
                        delay: 0.6
                    }}
                    className={"text-zinc-500 text-[17px] text-center font-light tracking-wide mt-4"}>Discover the most popular articles from our community</motion.h3>
                <div className={"w-full h-full flex flex-wrap justify-center items-center gap-10 mt-10"} >
                    {loading ? (
                        <p className="text-zinc-500">Loading blogs...</p>
                    ) : blogs.length > 0 ? (
                        blogs.map((blog: any, index: number) => (
                            <BlogCard
                                key={blog._id || index}
                                title={blog.title}
                                content={blog.content}
                                image={blog.imageURL || "https://via.placeholder.com/400x300"}
                                author={blog.author?.name || "Anonymous"}
                                date={blog.formattedCreatedAt || blog.createdAt}
                            />
                        ))
                    ) : (
                        <p className="text-zinc-500">No blogs found</p>
                    )}

                </div>
                <div className={"flex items-center gap-2  mt-15 bg-white border border-1 border-zinc-200  px-3 py-[10px] rounded-xl  text-sm cursor-pointer  transition transition-all duration-300"}>
                    <Link to={"/blogs"}>View All BLogs</Link>
                    <ArrowRight size={18} />
                </div>
            </section>

            <section className={"w-full min-h-1/2 mt-35 bg-zinc-200 py-15 px-70"}>
                <motion.div
                    style={{
                        x: sectionX
                    }}
                    className={"w-full h-full flex flex-col items-center justify-center bg-zinc-300 py-20 rounded-xl"}>
                    <h2 className={"text-zinc-950 text-4xl font-bold"} >Ready to Start Your Journey?</h2>
                    <h6 className={"text-zinc-500 text-[19px] text-center font-light tracking-wide mt-4"}>Join thousands of writers sharing their stories and connecting with readers worldwide.</h6>
                    <button className={"text-sm text-zinc-100 py-3 px-6  rounded-md bg-zinc-950 mt-15 cursor-pointer"} >Create Your First Blog</button>
                </motion.div>
            </section>

        </div>
    )
}
export default Home
