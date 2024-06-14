require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const LoginRouter = require("./controllers/LoginController");
const LogoutRouter = require("./controllers/LogoutController");
const RegisterRouter = require("./controllers/RegisterController");
const TokenRefreshRouter = require("./controllers/TokenRefreshController");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/login", LoginRouter);
app.use("/logout", LogoutRouter);
app.use("/register", RegisterRouter);
app.use("/refresh", TokenRefreshRouter);

app.listen(port, () => console.log(`App running on http://localhost:${port}`));
