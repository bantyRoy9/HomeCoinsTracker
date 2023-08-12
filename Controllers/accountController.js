const HomeAccSchemaModel = require("../Model/Account_Schema/homeAcc");

exports.getEarns = async(req,res,next) => {
    try{
        const createTrans = await HomeAccSchemaModel.create(req.body)
        console.log(req.body);
        res.status(200).json({
            status:'true',
            createTrans
        })
    }catch(err){
        console.log(err);
    }
}