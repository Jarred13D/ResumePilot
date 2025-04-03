import { DataTypes, Model } from "sequelize";
export class Certification extends Model {
}
export function CertificationFactory(sequelize) {
    Certification.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        resumeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "resumes",
                key: "id",
            },
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        issuingOrganization: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        issueDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        expiryDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        credentialId: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        credentialUrl: {
            type: DataTypes.STRING(2048),
            allowNull: true,
            validate: {
                isUrl: true,
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: "certifications",
        sequelize,
        indexes: [
            {
                fields: ["resumeId"],
            },
            {
                fields: ["credentialId"],
            },
        ],
    });
    return Certification;
}
export function setupCertificationAssociations(models) {
    const { Resume, Certification } = models;
    Resume.hasMany(Certification, {
        sourceKey: "id",
        foreignKey: "resumeId",
        as: "certifications",
    });
    Certification.belongsTo(Resume, {
        targetKey: "id",
        foreignKey: "resumeId",
        as: "resume",
    });
}
