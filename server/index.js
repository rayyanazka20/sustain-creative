import express from "express";
import cookieParser from "cookie-parser";
import { dbConnection } from "./db/dbconnectiom.js";
import router from "./route/route.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());

// ✅ Tambahkan cookie parser di sini
app.use(cookieParser());

app.use("/api", router);

dbConnection(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD);

app.listen(8081, () => {
    console.log("Server running at port 8081");
});

export const cookieOptions = {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
};
