const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });



exports.isAuth = (req, res, next) => {
    if (!req.cookies.jwt) {
        console.log('!token');
        return res.redirect('/login');
    }

    

    try {
        const secretKey = process.env.SECRETJWT;
        const token = req.cookies.jwt.token;
        const user = jwt.verify(token, secretKey);
        
        req.user = user;
        console.log('isAuth true');
        
        next();
    } catch (error) {
        console.log(error);
        res.redirect('/login');
    }
};

