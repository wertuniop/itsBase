const mongoose = require("mongoose");
const {DropdownModel} = require('../models/dropdown_values');

async function migrate() {
    const mongoConnection = await mongoose.connect('mongodb://localhost/base_db');
    await DropdownModel.deleteMany();

    const result = await DropdownModel.create({
        directions: [
            '09.03.04',
            '09.03.01',
            '09.03.02',
            '15.03.04',
            '04.05.01',
            '08.02.11'
        ],
        courses: ['1', '2', '3', '4', '5'],
        semesters: ['1', '2'],
        typesP: [
            'Конспекты',
            'Билеты',
            'Лабы'
        ],
        subjects: [
            'Прога',
            'Матан',
            'Надо заполнить а то хуета какая-то',
            'ЭВМ',
            'Дедков сосочка'
        ]
    })

    console.log(result);
}

async function show() {
    const mongoConnection = await mongoose.connect('mongodb://localhost/base_db');

    const result = await DropdownModel.find();

    console.log(result);
}
show();