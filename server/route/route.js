import { Router } from "express";
import { registerController,loginController,refreshController,logoutController,profileController} from "../controller/userController.js";
import { authenticateToken } from "../controller/auth/auth.js";
import {
    CreatePorto,
    DeletePortoById,
    GetPortfolioById,
    GetPortfolios, UpdatePortfolio
} from "../controller/portoController.js";
import {DeleteCategoryById, GetCategories, GetCategoryById} from "../controller/categoryController.js";
import multer from "multer";
import path from "path";
import upload from "../controller/auth/upload.js";


const router=Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // folder penyimpanan
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // nama file unik
    },
});




router.post("/register",registerController);
router.post("/login",loginController);
router.post("/refreshtoken",refreshController);
router.post("/logout",authenticateToken,logoutController);

router.post("/profile",authenticateToken,profileController);

router.post("/portfolio", upload.single("image"), authenticateToken, CreatePorto);
router.get("/portfolio",authenticateToken,GetPortfolios)
router.get("/portfolio/:id",authenticateToken,GetPortfolioById)
router.put("/portfolio/:id",upload.single("image"),authenticateToken,UpdatePortfolio)
router.delete("/portfolio/:id",authenticateToken,DeletePortoById)

router.get("/category",GetCategories)
router.get("/category/:id",GetCategoryById)
router.delete("/category/:id",authenticateToken,DeleteCategoryById)







export default router;