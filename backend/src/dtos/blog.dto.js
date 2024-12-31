import { body } from "express-validator";

export const blogSchema = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    body('content')
        .trim()
        .notEmpty().withMessage('Content is required')
        .isLength({ min: 3 }).withMessage('Content must be at least 10 characters long')
        .isLength({ max: 800 }).withMessage('Content must be at least 2000 characters long'),

];
