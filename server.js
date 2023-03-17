//Import express.js into file for backend
const express = require("express");
// Import routes into startup
const routes = require("./routes");
//Import sequelize for database
const sequelize = require("./config/connection");
//Setup Ports
const PORT = process.env.PORT || 3001;
//setup app for express start
const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// turn on routes
app.use(routes);
// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("now listening"));

});