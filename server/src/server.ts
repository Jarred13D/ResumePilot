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

const clientDistPath = path.resolve(__dirname, '../../client/dist');

// Serve static files from Vite's client build
app.use(express.static(clientDistPath));

// Fallback route
app.use((_req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

// Debug: Dump all registered route paths
function printRoutes(app: any) {
  console.log('\nRegistered routes:');
  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      console.log(`→ ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler: any) => {
        if (handler.route) {
          console.log(`→ ${handler.route.path}`);
        }
      });
    }
  });
}

if (app._router && app._router.stack) {
  printRoutes(app);
}

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});