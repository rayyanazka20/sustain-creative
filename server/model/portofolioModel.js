import {DataTypes} from "sequelize";

const createPortfolioModel = (sequelize) => {
    const Portfolio = sequelize.define("Portfolio", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        portfolioName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        eventDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        categoryId: {   // Tambahkan foreign key
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Categories", // nama tabel Category
                key: "id",
            },
        },
    });

    return Portfolio;
};

export default createPortfolioModel;