import api from "./api";


export const login = async (email:string, password:string) => {
    const response = await api.post(
        "/auth/login",
        {
            email,
            password
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }

        )
    return response.data;
}

export const register = async (name:string, email:string, password:string) =>{

    const response = await api.post(
        "/auth/register",
        {
            name,
            email,
            password
        }
        ,
        {
            headers: {
                "Content-Type": "application/json"
            }
        });
    return response.data;

}


export const getMyDetails = async () => {
    const response = await api.get("/auth/me")
    return response.data;
}


export const refreshTokens = async (refreshToken:string) => {
    const response = await api.post("/auth/refresh",{refreshToken})
    return response.data;
}

export const getLatestBlogs = async () => {
    const response = await api.get("/post/latest")
    return response.data;
}

export const getAllBlogs = async () => {
   const result = await api.get("/post/")
    console.log(result.data)
    return result.data;
}

export const getMyBlogs = async () => {
    const result = await api.get("/post/me")
    return result.data;
}


