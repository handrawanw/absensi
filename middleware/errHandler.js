module.exports=(err,req,res,next)=>{
    let message=err.message||"Internal server error";

    res.status(500).json({
        message,
        payload:null
    });
};