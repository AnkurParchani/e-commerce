const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = require("./app");

// Requiring env file for database connection
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

// Connecting to DATABASE
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => console.log("Error connecting to database", err));

//   Running the server
const port = 3000;
app.listen(port, () => {
  console.log("Server running on port", port);
});
