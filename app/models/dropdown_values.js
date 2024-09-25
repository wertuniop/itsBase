const mongoose = require("mongoose");

const valuesSchema = new mongoose.Schema({
    directions: Array,
    courses: Array,
    semesters: Array,
    subjects: Array,
    typesP: Array

});

exports.DropdownModel = mongoose.model("DropdownValues", valuesSchema);