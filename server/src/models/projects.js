import { DataTypes, Model } from "sequelize";
export class Project extends Model {
}
export function ProjectFactory(sequelize) {
    Project.init({
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
        title: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true,
                notFuture(value) {
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
                validateEndDate(value) {
                    if (value && value < this.startDate) {
                        throw new Error("End date must be after start date");
                    }
                },
            },
        },
        isOngoing: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        url: {
            type: DataTypes.STRING(2048),
            allowNull: true,
            validate: {
                isUrl: true,
            },
        },
        githubUrl: {
            type: DataTypes.STRING(2048),
            allowNull: true,
            validate: {
                isUrl: true,
                isGithubUrl(value) {
                    if (value && !value.match(/^https?:\/\/(www\.)?github\.com\/.+/i)) {
                        throw new Error("Must be a valid GitHub URL");
                    }
                },
            },
        },
        technologies: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: [],
        },
        highlights: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
            defaultValue: [],
        },
        role: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        teamSize: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1,
            },
        },
        imageUrls: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
            defaultValue: [],
            validate: {
                isValidUrls(value) {
                    if (value) {
                        value.forEach((url) => {
                            if (!url.match(/^https?:\/\/.+/i)) {
                                throw new Error("Invalid image URL");
                            }
                        });
                    }
                },
            },
        },
    }, {
        tableName: "projects",
        sequelize,
        indexes: [
            {
                fields: ["resumeId"],
            },
            {
                fields: ["title"],
            },
            {
                fields: ["startDate"],
            },
        ],
        hooks: {
            beforeSave: async (project) => {
                if (project.isOngoing) {
                    project.endDate = null;
                }
            },
        },
    });
    return Project;
}
export function setupProjectAssociations(models) {
    const { Resume, Project } = models;
    Resume.hasMany(Project, {
        sourceKey: "id",
        foreignKey: "resumeId",
        as: "projects",
    });
    Project.belongsTo(Resume, {
        targetKey: "id",
        foreignKey: "resumeId",
        as: "resume",
    });
}
// Service class for Project operations
export class ProjectService {
    static async create(resumeId, projectData) {
        return await Project.create({
            resumeId,
            ...projectData,
        });
    }
    static async update(id, projectData) {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error("Project not found");
        }
        return await project.update(projectData);
    }
    static async getByResumeId(resumeId) {
        return await Project.findAll({
            where: { resumeId },
            order: [
                ["isOngoing", "DESC"],
                ["endDate", "DESC"],
                ["startDate", "DESC"],
            ],
        });
    }
    static async delete(id) {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error("Project not found");
        }
        await project.destroy();
        return true;
    }
    static async addTechnology(id, technology) {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error("Project not found");
        }
        const technologies = new Set([...project.technologies, technology]);
        return await project.update({
            technologies: Array.from(technologies),
        });
    }
    static async removeTechnology(id, technology) {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error("Project not found");
        }
        return await project.update({
            technologies: project.technologies.filter((tech) => tech !== technology),
        });
    }
    static async addHighlight(id, highlight) {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error("Project not found");
        }
        const highlights = [...(project.highlights || []), highlight];
        return await project.update({ highlights });
    }
}
