const jwt = require('jsonwebtoken');

module.exports = (user)=>{
    return jwt.sign({ id: user._id }, "RF_+d&RYCPiC-~&Q_sE?^Z1dxq|{i<k.Mcc13&]I-*TZb(O:8=m2m]SE0HGv)`R.XH@Z", {
        expiresIn: "7d"
    })
}