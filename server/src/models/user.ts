import {
  Model,
  DataTypes,
  Sequelize,
  Optional,
} from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the optional attributes for creating a new User
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  async setPassword(rawPassword: string): Promise<void> {
    if (!rawPassword) {
      throw new Error('Password cannot be empty');
    }

    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    this.setDataValue('password', hashedPassword);
  }

  isValidPassword(rawPassword: string): Promise<boolean> {
    const storedHash = this.getDataValue('password');
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
          const rawPassword = user.getDataValue('password') as string;
          if (rawPassword) {
            await user.setPassword(rawPassword);
          }
        },
        beforeUpdate: async (user: User) => {
          const newPassword = user.getDataValue('password');
          if (user.changed('password') && newPassword) {
            await user.setPassword(newPassword);
          }
        },
      },
    }
  );

  return User;
}
