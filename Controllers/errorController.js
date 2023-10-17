const AppError = require('./../Utils/appError')

const handleCaseErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400)
};


const sendErrorDev = (err,req,res,next)=>{
    if(req.originalUrl.startsWith('/api')){
        return res.status(err.statusCode).json({
            status: err.status,
            statusCode : err.statusCode,
            msg: err.message,
            stack: err.stack
        });
    }else{
        return res.status(err.statusCode).render('error',{
            title:'Something Went Wrong!',
            msg:err.message
        });
    }
};
module.exports = (err,req,res,next)=>{
    console.log("err",process.env.NODE_ENV,'process.env.NODE_ENV',err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || false;

    if(process.env.NODE_ENV === 'development'){
        sendErrorDev(err,req,res);
    }else if(process.env.NODE_ENV ==='production'){
        let error = {...err}
        error.message = err.message;
        
        if(error.name === 'CastError') error = handleCaseErrorDB(error);

        return res.status(err.statusCode).json({
            status: err.status,
            statusCode : err?.statusCode,
            msg: err.message
        });
        
    }
}