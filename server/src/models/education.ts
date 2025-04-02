import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface EducationAttributes {
  id: number;
  resumeId: number;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  // startDate: Date;
  graduationDate?: Date;
  gpa?: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EducationCreationAttributes extends Optional<EducationAttributes, 'id'> {}

export class Education extends Model<EducationAttributes, EducationCreationAttributes> 
  implements EducationAttributes {
  public id!: number;
  public resumeId!: number;
  public institution!: string;
  public degree!: string;
  public fieldOfStudy!: string;
  // public startDate!: Date;
  public graduationDate?: Date;
  public gpa?: number;
  public description?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function EducationFactory(
  sequelize: Sequelize): typeof Education {
  Education.init(
    {
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
      // startDate: {
      //   type: DataTypes.DATE,
      //   allowNull: false,
      // },
      graduationDate: {
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
    },
    {
      tableName: 'education',
      sequelize,
    }
  );

  return Education;
}

// Add this to your index.ts where you set up associations
export function setupEducationAssociations(models: {
  Resume: any;
  Education: any;
}) {
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
