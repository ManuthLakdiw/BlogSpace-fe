import { motion } from "framer-motion"
import {useEffect, useState} from "react";
import {getAllBlogs} from "../services/auth.ts";
import BlogCard from "../components/BlogCard.tsx";

const Blogs = () => {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        getAllBlogs()
            .then((result) => {
                setBlogs(result.data.posts);
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
        <section className={"w-full min-h-screen bg-zinc-100"}>
            <div className={"w-full bg-gradient-to-br from-zinc-100 via-zinc-100 to-zinc-200 pt-20 pb-15"}>
                <div className={"flex flex-col items-center gap-3"} >
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
                        }}
                        className={"text-zinc-950 text-5xl font-bold"}
                    >
                        Explore Our Blogs
                    </motion.h2>

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
                            delay: 0.2
                        }}
                        className={"text-zinc-500 text-xl text-center font-light tracking-wide mt-4"}
                    >
                        Discover insights, tutorials, and stories from our community of writers
                    </motion.h3>
                </div>
            </div>
            <div className={"flex justify-center flex-wrap gap-10 py-10 mt-5 border-t-1 border-zinc-300"}>
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
        </section>
    )
}
export default Blogs
