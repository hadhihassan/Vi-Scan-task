import express from 'express';
import { blogSchema } from '../dtos/blog.dto.js';
import { validateHandler } from '../middleware/validation.middleware.js';
import { createNewBlog, getAllBlogs, getMyBlogs, editBlog, deleteBlog, updatePoster,getBlog } from '../controllers/blog.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

//  Blog create
router.post(
    "/",
    blogSchema,
    validateHandler,
    protectRoute,
    (req, res, next) => {
        createNewBlog(req, res, next)
    }
);
// update blog 
router.put(
    "/:id",
    (req, res, next) => {
        editBlog(req, res, next)
    }
);
//  Update Blog poster
router.patch(
    "/:id",
    (req, res, next) => {
        updatePoster(req, res, next)
    }
);
//  Delete blogs
router.delete(
    "/:id",
    (req, res, next) => {
        deleteBlog(req, res, next)
    }
);
router.get(
    "/my-blogs",
    protectRoute,
    (req, res, next) => {
        getMyBlogs(req, res, next);
    }
);
router.get(
    "/",
    protectRoute,
    (req, res, next) => {
        getAllBlogs(req, res, next);
    }
);
router.get(
    "/:id",
    (req, res, next) => {
        getBlog(req, res, next);
    }
);


export default router;