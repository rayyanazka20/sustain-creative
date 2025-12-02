import { Portfolio,Category  } from "../db/dbconnectiom.js";
import {Op} from "sequelize";

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
            attributes: ['id','portfolioName','companyName','description','image'],
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

export const GetPortfoliosGlobalByCategory = async (req, res) => {
    const { categoryName } = req.params;

    try {
        const portfolios = await Portfolio.findAll({
            attributes: ['id', 'portfolioName','companyName','description','image'],
            order: [["eventDate", "DESC"]],
            include: [
                {
                    model: Category,
                    as: "Category",
                    attributes: ["name"],
                    where: categoryName ? { name: categoryName }:undefined,
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

        // 1. Ambil parameter dari Query
        // Default: page 1 dan limit 10
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // 2. Hitung OFFSET (Batas Awal Pengambilan Data)
        // Rumus: (page - 1) * limit
        const offset = (page - 1) * limit;

        // 3. Query Total Data (untuk mengetahui jumlah halaman total)
        const totalPortfolios = await Portfolio.count({
            where: { userId },
        });

        // 4. Query Data dengan LIMIT dan OFFSET
        const portfolios = await Portfolio.findAll({
            where: { userId },
            order: [["createdAt", "DESC"]],
            limit: limit,   // Jumlah data per halaman
            offset: offset, // Data dimulai dari mana
            include: [
                {
                    model: Category,
                    as: "Category",
                    attributes: ["name"],
                },
            ],
        });

        // 5. Hitung Total Halaman
        const totalPages = Math.ceil(totalPortfolios / limit);

        if (portfolios.length === 0 && page > 1) {
            return res.status(404).json({ message: "Halaman tidak ditemukan" });
        }

        if (portfolios.length === 0 && page === 1) {
            return res.status(404).json({ message: "Belum ada portfolio untuk user ini" });
        }

        // 6. Kirim Response dengan Metadata Pagination
        res.status(200).json({
            message: "Berhasil mengambil data portfolio",
            meta: { // Metadata untuk kebutuhan frontend
                totalItems: totalPortfolios,
                totalPages: totalPages,
                currentPage: page,
                itemsPerPage: limit,
            },
            data: portfolios,
        });

    } catch (err) {
        console.error("Error saat mengambil portfolio:", err);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};

export const GetPortfolioById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const portfolio = await Portfolio.findOne({
            where: { id: id, userId: userId },
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

export const getSearchPortfolioController = async (req, res) => {
    const { portfolioName, categoryId, startDate, endDate } = req.query;
    const userId = req.user.id;

    let where = { userId };

    // 🔍 search by name
    if (portfolioName) {
        where.portfolioName = { [Op.like]: `%${portfolioName}%` };
    }

    // 🎯 filter category
    if (categoryId) {
        where.categoryId = categoryId;
    }

    // 📅 date range
    if (startDate && endDate) {
        where.eventDate = { [Op.between]: [startDate, endDate] };
    }

    try {
        const data = await Portfolio.findAll({
            where: where,
            include: [
                {
                    model: Category,
                    as: "Category",
                    attributes: ["id", "name"],
                },
            ],
        });

        res.json({ status: true, data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: err.message });
    }
};

