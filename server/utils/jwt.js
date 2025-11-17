import jwt from "jsonwebtoken";

export const generateAccessToken = async (user) => {
    const token = jwt.sign(
        {
            id: user.id,              // Tambahkan id
            username: user.username,  // dan username
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "15m" } // 15 menit
    );
    return token;
};

export const generateRefreshToken = async (user) => {
    const token = jwt.sign(
        {
            id: user.id,              // Tambahkan id
            username: user.username,  // dan username
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" } // 7 hari
    );
    return token;
};
