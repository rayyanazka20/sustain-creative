import {Portfolio, User} from "../db/dbconnectiom.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js"

export const registerController = async (req, res) => {
    const { username, email, password,address,phoneNumber } = req.body;
    const existUser = await User.findOne({ where: { username: username } });
    if (existUser != null) {
        return res.status(409).json("User is already exist");
    } else {
        const hashedPass = await bcrypt.hash(password, 10);
        const user = await User.create({
            ...req.body,
            password: hashedPass,
        });
        return res.status(201).json({
            message:"User Signed in ",
            userData:{
                username,email
            }
        });
    }
};


export const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password)
            return res.status(400).json({ message: "Email & password required" });

        // cari user di database
        const user = await User.findOne({ where: { email } });
        if (!user)
            return res.status(401).json({ message: "Email atau password salah" });

        // bandingkan password
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(401).json({ message: "Email atau password salah" });

        // payload untuk token
        const payload = { id: user.id, username: user.username };

        // buat token
        const accessToken = await generateAccessToken(payload);
        const refreshToken = await generateRefreshToken(payload);

        await User.update(
            { refreshToken },
            { where: { id: user.id } }
        );


        // simpan refresh token di cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, // ubah ke true jika pakai HTTPS
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
        });

        // kirim response
        res.status(200).json({
            message: "Login berhasil",
            user: { id: user.id, name: user.username },
            accessToken: accessToken,
        });
    } catch (err) {
        console.error("Error saat login:", err);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};


export const  refreshController=async(req,res)=>{
    const refreshToken=req.cookies.refreshToken

    try{
        if(!refreshToken){
            return res.status(403).json("token is empty");
        }
        const user=await User.findOne({where:{refreshToken:refreshToken}});

        jwt.verify(refreshToken,process.env.JWT_SECRET_KEY,async(error,decoded)=>{
            if(error){
                return res.status(403).json("Invalid token");
            }
            const token=await generateAccessToken(user.dataValues);
            return res.status(200).json({accessToken:token});

        })

    }catch(e){
        return res.status(500).json("Internal Error");
    }

}

export const logoutController=async(req,res)=>{
    const refreshToken=req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(403).json("token is empty");
    }
    const user=await User.findOne({where:{refreshToken:refreshToken}});
    if(user!=null){
        await user.update({refreshToken:null})
    }
    res.clearCookie("refreshToken")
    return res.status(200).json("logout successfully");

}

export const getProfileController = async (req, res) => {
    const { id } = req.params;
    try {

        const user = await User.findOne({
            where: { id: id },
            attributes: { exclude: ["password"] },
        });

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }
      return res.status(200).json({
          message: "Portfolio berhasil diperbarui",
          data: user,
      });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err });
    }
};

export const updateProfileController = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        const { username, email, address, phoneNumber } = req.body;

        let imageUrl = user.imageProfile;
        if (req.file) {
            imageUrl = req.file.path;
        }

        await user.update({
            username: username ?? user.username,
            email: email ?? user.email,
            address: address ?? user.address,
            phoneNumber: phoneNumber ?? user.phoneNumber,
            imageProfile: imageUrl,
        });

        return res.status(200).json({
            message: "Profile berhasil diperbarui",
            data: user,
        });
    } catch (err) {
        console.error("Error update profile:", err);
        return res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};

// to do list update password

export const updatePasswordController = async (req, res) => {
    const { id } = req.params;
    const { oldPassword,newPassword,confirmPassword } = req.body;

    try {
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }


        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password lama salah" });
        }


        if (confirmPassword !== newPassword) {
            return res.status(400).json({ message: "password dont match" });
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        await user.update({
            password: newHashedPassword,
        });

        return res.status(200).json({
            message: "Profile berhasil diperbarui",
            data: user,
        });
    } catch (err) {
        console.error("Error update profile:", err);
        return res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};


