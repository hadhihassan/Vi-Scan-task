import { prisma } from '../lib/db.js';
import { verifyJwt } from '../lib/jwt.js';


export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized user Access. No token provided."
            })
        }
        
        const decoded = await verifyJwt(token);

        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized user Access. No token provided."
            })
        }
        
        const user = await prisma.user.findUnique({
                where: {
                    id: decoded.userId
                }
            })

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            })
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Error in protededRoute middleware", error);
        res.status(500).json({
            Message: "Internal server error"
        })
    }
}
