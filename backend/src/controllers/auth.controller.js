import { generateJwtToken } from "../lib/jwt.js";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/db.js";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await prisma.user.findFirst({ where: { email } });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    if (newUser) {
        generateJwtToken(newUser.id, res);

        res.status(201).json({
            name,
            email
        });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;


    const user = await prisma.user.findUnique({
        where: { email : email }
    })

    if (!user) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }
    console.log(user," this is the user ================")
    generateJwtToken(user.id, res);

    res.status(200).json({
        name: user.name,
        email: user.email,
    })
}

export const logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({
        message: "Logged our successfully"
    })
}

export const checkAuth = async (req, res) => {
    res.status(200).json(req.user)
}
