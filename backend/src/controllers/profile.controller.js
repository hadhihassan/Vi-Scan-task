import cloudinary from "../lib/cloudinary.js";
import { prisma } from "../lib/db.js";

export const updateProfilePic = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user.id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { profilePic: uploadResponse.secure_url },
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        let { name, email, profilePic } = req.body;
        const userId = req.user.id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        } else {
            profilePic = (await cloudinary.uploader.upload(profilePic)).secure_url;
        }
        console.log(name, email, userId, profilePic);

        const exiting = await prisma.user.findUnique({ where: { email } })

        if (exiting && exiting.id != userId) {
            return res.status(400).json({ message: "Email already in use, use different email" });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { name, email, profilePic },
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

