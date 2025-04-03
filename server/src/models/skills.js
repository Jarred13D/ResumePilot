import { DataTypes, Model } from "sequelize";
var SkillLevel;
(function (SkillLevel) {
    SkillLevel["BEGINNER"] = "beginner";
    SkillLevel["INTERMEDIATE"] = "intermediate";
    SkillLevel["ADVANCED"] = "advanced";
    SkillLevel["EXPERT"] = "expert";
})(SkillLevel || (SkillLevel = {}));
var SkillCategory;
(function (SkillCategory) {
    SkillCategory["PROGRAMMING_LANGUAGES"] = "Programming Languages";
    SkillCategory["FRAMEWORKS"] = "Frameworks";
    SkillCategory["DATABASES"] = "Databases";
    SkillCategory["CLOUD_SERVICES"] = "Cloud Services";
    SkillCategory["TOOLS"] = "Tools";
    SkillCategory["SOFT_SKILLS"] = "Soft Skills";
    SkillCategory["OTHER"] = "Other";
})(SkillCategory || (SkillCategory = {}));
export class Skill extends Model {
}
export function SkillFactory(sequelize) {
    Skill.init({
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
                notFuture(value) {
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
    }, {
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
    });
    return Skill;
}
export function setupSkillAssociations(models) {
    const { Resume, Skill } = models;
    Resume.hasMany(Skill, {
        sourceKey: "id",
        foreignKey: "resumeId",
        as: "skills",
    });
    Skill.belongsTo(Resume, {
        targetKey: "id",
        foreignKey: "resumeId",
        as: "resume",
    });
}
// Service class for Skill operations
export class SkillService {
    static async create(resumeId, skillData) {
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
            ...skillData,
        });
    }
    static async update(id, skillData) {
        const skill = await Skill.findByPk(id);
        if (!skill) {
            throw new Error("Skill not found");
        }
        return await skill.update(skillData);
    }
    static async getByResumeId(resumeId) {
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
    static async getByCategory(resumeId, category) {
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
    static async delete(id) {
        const skill = await Skill.findByPk(id);
        if (!skill) {
            throw new Error("Skill not found");
        }
        await skill.destroy();
        return true;
    }
    static async updateLevel(id, level) {
        const skill = await Skill.findByPk(id);
        if (!skill) {
            throw new Error("Skill not found");
        }
        return await skill.update({ level });
    }
    static async toggleHighlight(id) {
        const skill = await Skill.findByPk(id);
        if (!skill) {
            throw new Error("Skill not found");
        }
        return await skill.update({ isHighlighted: !skill.isHighlighted });
    }
    static async addProject(id, projectName) {
        const skill = await Skill.findByPk(id);
        if (!skill) {
            throw new Error("Skill not found");
        }
        const projects = new Set([...(skill.projects || []), projectName]);
        return await skill.update({
            projects: Array.from(projects),
        });
    }
    static async addCertification(id, certificationName) {
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
