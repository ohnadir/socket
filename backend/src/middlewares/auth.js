const jwt = require('jsonwebtoken');

// Checks if user is authenticated or not 
exports.isAuthenticatedUser = async(req, res, next) => {

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({message: 'UnAuthorized access'})
    }
    const decoded = jwt.verify(token, "RF_+d&RYCPiC-~&Q_sE?^Z1dxq|{i<k.Mcc13&]I-*TZb(O:8=m2m]SE0HGv)`R.XH@Z");

    if(!decoded){
        return res.status(403).send({ message: 'Forbidden access' })
    }else{
        req.id = decoded.id;
        next()
    }
}