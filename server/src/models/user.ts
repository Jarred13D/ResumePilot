import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
// import bcrypt from 'bcrypt';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const bcrypt = require('bcrypt');

// Define the required attributes for a user
export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the optional attributes for creating a new User
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  async setPassword(rawPassword: string): Promise<void> {
    if (!rawPassword) {
      throw new Error('Password cannot be empty');
    }
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    this.setDataValue('password', hashedPassword);
  }

  isValidPassword(rawPassword: string): Promise<boolean> {
    const storedHash = this.getDataValue('password');
    if (typeof storedHash !== 'string') {
      throw new Error('Stored password hash is missing or invalid');
    }
    return bcrypt.compare(rawPassword, storedHash);
  }
}

export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'users',
      hooks: {
        beforeCreate: async (user: User) => {
          if (user.password) {
            await user.setPassword(user.password);
          } else {
            throw new Error('Password is required');
          }
        },
        beforeUpdate: async (user: User) => {
          if (user.changed('password')) {
            const newPassword = user.getDataValue('password');
            if (typeof newPassword === 'string') {
              await user.setPassword(newPassword);
            } else {
              throw new Error('New password missing in beforeUpdate hook');
            }
          }
        },
      },
    }
  );

  return User;
}

export { User as UserModel };