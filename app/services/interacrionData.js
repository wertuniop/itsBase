const {PublicationModel} = require('../models/publication');
const {UserModel} = require('../models/user');


exports.DataService = class {
    constructor () {}

    async get (page = 1, filter = {}, sort = {rating: 'desc'}, pageSize = 20) {
        const result = await PublicationModel.find(filter).sort(sort).skip((page - 1) * pageSize).limit(pageSize);
        return result;
    }


    async create (data, idUser) {
        data.date = new Date();
        data.idUser = idUser;

        const createPost = await PublicationModel.create(data);

        if (createPost) {
            return true;
        }
        return false;
    }


    async delete (id) {
        const deletePost = await PublicationModel.findByIdAndDelete(id)
        if (deletePost) {
            return true;
        }
        return false;
    }


    async addToFav (userId, pathPub) {
        try {
            var idPub = await PublicationModel.findOne({path: pathPub});
            idPub = idPub._id;            

            if (await UserModel.findOne({_id:userId, favourites: idPub})) {
                await UserModel.findByIdAndUpdate(
                    userId,
                    { $pull: { favourites: idPub } },
                    { new: true, useFindAndModify: false }
                );
                console.log('Post removed to favourites successfully');

            }
            else {
                await UserModel.findByIdAndUpdate(
                    userId,
                    { $push: { favourites: idPub } },
                    { new: true, useFindAndModify: false }
                );
                console.log('Post added to favourites successfully');
            }
        } catch (error) {
            console.error('Error adding post to favourites:', error);
        }
    }


    async changeRating (userId, pathPub) {

    }


    async getFav (userId) {
        const user = await UserModel.findOne({_id:userId});
        const userFav = user.favourites;

        var result = [];
        for (var i = 0; i < userFav.length; i++) {
            result.unshift(await PublicationModel.findOne({_id:userFav[i]}));
        }

        return result;
    }

    
    async getMyPub (userId) {
        const result = await PublicationModel.find({idUser: userId}).sort({date: -1});
        return result;
    }
}