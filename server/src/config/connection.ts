import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from '../models/user.js'

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME!,
      process.env.DB_USER!,
      process.env.DB_PASSWORD!,
      {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

    sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));
// initialize models
UserFactory(sequelize);

export default sequelize;
