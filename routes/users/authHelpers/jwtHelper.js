const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressJwt = require('express-jwt')
const config = require('./jwtConfig')
const User = require('../model/User')

const comparePassword = async (incomingPassword, userPassword)  => {
    try {
        let comparedPassword = await bcrypt.compare(incomingPassword, userPassword);

    if (comparedPassword) {
        return comparedPassword;
    } else {
        throw 409;
    }
} catch (e) {
    return e;
}
}

function createJwtToken(user) {
    let payload;
    payload = {
        email: user.email,
        _id: user._id,
        username: user.username,
    };
    let jwtToken = jwt.sign(payload, process.env.JWT_USER_SECRET_KEY, {
        expiresIn: "1m",
    });
    let jwtRefreshToken = jwt.sign(
    { _id: user._id },
        process.env.JWT_USER_REFRESH_SECRET_KEY,
    {
        expiresIn: "7d",
    }
    );
    return {
        jwtToken,
        jwtRefreshToken,
    };
}



const checkAuthMiddleware = expressJwt({
    secret: process.env.JWT_USER_SECRET_KEY || config["JWT_USER_SECRET_KEY"],
    userProperty: "auth",
});



    const findUserIfUserExist = async (req, res, next) => {
        const { _id } = req.auth;
        try {
        const foundUser = await User.findById({_id: _id}).select('-__v -password');
        req.profile = foundUser;
        next();
        } catch (e) {
        return res.status(404).json({
            error: "User does not exist",
        });
        }

        const hasAuthorization = (req, res, next) => {
                 //check req.profile with req.auth if they match
                //....
                const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
                if (!authorized) {
                return res.status("403").json({
                    error: "User is not authorized",
                });
                } else {
                next();
                }
            };

module.exports = {
    comparePassword,
    createJwtToken,
    hasAuthorization,
    findUserIfUserExist,
    checkAuthMiddleware
};
    }