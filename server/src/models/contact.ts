import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface ContactAttributes {
  id: number;
  resumeId: number;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ContactCreationAttributes extends Optional<ContactAttributes, 'id'> {}

export class Contact extends Model<ContactAttributes, ContactCreationAttributes> 
  implements ContactAttributes {
  public id!: number;
  public resumeId!: number;
  public firstName?: string;
  public lastName?: string;
  public email!: string;
  public phone?: string;
  public address?: string;
  public city?: string;
  public state?: string;
  public country?: string;
  public postalCode?: string;
  public linkedin?: string;
  public github?: string;
  public portfolio?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function ContactFactory(sequelize: Sequelize): typeof Contact {
  Contact.init(
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
        },
        unique: true, // Ensures one-to-one relationship with Resume
      },
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          isEmail: true,
        }
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
          // Basic phone number validation
          is: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i
        }
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      postalCode: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      linkedin: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          isUrl: true,
          is: /^https?:\/\/(www\.)?linkedin\.com\/.*$/i
        }
      },
      github: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          isUrl: true,
          is: /^https?:\/\/(www\.)?github\.com\/.*$/i
        }
      },
      portfolio: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          isUrl: true,
        }
      }
    },
    {
      tableName: 'contacts',
      sequelize,
      indexes: [
        {
          unique: true,
          fields: ['resumeId']
        },
        {
          fields: ['email']
        }
      ]
    }
  );

  return Contact;
}