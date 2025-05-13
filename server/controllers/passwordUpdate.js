const User = require('../models/User')
const bcrypt = require('bcryptjs')
const updatePassword = async(req,res,next)=>{
    const{password,confirmPassword,token}=req.body
    try{
        const findUser = await User.findOne({'otp.token':token})
        if(!findUser){
            const error = new Error('something went wrong')
            error.statusCode = 400
            throw error

        }
        if(new Date(findUser.otp.sendTime).getTime()+5*60*1000<new Date().getTime()){
            const error = new Error("something went wrong")
            error.statusCode = 400;
            throw error;
        }
        if(password !== confirmPassword){
            const error = new Error("password does not match");
            error.statusCode = 400;
            throw error;
        }
        const hashedPassword = await bcrypt.hash(password,10)
        findUser.password = hashedPassword
        findUser.otp.token = null;
        await findUser.save()
        res.status(200).json({message:'password updated successfully',status:true})
    }
    catch(error){
        next(error)
    }
}
module.exports = updatePassword
 
