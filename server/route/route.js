import { Router } from "express";
import { registerController,loginController,refreshController,logoutController,profileController} from "../controller/userController.js";
import { authenticateToken } from "../controller/auth/auth.js";
import {CreatePorto, DeletePortoById, GetPortfolioById, GetPortfolios} from "../controller/portoController.js";
import {DeleteCategoryById, GetCategories, GetCategoryById} from "../controller/categoryController.js";


const router=Router();



router.post("/register",registerController);
router.post("/login",loginController);
router.post("/refreshtoken",refreshController);
router.post("/logout",authenticateToken,logoutController);

router.post("/profile",authenticateToken,profileController);

router.post("/portfolio", authenticateToken, CreatePorto);
router.get("/portfolio",authenticateToken,GetPortfolios)
router.get("/portfolio/:id",authenticateToken,GetPortfolioById)
router.delete("/portfolio/:id",authenticateToken,DeletePortoById)

router.get("/category",authenticateToken,GetCategories)
router.get("/category/:id",authenticateToken,GetCategoryById)
router.delete("/category/:id",authenticateToken,DeleteCategoryById)







export default router;