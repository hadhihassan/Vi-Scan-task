import express from 'express';
import { blogSchema } from '../dtos/blog.dto.js';
import { validateHandler } from '../middleware/validation.middleware.js';
import { createNewBlog, getAllBlogs, getMyBlogs } from '../controllers/blog.controller.js';
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

    }
);
//  Delete blogs
router.delete(
    "/:id",
    (req, res, next) => {

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
    "/", // This handles `/api/blog?page=1&limit=10`
    protectRoute,
    (req, res, next) => {
        getAllBlogs(req, res, next);
    }
);


export default router;