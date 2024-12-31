import jwt from 'jsonwebtoken'



export async function generateJwtToken(userId, res) {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // MS
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
        });

        return token;
    } catch (error) {
        console.log(error)
    }
}

export async function verifyJwt(token) {
    return jwt.verify(token.slice(7), process.env.JWT_SECRET);
}