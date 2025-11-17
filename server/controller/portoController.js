import { Portfolio,Category  } from "../db/dbconnectiom.js";

export const CreatePorto = async (req, res) => {
    try {
        const { portfolioName, companyName, eventDate, categoryId, description } = req.body; // 🟢 tambahkan description
        const userId = req.user.id;

        const imageUrl = req.file?.path;

        const newPorto = await Portfolio.create({
            portfolioName,
            companyName,
            eventDate,
            categoryId,
            description,
            userId,
            image: imageUrl,
        });

        res.status(201).json({
            message: "Portfolio berhasil dibuat",
            data: newPorto,
        });
    } catch (err) {
        console.error("Error saat membuat portfolio:", err);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};

export const GetPortfoliosGlobal = async (req, res) => {
    try {

        const portfolios = await Portfolio.findAll({
            attributes: ['id', 'portfolioName','companyName','description'],
            order: [["eventDate", "DESC"]],
            include: [
                {
                    model: Category,
                    as: "Category",
                    attributes: ["name"],
                },
            ],
            limit: 6,
        });

        if (portfolios.length === 0) {
            return res.status(404).json({ message: "Belum ada portfolio untuk user ini" });
        }

        res.status(200).json({
            message: "Berhasil mengambil data portfolio",
            data: portfolios,
        });
    } catch (err) {
        console.error("Error saat mengambil portfolio:", err);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};




export const GetPortfolios = async (req, res) => {
    try {
        const userId = req.user.id;

        const portfolios = await Portfolio.findAll({
            where: { userId },
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Category,
                    as: "Category",
                    attributes: ["name"],
                },
            ],
        });

        if (portfolios.length === 0) {
            return res.status(404).json({ message: "Belum ada portfolio untuk user ini" });
        }

        res.status(200).json({
            message: "Berhasil mengambil data portfolio",
            data: portfolios,
        });
    } catch (err) {
        console.error("Error saat mengambil portfolio:", err);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};

export const GetPortfolioById = async (req, res) => {
    try {
        const userId = req.user.id;

        // Cek apakah portfolio dengan ID tersebut milik user ini
        const portfolio = await Portfolio.findOne({
            where: { id, userId },
        });

        if (!portfolio) {
            return res.status(404).json({
                message: `Portfolio dengan ID ${id} tidak ditemukan atau bukan milik user ini`,
            });
        }

        res.status(200).json({
            message: "Berhasil mengambil data portfolio",
            data: portfolio,
        });
    } catch (err) {
        console.error("Error saat mengambil portfolio berdasarkan ID:", err);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};

export const DeletePortoById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const portfolio = await Portfolio.findOne({
            where: { id, userId },
        });

        if (!portfolio) {
            return res.status(404).json({
                message: "Portfolio tidak ditemukan atau bukan milik Anda",
            });
        }

        // 🔹 Hapus gambar dari Cloudinary (jika ada)
        if (portfolio.image) {
            try {
                // Ambil public_id dari URL Cloudinary
                const publicId = portfolio.image
                    .split("/")
                    .pop()
                    .split(".")[0];

                await cloudinary.uploader.destroy(publicId);
                console.log("Gambar Cloudinary terhapus:", publicId);
            } catch (cloudErr) {
                console.warn("Gagal hapus gambar dari Cloudinary:", cloudErr);
            }
        }

        // 🔹 Hapus data dari database
        await portfolio.destroy();

        res.status(200).json({
            message: `Portfolio "${portfolio.portfolioName}" dan gambarnya berhasil dihapus`,
        });
    } catch (err) {
        console.error("Error saat menghapus portfolio:", err);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};

export const UpdatePortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Pastikan portfolio milik user
        const portfolio = await Portfolio.findOne({ where: { id, userId } });
        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio tidak ditemukan atau bukan milik Anda" });
        }

        // Jika tidak ada req.body, artinya formData tidak terbaca
        if (!req.body) {
            return res.status(400).json({ message: "Data form tidak ditemukan" });
        }

        // Ambil data dari form body (yang dikirim via FormData)
        const { portfolioName, companyName, eventDate, categoryId, description } = req.body;

        // Ambil URL gambar baru jika diupload
        let imageUrl = portfolio.image;
        if (req.file) {
            // Hapus gambar lama dari Cloudinary
            if (portfolio.image) {
                try {
                    const publicId = portfolio.image.split("/").pop().split(".")[0];
                    await cloudinary.uploader.destroy(publicId);
                } catch (err) {
                    console.warn("Gagal menghapus gambar lama:", err);
                }
            }
            imageUrl = req.file.path; // URL baru dari Cloudinary
        }

        // Update data portfolio
        await portfolio.update({
            portfolioName,
            companyName,
            eventDate,
            categoryId,
            description,
            image: imageUrl,
        });

        res.status(200).json({
            message: "Portfolio berhasil diperbarui",
            data: portfolio,
        });
    } catch (err) {
        console.error("❌ Error saat mengupdate portfolio:", err);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};
