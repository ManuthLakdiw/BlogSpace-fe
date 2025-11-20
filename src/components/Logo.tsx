import {BookOpen} from "lucide-react";
import {motion} from "framer-motion";

interface LogoProps {
    isAnimated?: boolean
}

export const Logo = ({isAnimated}:LogoProps) => {
    return(
        <div className={"flex items-center gap-2"}>
            <h1 className={"text-xl font-bold order-2"}>BlogSpace</h1>
            <motion.div
                className={"order-1"}
                whileHover={ isAnimated ? {rotate: 360} : {rotate: 0}}
                transition={{duration: 0.5}}

            >
                <BookOpen/>
            </motion.div>
        </div>
    )
}

export default Logo