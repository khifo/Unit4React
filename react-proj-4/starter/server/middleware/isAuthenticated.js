require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization') // require authorization for login

        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        } // Error in login

        let token // authentication login

        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        } // verify the login with status code

        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        } // new error if authentication doesn't match

        next()
    }
}