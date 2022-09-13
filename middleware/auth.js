const {verifyToken}=require("../helpers/jwttoken");

class Auth {

    static AuthJWT(req,res,next){
        let token=req.headers.token;
        verifyToken({token}).then((payload)=>{
            req.decoded=payload;
            next();
        }).catch((err)=>{
            // console.log(JSON.stringify(err));
            let log_error={
                "err1":err.name=="JsonWebTokenError"&&err.message.toLowerCase()=="jwt must be provided"
            };
            if(log_error['err1']){
                res.status(401).json({
                    message:"Anda harus login terlebih dahulu",
                    status:401
                });
            }else{
                res.status(401).json({
                    message:err.message,
                    status:401
                });
            }
        });
    }

}

module.exports=Auth;