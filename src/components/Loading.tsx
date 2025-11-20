import {motion, type Variants} from 'framer-motion';

const mainVariant: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        }
    }
}

const itemVariant: Variants = {
    initial: {
        scaleY: 1,
        opacity: 1
    },
    animate: (value: number) => ({
        scaleY: [1, 2, 1, 2, 1],
        opacity: [0.2, 0.5, 0.8, 0.5, 0.2],
        transition: {
            duration: 1.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: value * 0.1,
            repeatDelay: 0.3
        }
    })
}

const Loading = () => {
    return (
        <motion.div
            variants={mainVariant}
            initial="initial"
            animate="animate"
            className="bg-transparent w-full h-screen flex justify-center items-center gap-1 pb-20 absolute top-0 left-0 z-100"
        >
            <motion.div
                variants={itemVariant}
                custom={0}
                className="w-[5px] h-[20px] bg-zinc-950 rounded-full shadow-sm"
            ></motion.div>

            <motion.div
                variants={itemVariant}
                custom={1} className="w-[5px] h-[20px] bg-zinc-950 rounded-full shadow-sm"
            ></motion.div>

            <motion.div
                variants={itemVariant}
                custom={2} className="w-[5px] h-[20px] bg-zinc-950 rounded-full shadow-sm"
            ></motion.div>

            <motion.div
                variants={itemVariant}
                custom={3} className="w-[5px] h-[20px] bg-zinc-950 rounded-full shadow-sm"
            ></motion.div>

            <motion.div
                variants={itemVariant}
                custom={4} className="w-[5px] h-[20px] bg-zinc-950 rounded-full shadow-sm"
            ></motion.div>
        </motion.div>
    )
}

export default Loading