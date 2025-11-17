import { Sequelize } from "sequelize";
import createUserModel from "../model/userModel.js";
import createPortfolioModel from "../model/portofolioModel.js";
import createCategoryModel from "../model/categoryModel.js";

let User = null;
let Portfolio = null;
let Category = null;

export const dbConnection = async (database, username, password) => {
    const sequelize = new Sequelize(database, username, password, {
        host: "localhost",
        dialect: "postgres",
    });

    try {
        await sequelize.authenticate();

        // Inisialisasi model
        User = createUserModel(sequelize);
        Category = createCategoryModel(sequelize);
        Portfolio = createPortfolioModel(sequelize);

        // Relasi User ↔ Portfolio (One-to-Many)
        User.hasMany(Portfolio, {
            foreignKey: "userId",
            onDelete: "CASCADE",
        });
        Portfolio.belongsTo(User, { foreignKey: "userId" });

        Category.hasMany(Portfolio, {
            foreignKey: "categoryId",
            onDelete: "SET NULL",
        });
        Portfolio.belongsTo(Category, { foreignKey: "categoryId", as: "Category" });

        await sequelize.sync({ alter: true });
        console.log("✅ Database & tables synced successfully.");
    } catch (error) {
        console.error("❌ Unable to connect to the database:", error);
    }
};

export { User, Portfolio, Category };
