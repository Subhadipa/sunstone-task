const jwt = require('jsonwebtoken');

module.exports.tokenCheck = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(" ")[1];
        if (token) {
            let validToken = jwt.verify(token, 'subha')
            //console.log(validToken)
            if (validToken) {
                req.validToken = validToken;//(key=value)
                next();
            }
            else {
                res.status(401).send({ status: false, message: 'Token not valid!' })
            }
        }
        else {
            res.status(401).send({ status: false, message: 'Mandatory header is missing!' })
        }
    }
    catch (error) {
        res.status(500).send({ message: "Failed", error: error.message });
    }
}

