import dotenv from "dotenv";
import { QueryTypes, Sequelize, DataTypes } from "sequelize";
import express from "express";

dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
});

class Note extends Model {}
Note.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        important: {
            type: DataTypes.BOOLEAN,
        },
        date: {
            type: DataTypes.DATE,
        },
        creationYear: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: "note",
    }
);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
