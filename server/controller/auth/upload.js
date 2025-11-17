import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../config/cloudinary.js"; // ✅ relative path

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "portfolio_images",
        allowedFormats: ["jpg", "png", "jpeg"],
    },
});

const upload = multer({ storage });

export default upload;
