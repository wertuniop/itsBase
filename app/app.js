require('dotenv').config({ path: '../.env' });
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const routesUser = require("./routes/user");
const routesOther = require("./routes/other");

const app = express();
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));
app.use(express.static("../storage"));
app.use(cookieParser());


app.use('/', routesUser);
app.use('/', routesOther);

app.listen(3000, async () => {
    console.log('server is ready');
    const mongoConnection = await mongoose.connect('mongodb://localhost/base_db');
    console.log('db is ready');

});

