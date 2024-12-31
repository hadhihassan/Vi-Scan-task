import cloudinary from "../lib/cloudinary.js";
import { prisma } from "../lib/db.js";
import { asyncErrorHandler } from "../utils/asynHandler.js";


export const createNewBlog = asyncErrorHandler(async (req, res) => {

    const { title, content, poster } = req.body;
    const userId = req.user

    if (!poster) {
        return res.status(400).json({
            message: "Poster pic is required."
        });
    }


    const uploadResponse = await cloudinary.uploader.upload(poster);
    const blog = await prisma.blog.create({
        data: {
            title,
            content,
            poster: uploadResponse.secure_url,
            authorId: userId.id,
        }
    })

    if (!blog) {
        return res.status(500).json({
            success: false,
            message: "Failed to create blog post.",
        })
    }

    return res.status(201).json({
        success: true,
        message: "Blog post created successfully!",
        blog
    })
})

export const getAllBlogs = asyncErrorHandler(async (req, res) => {

    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [blogs, totalBlogs] = await Promise.all([
        prisma.blog.findMany({
            skip: parseInt(skip, 10),
            take: parseInt(limit, 10),
        }),
        prisma.blog.count(),
    ]);

    if (!blogs) {
        return res.status(500).json({
            success: false,
            message: "Failed to get all blog posts.",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Blogs fetched successfully!",
        blogs,
        totalBlogs,
        totalPages: Math.ceil(totalBlogs / limit),
        currentPage: parseInt(page, 10),
    });
});

export const getMyBlogs = asyncErrorHandler(async (req, res) => {

    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const userId = req.user.id

    const [blogs, totalBlogs] = await Promise.all([
        prisma.blog.findMany({
            skip: parseInt(skip, 10),
            take: parseInt(limit, 10),
        }),
        prisma.blog.count({ where: { authorId: userId } }),
    ]);

    if (!blogs) {
        return res.status(500).json({
            success: false,
            message: "Failed to get all blog posts.",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Blogs fetched successfully!",
        blogs,
        totalBlogs,
        totalPages: Math.ceil(totalBlogs / limit),
        currentPage: parseInt(page, 10),
    });
})
export const getBlog = asyncErrorHandler(async (req, res) => {

    const id = req.params.id
   
    const blog = await prisma.blog.findUnique({
        where: {
            id: +id
        }
    })
    if (!blog) {
        return res.status(500).json({
            success: false,
            message: "Failed to get the blog posts.",
        });
    }

    return res.status(200).json({
        success: true,
        blog,
    });
})

export const updatePoster = async (req, res) => {
    try {
        const { id } = req.params;
        const { profilePic, blogId } = req.body;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await prisma.blog.update({
            where: { id },
            data: { profilePic: uploadResponse.secure_url },
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const editBlog = asyncErrorHandler(async (req, res) => {

    const id = Number(req.params.id);
    let { title, content, poster } = req.body.data

    if (poster) {
        poster = (await cloudinary.uploader.upload(poster)).secure_url;
    }

    const exisintData = await prisma.blog.findFirst({
        where: { id },
    })

    if (!exisintData) {
        return res.status(404).json({
            success: false,
            message: "Not found the blog posts.",
        });
    }

    const blog = await prisma.blog.update({
        where: { id },
        data: {
            title,
            content,
            poster: poster || exisintData.poster
        }
    })

    return res.status(200).json({
        success: true,
        message: "Blogs delete successfully!",
        blog
    });
});

export const deleteBlog = asyncErrorHandler(async (req, res) => {

    const { id: blogId } = req.params;

    const blog = await prisma.blog.delete({
        where: {
            id: +blogId
        }
    })

    if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Not found the blog posts.",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Blogs delete successfully!",
    });
})