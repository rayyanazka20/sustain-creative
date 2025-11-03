import categoryModel from "../model/categoryModel.js";

export const GetCategories = async (req, res) => {
    try {
        // Ambil semua data kategori dari database
        const categories = await categoryModel.findAll({
            order: [["id", "ASC"]], // opsional: urutkan berdasarkan id
        });

        // Jika tidak ada data kategori
        if (categories.length === 0) {
            return res.status(404).json({
                message: "Belum ada data kategori",
            });
        }

        // Kirim response sukses
        res.status(200).json({
            message: "Berhasil mengambil data kategori",
            data: categories,
        });
    } catch (err) {
        console.error("Error saat mengambil data kategori:", err);
        res.status(500).json({
            message: "Terjadi kesalahan server",
        });
    }
};

export const GetCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        // Cari kategori berdasarkan ID
        const category = await categoryModel.findOne({
            where: { id },
        });

        // Jika tidak ditemukan
        if (!category) {
            return res.status(404).json({
                message: `Kategori dengan ID ${id} tidak ditemukan`,
            });
        }

        // Jika ditemukan
        res.status(200).json({
            message: "Berhasil mengambil data kategori",
            data: category,
        });
    } catch (err) {
        console.error("Error saat mengambil kategori berdasarkan ID:", err);
        res.status(500).json({
            message: "Terjadi kesalahan server",
        });
    }
};

export const DeleteCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        // Cek dulu apakah kategori ada
        const category = await categoryModel.findOne({ where: { id } });
        if (!category) {
            return res.status(404).json({
                message: `Kategori dengan ID ${id} tidak ditemukan`,
            });
        }

        // Hapus kategori
        await categoryModel.destroy({ where: { id } });

        res.status(200).json({
            message: `Kategori dengan ID ${id} berhasil dihapus`,
        });
    } catch (err) {
        console.error("Error saat menghapus kategori:", err);
        res.status(500).json({
            message: "Terjadi kesalahan server",
        });
    }
};
