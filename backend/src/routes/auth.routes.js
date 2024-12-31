import express from 'express';
import { loginSchema, registerSchema } from '../dtos/auth.dto.js';
import { validateHandler } from '../middleware/validation.middleware.js';
import { login, logout, signup } from '../controllers/auth.controller.js';
const router = express.Router();


router.post(
    "/login",
    loginSchema,
    validateHandler,
    (req, res, next) => {
        login(req, res, next);
    }
);

router.post(
    "/signup",
    registerSchema,
    validateHandler,
    (req, res, next) => {
        signup(req, res, next);
    }
);

router.get(
    "/logout",
    (req, res, next) => {
        logout(req, res, next);
    }
);

export default router;