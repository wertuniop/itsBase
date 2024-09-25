const express = require("express");
const multer = require('multer');
const {isAuth} = require('../middlewares/isAuth');
const {DropdownModel} = require('../models/dropdown_values');
const {DataService} = require('../services/interacrionData');
const { PublicationModel } = require("../models/publication");


const app = express.Router();
app.use(express.json()); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '../../../storage/'); 
    },
    filename: (req, file, cb) => {
        const filename =  Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname;
        req.body.path = filename;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });



app.get('/', async (req, res) => {
    const dropsdownData = await DropdownModel.findOne();
    const dataService = new DataService;

    if (req.query.filter && req.query.filter != '{}') {
        var filter = JSON.parse(req.query.filter);
        var formatedFilter = "";

        Object.entries(filter).forEach(([key, value]) => {
            formatedFilter += `${value} · `;
          });
        formatedFilter = formatedFilter.slice(0, -3);

        return res.render('index.hbs', {
            filter: formatedFilter,
            dropsdownData: dropsdownData,
            resultData: await dataService.get(1, filter)
        });
    }
    res.render('index.hbs', {
        filter: 'Показано все',
        dropsdownData: dropsdownData,
        resultData: await dataService.get()
    });
});


app.get('/create', isAuth, async (req, res) => {
    const dropsdownData = await DropdownModel.findOne();
    res.render('create.hbs', {
        dropsdownData: dropsdownData,
    })
});

app.post('/create', isAuth, upload.single('file'),async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ e: 'Файл не загружен' });
        }
        const dataSave = new DataService;
        await dataSave.create(req.body, req.user.data._id);

        return res.status(200).end();
    }
    catch (e) {
        console.log(e);
    }
});

app.post('/addToFav', isAuth, async (req, res) => {
    try {
        const dataService = new DataService;
        dataService.addToFav(req.user.data._id, req.body.pathPub);

        res.status(200).end();

    }
    catch (e) {
        res.status(500).end();
        console.log(e);
    }
});

app.post('/deletePub', isAuth, async(req, res) => {
    try {
        const dataService = new DataService;
        var pubId = await PublicationModel.findOne({path: req.body.pathPub});

        if (req.user.data._id != pubId.idUser) {
            return res.status(500).json({e: 'user dont create pub'}).end();
        }
        pubId = pubId._id;
        dataService.delete(pubId);
        res.status(200).end();
    }
    catch (e) {
        console.log(e);
        res.status(500).end();
    }
    
});


module.exports = app;