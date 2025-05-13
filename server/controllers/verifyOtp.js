const User = require("../models/User")
const verifyOtp = async(req,res,next)=>{
    const{otp} = req.body
    try{
        const findUser = await User.findOne({'otp.otp':otp})
        if(!findUser){
            const error = new Error('invalid otp')
            error.statusCode = 400
            throw error
        }
        if(new Date(findUser.otp.sendTime).getTime() < new Date().getTime()){
            const error = new Error("otp expired");
            error.statusCode = 400;
            throw error;
        }
        findUser.otp.otp = null;
        await findUser.save();
        res.status(200).json({message:"otp verified",status:true});
    }
    catch(error){
        next(error)
    }
}
module.exports = verifyOtp;