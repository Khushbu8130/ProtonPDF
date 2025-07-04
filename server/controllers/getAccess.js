const User = require('../models/User')
const getAccess = async(req,res,next)=>{
    const {token} = req.body
    try{
        const findUser = await User.findOne({'otp.token':token})
        if(!findUser || !findUser.otp.token){
            const error = new Error('something went wrong')
            error.statusCode = 400
            throw error

        }
        res.status(200).json({message:'success',status:true})
    }catch(error){
        next(error)
            
        }
    }
module.exports = getAccess