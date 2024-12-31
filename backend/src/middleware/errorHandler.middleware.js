import { Prisma } from "@prisma/client";

export const errorHandler = (error, req, res, next) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
            console.error('Error: Record not found for the given ID');
        } else if (error.code === 'P2002') {
            console.error('Error: Unique constraint violation');
        } else {
            console.error('Prisma known error:', error.message);
        }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
        console.error('Validation error:', error.message);
    } else {
        res.status(500).json({
            errors: [{ message: error.message || "Something went wrong" }],
        });
    }
    throw error
};