import {motion} from "framer-motion";
import {Plus} from "lucide-react";
import BlogForm from "../components/BlogForm.tsx";
import {useEffect, useState} from "react";
import {getMyBlogs} from "../services/auth.ts";
import BlogCard from "../components/BlogCard.tsx";

const MyBlogs = () => {

    const [showForm, setShowForm] = useState<boolean>(false)


    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        getMyBlogs()
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
            <div className={"w-full  bg-gradient-to-br from-zinc-100 via-zinc-100 to-zinc-200 pt-20 pb-15 px-15"}>
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
                    }}
                    className={"w-full h-full flex items-center justify-between"} >
                    <div>
                        <h2 className={"text-zinc-950 text-5xl font-bold"}>
                            My Blogs
                        </h2>

                        <h3 className={"text-zinc-500 text-xl font-light tracking-wide mt-4"}>
                            Manage and create your blog posts
                        </h3>
                    </div>
                    <div
                        onClick={() => setShowForm(true)}
                        className={"text-sm text-zinc-100 py-3 px-6  rounded-md bg-zinc-950 cursor-pointer flex items-center justify-center gap-2 hover:bg-zinc-900 transition duration-300"} >
                        <Plus size={18} />
                        <p>Create Your Blog</p>
                    </div>
                </motion.div>
            </div>
            <BlogForm setShowForm={setShowForm} showForm={showForm} />
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
export default MyBlogs
