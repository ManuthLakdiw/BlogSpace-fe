import {Clock, User} from "lucide-react";
import {motion} from "framer-motion";


interface BlogCardProps {
    title: string;
    content: string;
    image: string;
    author: string;
    date: string;
}

const BlogCard = ({title,content,image,author,date}:BlogCardProps) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 30
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 0.5,
                delay: 0.8,
                ease: "easeOut"
            }}
            className={"group w-[420px] max-h-1/3 bg-white hover:shadow-lg transition duration-300 ease-in-out rounded-xl p-6 flex flex-col gap-4 border border-1 border-zinc-200"}>
            <div className={"w-full h-[300px] overflow-hidden"}>
                <img src={image} className="w-full h-full object-contain group-hover:scale-110 transition duration-300"/>
            </div>
            <h4 className={"text-xl text-zinc-950 font-bold"} >{title}</h4>
            <p className={"w-full max-h-[300px] overflow-x-hidden overflow-y-auto text-zinc-500 tracking-wide pb-7 border-b-1 border-zinc-300"}>{content}</p>
            <div className={"flex items-center justify-between mt-2 text-sm text-zinc-500"}>
                <div className={"flex items-center gap-2 "}>
                    <User size={17} />
                    <h6>{author}</h6>
                </div>
                <div className={"flex items-center gap-2"}>
                    <Clock size={17} />
                    <h6>{date}</h6>
                </div>
            </div>
        </motion.div>
    )
}
export default BlogCard
