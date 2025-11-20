import {useEffect, useState} from "react";
import {Upload, X} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {createBlog} from "../services/blog.ts";

interface BlogFormProps {
    showForm: boolean;
    setShowForm: (showForm: boolean) => void;
}

const BlogForm = ({showForm, setShowForm}: BlogFormProps) => {

    useEffect(() => {
        if (showForm) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }
        return () => {
            document.body.style.overflowY = "auto";
        };
    }, [showForm]);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        content: "",
        tags: [] as string[],
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [tagInput, setTagInput] = useState("");
    const [loading, setLoading] = useState(false);

    console.log(loading);
    const {title, author, content, tags} = formData;

    // Text inputs handle කරනවා
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Image file select කරද්දි
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            if (file.type.startsWith('image/')) {
                // File එක state එකේ store කරනවා (backend එකට යවන්න)
                setImageFile(file);

                // Preview එකක් generate කරනවා
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please select an image file');
            }
        }
    };

    // Image remove කරද්දි
    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    // Tag add කරද්දි
    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()],
            }));
            setTagInput("");
        }
    };

    // Tag remove කරද්දි
    const handleRemoveTag = (tagToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !content) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('tags', tags.join(','));

            if (imageFile) {
                formData.append('image', imageFile);
            }

            const response = await createBlog(formData);
            console.log('Blog created successfully:', response.data);

            alert('Blog created successfully!');

            // Reset form
            setFormData({title: '', author: '', content: '', tags: []});
            setImageFile(null);
            setImagePreview(null);

        } catch (error: any) {
            alert(error.response?.data?.message || 'Failed to create blog');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence mode="wait">
            {showForm && (
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.8}}
                    transition={{ease: "easeInOut", duration: 0.3}}
                    key="blog-form"
                    onClick={() => setShowForm(false)}
                    className="w-screen h-screen bg-zinc-950/50 fixed top-0 left-0 flex justify-center items-center z-50"
                >
                    <motion.form
                        onClick={(e) => e.stopPropagation()}
                        onSubmit={handleSubmit}
                        initial={{y: 20}}
                        animate={{y: 0}}
                        transition={{duration: 0.2, delay: 0.1}}
                        className="w-1/3 bg-white rounded-xl p-6 max-h-[90vh] overflow-y-auto"
                    >
                        <h1 className="font-medium text-xl mb-5">Create New Blog</h1>

                        {/* Title */}
                        <div className="mb-3">
                            <p className="text-sm mb-1">Title*</p>
                            <input
                                name="title"
                                value={title}
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter your blog title"
                                className="w-full p-2 text-sm border border-zinc-200 rounded-md focus:outline-zinc-400/50"
                            />
                        </div>

                        {/* Author */}
                        <div className="mb-3">
                            <p className="text-sm mb-1">Writer/Author*</p>
                            <input
                                name="author"
                                value={author}
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter your name"
                                className="w-full p-2 text-sm border border-zinc-200 rounded-md focus:outline-zinc-400/50"
                            />
                        </div>

                        {/* Featured Image */}
                        <div className="mb-3">
                            <p className="text-sm mb-1">Featured Image</p>

                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="w-full h-[200px] bg-zinc-100 mb-2 rounded-md relative overflow-hidden">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <div
                                        onClick={handleRemoveImage}
                                        className="w-[40px] h-[35px] bg-red-600 rounded-md absolute right-2 top-2 flex items-center justify-center cursor-pointer hover:bg-red-700 transition duration-300"
                                    >
                                        <X className="text-white" size={20} />
                                    </div>
                                </div>
                            )}

                            {/* File Input (Visible, styled as button) */}
                            <label className="w-full p-2 text-sm border border-zinc-200 rounded-md font-medium flex items-center justify-center gap-3 hover:bg-zinc-100 transition duration-300 cursor-pointer">
                                <Upload size={16} />
                                <span>{imagePreview ? 'Change Image' : 'Upload Image'}</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* Tags */}
                        <div className="mb-3">
                            <p className="text-sm mb-1">Tags</p>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                    placeholder="Add a tag"
                                    className="w-full p-2 text-sm border border-zinc-200 rounded-md focus:outline-zinc-400/50"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTag}
                                    className="py-2 px-4 border border-zinc-200 rounded-md text-sm hover:bg-zinc-100 transition duration-300"
                                >
                                    Add
                                </button>
                            </div>
                            {/* Display tags */}
                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag, index) => (
                                        <div
                                            key={index}
                                            className="bg-zinc-200 px-3 py-1 rounded-full text-xs flex items-center gap-2"
                                        >
                                            <span>{tag}</span>
                                            <X
                                                size={14}
                                                className="cursor-pointer hover:text-red-600"
                                                onClick={() => handleRemoveTag(tag)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Blog Content */}
                        <div className="mb-3">
                            <p className="text-sm mb-1">Blog Content*</p>
                            <textarea
                                name="content"
                                value={content}
                                onChange={handleChange}
                                cols={30}
                                rows={5}
                                placeholder="Enter your blog content"
                                className="w-full p-2 text-sm border border-zinc-200 rounded-md focus:outline-zinc-400/50 resize-none"
                            ></textarea>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowForm(false);
                                }}
                                type="button"
                                className="flex-1 py-2 border border-zinc-200 rounded-md text-sm hover:bg-zinc-100 transition duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-2 bg-zinc-950 text-white rounded-md text-sm hover:bg-zinc-800 transition duration-300"
                            >
                                Create Blog
                            </button>
                        </div>
                    </motion.form>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BlogForm;