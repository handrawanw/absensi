let MUsersRoles=require("../model/m_users_roles");
let mongoose=require("mongoose");

class AuthRole {

    static AuthRoles({roles_name=[]}){
        return async (req,res,next)=>{
            // console.log(req.decoded,roles_name)
            let {id}=req.decoded;
            let data=await MUsersRoles.aggregate([
                {
                    $match:{
                        id_m_users:{
                            $eq:mongoose.Types.ObjectId(id)
                        }
                    }
                },
                {
                    $lookup:{
                        from:'m_roles',
                        localField:'id_m_roles',
                        foreignField:'_id',
                        as:'id_m_roles'
                    }
                },
                {
                    $group:{
                        _id:"$_id",
                        id_m_roles:{
                            $push:'$id_m_roles.roles_name'
                        },
                        id_m_users:{
                            $first:'$id_m_users'
                        },
                        createdAt:{
                            $first:"$createdAt"
                        },
                        updatedAt:{
                            $first:"$updatedAt"
                        },
                        __v:{
                            $first:"$__v"
                        }
                    }
                },{
                    $unwind:"$id_m_roles"
                }
            ]);
            if(data.length>0){
                let status=false;
                for(let roles of data[0].id_m_roles){
                    // console.log(roles_name.includes(roles),roles_name,roles)
                    if(roles_name.includes(roles)){
                        status=true;
                        break;
                    }else{
                        status=false;
                    }
                }
                if(!status){
                    res.status(403).json({
                        message:"Permission denied",
                        payload:null
                    })
                }else{
                    next();
                }
            }
        };
    }

}

module.exports=AuthRole;