import api from "./api.ts";

export const createBlog = async (formData: FormData) => {
    const result = await api.post("/post/create", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    console.log(result.data)
    return result.data;
};