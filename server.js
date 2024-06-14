require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const LoginRouter = require("./controllers/LoginController");
const LogoutRouter = require("./controllers/LogoutController");
const RegisterRouter = require("./controllers/RegisterController");
const TokenRefreshRouter = require("./controllers/TokenRefreshController");

const app = express();
const port = process.env.PORT;
const dbUrl = process.env.MONGO_URI || "mongodb://localhost:27017/yourdbname";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to the database
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error("Cannot connect to the database!", err);
    process.exit();
  });

// Routes
app.use("/login", LoginRouter);
app.use("/logout", LogoutRouter);
app.use("/register", RegisterRouter);
app.use("/refresh", TokenRefreshRouter);

app.listen(port, () => console.log(`App running on http://localhost:${port}`));
