import {AnimatePresence, motion} from "framer-motion"
import clsx from "clsx";

export type FormNotifyType = "error" | "success";

interface FormErrorProps {
    message: string
    type: FormNotifyType
}

const FormNotify = ({message , type}:FormErrorProps) => {
    return (
        <AnimatePresence>
            {message && <motion.div
                            className={clsx(
                                "w-full text-center py-2 px-4 rounded-md",
                                {
                                    "bg-red-200 text-red-900": type === "error",
                                    "bg-green-200 text-green-900": type === "success",
                                }
                            )}
                            initial = {{
                                opacity: 0,
                                x: 50,
                            }}
                            animate = {{
                                opacity: 1,
                                x: 0,
                            }}
                            exit={{
                                opacity: 0,
                                x: 50

                            }}

                        >
                {message}
            </motion.div>
            }

        </AnimatePresence>

    )
}
export default FormNotify
