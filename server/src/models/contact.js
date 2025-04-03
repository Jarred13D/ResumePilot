import { DataTypes, Model } from 'sequelize';
export class Contact extends Model {
}
export function ContactFactory(sequelize) {
    Contact.init({
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
    }, {
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
    });
    return Contact;
}
