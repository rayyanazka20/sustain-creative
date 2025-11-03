import { Portfolio,Category  } from "../db/dbconnectiom.js";

export const CreatePorto = async (req, res) => {
        const { portfolioName, companyName, eventDate, categoryId } = req.body;

    try {

        const userId = req.user.id;

        const newPorto = await Portfolio.create({
            portfolioName,
            companyName,
            eventDate,
            categoryId,
            userId,
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
        const { id } = req.params;
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
        const { id } = req.params; // ID portfolio dari URL
        const userId = req.user.id; // ID user dari token

        // Cek apakah portfolio milik user yang sedang login
        const portfolio = await Portfolio.findOne({
            where: { id, userId },
        });

        if (!portfolio) {
            return res.status(404).json({
                message: `Portfolio dengan ID ${id} tidak ditemukan atau bukan milik user ini`,
            });
        }

        // Hapus portfolio
        await Portfolio.destroy({
            where: { id, userId },
        });

        res.status(200).json({
            message: `Portfolio dengan ID ${id} berhasil dihapus`,
        });
    } catch (err) {
        console.error("Error saat menghapus portfolio:", err);
        res.status(500).json({
            message: "Terjadi kesalahan server",
        });
    }
};