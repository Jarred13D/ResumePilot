import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import sequelize from './config/connection'; 
import router from './routes/index';          

const forceDatabaseRefresh = false;
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(router);

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});