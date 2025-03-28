import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface CertificationAttributes {
  id: number;
  resumeId: number;
  name: string;
  issuingOrganization: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CertificationCreationAttributes
  extends Optional<CertificationAttributes, "id"> {}

export class Certification
  extends Model<CertificationAttributes, CertificationCreationAttributes>
  implements CertificationAttributes {
  public id!: number;
  public resumeId!: number;
  public name!: string;
  public issuingOrganization!: string;
  public issueDate!: Date;
  public expiryDate?: Date;
  public credentialId?: string;
  public credentialUrl?: string;
  public description?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function CertificationFactory(
  sequelize: Sequelize
): typeof Certification {
  Certification.init(
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
    },
    {
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
    }
  );

  return Certification;
}

export function setupCertificationAssociations(models: {
  Resume: any;
  Certification: any;
}) {
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

