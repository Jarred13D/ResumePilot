const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import sequelize from './config/connection.js';
import routes from './routes/index.js';
import authRoutes from './routes/auth-routes.js';
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

// middleware to parse json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
app.use('/api/v1/auth', authRoutes); // Use the authentication routes
app.use(routes); // Use the main routes
app.use("/api/ai", aiRoutes); // Use the AI routes

const PORT = process.env.PORT || 3001;

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});


// const forceDatabaseRefresh = false;

// import express from "express";
// import sequelize from "./config/connection.js";
// import routes from "./routes/index.js";
// import cors from "cors"; // allows cross-origin resource sharing, allowing the client to make requests to the server from a different domain (may not need this)
// import dotenv from "dotenv";
// import aiRoutes from "./routes/aiRoutes.js";

// dotenv.config();

// const app = express();
// app.use(cors()); // Enable CORS
// app.use("/api/ai", aiRoutes); // Use the AI routes

// const PORT = process.env.PORT || 3001;

// // Serves static files in the entire client's dist folder
// app.use(express.static("../client/dist"));

// app.use(express.json());
// app.use(routes);

// sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
//   });
// });