const {AuthService} = require("../services/auth");
const {isAuth} = require('../middlewares/isAuth');
const express = require("express");
const { DataService } = require("../services/interacrionData");

const app = express.Router();
app.use(express.json()); 


app.get('/login', async (req, res) => {
    res.render('login.hbs');
});

app.post('/login', async (req, res) => {
    try {
        const result = req.body;
        const auth = new AuthService;
        const token = await auth.Login(result.nickname, result.password);

        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'strict'
        });
    
        return res.status(200).end();
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({e: e.message}).end();
    }
});

app.get('/register', async (req, res) => {
    res.render('register.hbs');
});

app.post('/register', async (req, res) => {
    try {
        const result = req.body;
        const auth = new AuthService;
        const token = await auth.Register(result.nickname, result.password);

        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'strict'
        });
    
        return res.status(200).end();
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({e: e.message}).end();
    }
});

app.get('/profile', isAuth, async (req, res) => {
    try {
        const dataService = new DataService;
        res.render('profile.hbs', {
            favourites: await dataService.getFav(req.user.data._id),
            myPublication: await dataService.getMyPub(req.user.data._id)
        })
    }
    catch (e) {
        console.log(e);
    }
    
});




module.exports = app;