const NotFound = () => {
    return (
        <div className={"w-screen h-screen bg-zinc-950 overflow-hidden"}>
            <div className={"text-zinc-100 flex items-center justify-center h-full gap-6"}>
                <h1 className={"font-medium border-r-1 border-zinc-500 text-2xl px-6 py-2"}>404</h1>
                <h3 className={"font-light text-sm"}>This page could not be found.</h3>
            </div>

        </div>
    )
}
export default NotFound
