require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const authRouter = require('./routes/authRoute');
const app = express();
const port = 3005;
const dbConn = require('./config/db.config');
app.dbConn=dbConn();
app.use(cors());
app.use(bodyParser.json());
app.use(authRouter);


//Ici on envoit les infos vers le front

app.get('/message', (req, res) => {
    const message = 'messageType'
    res.send(message);
});

app.listen(port, () => console.log('app running on http://localhost:3000'));