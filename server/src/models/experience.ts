import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface ExperienceAttributes {
  id: number;
  resumeId: number;
  company: string;
  position: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  description: string;
  responsibilities?: string[];
  achievements?: string[];
  technologies?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface ExperienceCreationAttributes
  extends Optional<ExperienceAttributes, "id"> {}

export class Experience
  extends Model<ExperienceAttributes, ExperienceCreationAttributes>
  implements ExperienceAttributes
{
  public id!: number;
  public resumeId!: number;
  public company!: string;
  public position!: string;
  public location?: string;
  public startDate!: Date;
  public endDate?: Date;
  public isCurrent!: boolean;
  public description!: string;
  public responsibilities?: string[];
  public achievements?: string[];
  public technologies?: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function ExperienceFactory(sequelize: Sequelize): typeof Experience {
  Experience.init(
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
          model: "resumes",
          key: "id",
        },
      },
      company: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          notFuture(value: Date) {
            if (value > new Date()) {
              throw new Error("Start date cannot be in the future");
            }
          },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: true,
          validateEndDate(value: Date) {
            if (value && value < this.startDate) {
              throw new Error("End date must be after start date");
            }
            if (value && value > new Date()) {
              throw new Error("End date cannot be in the future");
            }
          },
        },
      },
      isCurrent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      responsibilities: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      achievements: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      technologies: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
    },
    {
      tableName: "experiences",
      sequelize,
      indexes: [
        {
          fields: ["resumeId"],
        },
        {
          fields: ["company"],
        },
        {
          fields: ["startDate"],
        },
      ],
      hooks: {
        beforeSave: async (experience: Experience) => {
          if (experience.isCurrent) {
            experience.endDate = null;
          }
        },
      },
    }
  );

  return Experience;
}

export function setupExperienceAssociations(models: {
  Resume: any;
  Experience: any;
}) {
  const { Resume, Experience } = models;

  Resume.hasMany(Experience, {
    sourceKey: "id",
    foreignKey: "resumeId",
    as: "experiences",
  });

  Experience.belongsTo(Resume, {
    targetKey: "id",
    foreignKey: "resumeId",
    as: "resume",
  });
}

// Service class for Experience operations
export class ExperienceService {
  static async create(
    resumeId: number,
    experienceData: Partial<ExperienceAttributes>
  ) {
    return await Experience.create({
      resumeId,
      ...experienceData,
    });
  }

  static async update(
    id: number,
    experienceData: Partial<ExperienceAttributes>
  ) {
    const experience = await Experience.findByPk(id);
    if (!experience) {
      throw new Error("Experience not found");
    }

    // If updating to current position, ensure only one current position exists
    if (experienceData.isCurrent) {
      await Experience.update(
        { isCurrent: false },
        {
          where: {
            resumeId: experience.resumeId,
            isCurrent: true,
          },
        }
      );
    }

    return await experience.update(experienceData);
  }

  static async getByResumeId(resumeId: number) {
    return await Experience.findAll({
      where: { resumeId },
      order: [
        ["isCurrent", "DESC"],
        ["endDate", "DESC"],
        ["startDate", "DESC"],
      ],
    });
  }

  static async delete(id: number) {
    const experience = await Experience.findByPk(id);
    if (!experience) {
      throw new Error("Experience not found");
    }
    await experience.destroy();
    return true;
  }

  static async validateDates(startDate: Date, endDate?: Date) {
    const now = new Date();

    if (startDate > now) {
      throw new Error("Start date cannot be in the future");
    }

    if (endDate && endDate < startDate) {
      throw new Error("End date must be after start date");
    }

    if (endDate && endDate > now) {
      throw new Error("End date cannot be in the future");
    }
  }
}
