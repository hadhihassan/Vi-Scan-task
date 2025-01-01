import express from 'express';
import { loginSchema, registerSchema } from '../dtos/auth.dto.js';
import { validateHandler } from '../middleware/validation.middleware.js';
import { checkAuth, login, logout, signup } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
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
    validateHandler,
    protectRoute,
    (req, res, next) => {
        logout(req, res, next);
    }
);
router.get(
    "/check",
    protectRoute,
    (req, res, next) => {
        checkAuth(req, res, next);
    }
);

export default router;