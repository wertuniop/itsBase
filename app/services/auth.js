const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const {UserModel} = require('../models/user');
require('dotenv').config({ path: '../../.env' });


exports.AuthService =  class {
    constructor(){}


    async Login (nickname, password) {
        console.log('login:', nickname);
        const userRecord = await UserModel.findOne({nickname});
        if (!userRecord) {
            throw new Error("Неправильный логин")
        } 
        else {
            const correctPassword = await argon2.verify(userRecord.password, password);
            if (!correctPassword) {
                throw new Error('Неправильный пароль')
            }
        }
        return {
            token: this.generateJWT(userRecord)
        }

    }


    async Register (nickname, password) {
        console.log('register:', nickname);
        const passwordHashed = await argon2.hash(password);

        if (await UserModel.findOne({nickname: nickname})) {
            throw new Error('Пользователь уже существует');
        }

        const userRecord = await UserModel.create({
            password: passwordHashed,
            nickname: nickname,
        });
        return {
            token: this.generateJWT(userRecord),
        }
        
    }
    generateJWT (user) {
        return jwt.sign({
            data: {
                _id:user._id,
                email: user.email,
                nickname: user.nickname,
            },
        },
        process.env.SECRETJWT, { expiresIn: '48h' });
    }
}