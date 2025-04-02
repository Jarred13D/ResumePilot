import { DataTypes, Model } from "sequelize";
export class Resume extends Model {
}
export function ResumeFactory(sequelize) {
    Resume.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: "resumes",
        sequelize,
    });
    return Resume;
}
