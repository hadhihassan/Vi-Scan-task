import express from 'express';
import { profileSchema } from '../dtos/auth.dto.js';
import { validateHandler } from '../middleware/validation.middleware.js';
import { updateProfile } from '../controllers/profile.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.patch(
    "/",
    protectRoute,
    profileSchema,
    validateHandler,
    (req, res, next) => {
        updateProfile(req, res, next)
    }
);

export default router;
