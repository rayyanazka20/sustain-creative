import jwt from "jsonwebtoken";

export const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token tidak ditemukan atau format salah" });
        }

        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
            if (error) {
                return res.status(403).json({ message: "Token tidak valid atau sudah kedaluwarsa" });
            }

            req.user = decoded;
            next();
        });
    } catch (err) {
        console.error("Error di middleware authenticateToken:", err);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};
