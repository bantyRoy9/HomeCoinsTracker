const User = require("../Model/User_Schema/userSchema")

exports.getUserDetails = async(req,res,next)=>{
    try{
        const user = await User.findById(req.user.id).populate({path:'totalEarn'});
        res.status(200).json({
            status:true,
            msg:'user find successfull',
            data: user
        })
    }catch(err){
        res.status(500).json({
            status:false,
            msg:err,
            data:null
        })
    }
}
// exports.loginUser = async(req,res,next)=>{
//     try{
//         const user = await User.create(req.body);
//         res.status(200).json({
//             status:true,
//             msg:'user create successfull',
//             data: user
//         })
//     }catch(err){
//         res.status(500).json({
//             status:false,
//             msg:err,
//             data:null
//         })
//     }
// }