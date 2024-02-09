const jwt = require('jsonwebtoken');

// Checks if user is authenticated or not 
exports.isAuthenticatedUser = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    const token =authHeader.split(' ')[1]

    jwt.verify(token, "RF_+d&RYCPiC-~&Q_sE?^Z1dxq|{i<k.Mcc13&]I-*TZb(O:8=m2m]SE0HGv)`R.XH@Z", function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'unAuthorized Access' });
        }
        if (decoded) {
            req.id = decoded.id;
            next()
        }
    });
}