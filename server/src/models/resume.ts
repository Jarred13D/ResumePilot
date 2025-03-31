import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface ResumeAttributes {
  id: number;
  userId: number;
  title: string;
  summary: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ResumeCreationAttributes extends Optional<ResumeAttributes, "id"> {}

export class Resume
  extends Model<ResumeAttributes, ResumeCreationAttributes>
  implements ResumeAttributes
{
  public id!: number;
  public userId!: number;
  public title!: string;
  public summary!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function ResumeFactory(sequelize: Sequelize): typeof Resume {
  Resume.init(
    {
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
    },
    {
      tableName: "resumes",
      sequelize,
    }
  );

  return Resume;
}
