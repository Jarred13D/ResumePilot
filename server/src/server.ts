import dotenv from 'dotenv';
import express from 'express';
//import cors from 'cors';
import sequelize from './config/connection.js'; 
import router from './routes/index.js';      

const forceDatabaseRefresh = false;
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

//app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(router);

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from Vite's client build
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Fallback route: for any route not handled by your API, serve index.html (SPA fallback)
// console.log('Setting up fallback for: *');
// app.get('*', (_req, res) => {
//   res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
// });

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});