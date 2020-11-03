const jwt = require('jsonwebtoken')
const User = require('../models/users')

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization')
            //console.log(token)

        const decoded = jwt.verify(token, JWTSECRET)
            //  console.log(decoded)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(403).send({ Error: 'Please Authenticate' })
    }
}
module.exports = auth