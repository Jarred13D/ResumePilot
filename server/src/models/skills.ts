import { DataTypes, Sequelize, Model, Optional } from "sequelize";

enum SkillLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  EXPERT = "expert",
}

enum SkillCategory {
  PROGRAMMING_LANGUAGES = "Programming Languages",
  FRAMEWORKS = "Frameworks",
  DATABASES = "Databases",
  CLOUD_SERVICES = "Cloud Services",
  TOOLS = "Tools",
  SOFT_SKILLS = "Soft Skills",
  OTHER = "Other",
}

interface SkillAttributes {
  id: number;
  resumeId: number;
  name: string;
  level: SkillLevel;
  category: SkillCategory;
  yearsOfExperience?: number;
  lastUsed?: Date;
  description?: string;
  isHighlighted: boolean;
  projects?: string[];
  certifications?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface SkillCreationAttributes extends Optional<SkillAttributes, "id"> {}

export class Skill
  extends Model<SkillAttributes, SkillCreationAttributes>
  implements SkillAttributes
{
  public id!: number;
  public resumeId!: number;
  public name!: string;
  public level!: SkillLevel;
  public category!: SkillCategory;
  public yearsOfExperience?: number;
  public lastUsed?: Date;
  public description?: string;
  public isHighlighted!: boolean;
  public projects?: string[];
  public certifications?: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function SkillFactory(sequelize: Sequelize): typeof Skill {
  Skill.init(
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
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      level: {
        type: DataTypes.ENUM(...Object.values(SkillLevel)),
        allowNull: false,
        defaultValue: SkillLevel.BEGINNER,
      },
      category: {
        type: DataTypes.ENUM(...Object.values(SkillCategory)),
        allowNull: false,
        defaultValue: SkillCategory.OTHER,
      },
      yearsOfExperience: {
        type: DataTypes.DECIMAL(4, 1),
        allowNull: true,
        validate: {
          min: 0,
          max: 50,
        },
      },
      lastUsed: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: true,
          notFuture(value: Date) {
            if (value > new Date()) {
              throw new Error("Last used date cannot be in the future");
            }
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isHighlighted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      projects: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
      },
      certifications: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
      },
    },
    {
      tableName: "skills",
      sequelize,
      indexes: [
        {
          fields: ["resumeId"],
        },
        {
          fields: ["name"],
        },
        {
          fields: ["category"],
        },
        {
          fields: ["level"],
        },
      ],
    }
  );

  return Skill;
}

export function setupSkillAssociations(models: { Resume: any; Skill: any }) {
  const { Resume, Skill } = models;

  Resume.hasMany(Skill, {
    sourceKey: "id",
    foreignKey: "resumeId",
    as: "resumeSkills", // Updated alias to ensure uniqueness
  });

  Skill.belongsTo(Resume, {
    targetKey: "id",
    foreignKey: "resumeId",
    as: "associatedResume", // Updated alias to ensure uniqueness
  });
}

// Service class for Skill operations
export class SkillService {
  static async create(resumeId: number, skillData: Partial<SkillAttributes>) {
    // Check if skill already exists for this resume
    const existingSkill = await Skill.findOne({
      where: {
        resumeId,
        name: skillData.name,
      },
    });

    if (existingSkill) {
      throw new Error("Skill already exists in this resume");
    }

    return await Skill.create({
      resumeId,
      name: skillData.name || "Unnamed Skill",
      level: skillData.level ?? SkillLevel.BEGINNER,
      category: skillData.category ?? SkillCategory.OTHER,
      isHighlighted: skillData.isHighlighted ?? false,
      ...skillData,
    });
  }

  static async update(id: number, skillData: Partial<SkillAttributes>) {
    const skill = await Skill.findByPk(id);
    if (!skill) {
      throw new Error("Skill not found");
    }
    return await skill.update(skillData);
  }

  static async getByResumeId(resumeId: number) {
    return await Skill.findAll({
      where: { resumeId },
      order: [
        ["category", "ASC"],
        ["isHighlighted", "DESC"],
        ["level", "DESC"],
        ["name", "ASC"],
      ],
    });
  }

  static async getByCategory(resumeId: number, category: SkillCategory) {
    return await Skill.findAll({
      where: {
        resumeId,
        category,
      },
      order: [
        ["isHighlighted", "DESC"],
        ["level", "DESC"],
        ["name", "ASC"],
      ],
    });
  }

  static async delete(id: number) {
    const skill = await Skill.findByPk(id);
    if (!skill) {
      throw new Error("Skill not found");
    }
    await skill.destroy();
    return true;
  }

  static async updateLevel(id: number, level: SkillLevel) {
    const skill = await Skill.findByPk(id);
    if (!skill) {
      throw new Error("Skill not found");
    }
    return await skill.update({ level });
  }

  static async toggleHighlight(id: number) {
    const skill = await Skill.findByPk(id);
    if (!skill) {
      throw new Error("Skill not found");
    }
    return await skill.update({ isHighlighted: !skill.isHighlighted });
  }

  static async addProject(id: number, projectName: string) {
    const skill = await Skill.findByPk(id);
    if (!skill) {
      throw new Error("Skill not found");
    }

    const projects = new Set([...(skill.projects || []), projectName]);
    return await skill.update({
      projects: Array.from(projects),
    });
  }

  static async addCertification(id: number, certificationName: string) {
    const skill = await Skill.findByPk(id);
    if (!skill) {
      throw new Error("Skill not found");
    }

    const certifications = new Set([
      ...(skill.certifications || []),
      certificationName,
    ]);
    return await skill.update({
      certifications: Array.from(certifications),
    });
  }
}
