import { DataTypes, Model } from 'sequelize';
export class Education extends Model {
}
export function EducationFactory(sequelize) {
    Education.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        resumeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'resumes',
                key: 'id'
            }
        },
        institution: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        degree: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        fieldOfStudy: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        gpa: {
            type: DataTypes.DECIMAL(3, 2),
            allowNull: true,
            validate: {
                min: 0.0,
                max: 4.0
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
        tableName: 'education',
        sequelize,
    });
    return Education;
}
// Add this to your index.ts where you set up associations
export function setupEducationAssociations(models) {
    const { Resume, Education } = models;
    Resume.hasMany(Education, {
        sourceKey: 'id',
        foreignKey: 'resumeId',
        as: 'education'
    });
    Education.belongsTo(Resume, {
        targetKey: 'id',
        foreignKey: 'resumeId',
        as: 'resume'
    });
}
