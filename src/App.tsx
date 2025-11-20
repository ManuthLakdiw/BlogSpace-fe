import Router from "./routes";
import {AuthProvider} from "./context/AuthContext.tsx";

function App() {
  return (
    <div className={"w-screen min-h-screen overflow-x-hidden bg-zinc-100 relative"} >
        <AuthProvider>
            <Router/>
        </AuthProvider>
    </div>

  )
}

export default App
