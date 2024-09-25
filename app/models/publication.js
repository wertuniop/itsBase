const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema({
    direction: String,
    course: String,
    semester: String,
    subject: String,
    typeP: {
        type: String,
        lowercase: true
    },
    date: Date,
    rating: Number,
    idUser: String,
    path: String,

});

exports.PublicationModel = mongoose.model("Publication", publicationSchema);
