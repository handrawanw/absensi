const mongoose=require("mongoose");
const UsersModel=require("../model/m_users");
const RolesModel=require("../model/m_roles");
const MUsersRoles=require("../model/m_users_roles");
const MClassSiswa=require("../model/m_class_siswa");

const {checkPass,hashPass}=require("../helpers/hash");
const {generateToken}=require("../helpers/jwttoken");

class Users {

    static Login(req,res,next){
        let {email,password}=req.body;

        UsersModel.findOne({
            email
        }).then(async(data)=>{
            if(data){
                let ValidPassword = checkPass(password, data.password);
                if (!ValidPassword) {
                    res.status(500).json({
                        message:"Username atau password salah",
                        status:500
                    });
                }else if(!data.verification){
                    res.status(500).json({
                        message:"User belum diverifikasi",
                        status:500
                    });
                } else {
                    let Payload = await generateToken({
                        id: data._id,
                        username: data.username,
                        fullname: data.fullname
                    });
                    res.status(200).json({
                        message: "Login berhasil",
                        payload:{
                            id:data._id,
                            username: data.username,
                            fullname: data.fullname
                        },
                        token:Payload
                    });
                }
            }else{
                res.status(500).json({
                    message:"Username atau password salah",
                    status:500
                });
            }
        }).catch(next);
    }

    static async Register(req,res,next){
        try {
            const { username, password, fullname, email, id_m_roles } = req.body;
            let Users=await UsersModel.findOne({email});
            let Roles=await RolesModel.findOne({_id:id_m_roles});
            if(Users){
                res.status(500).json({
                    message: "Email telah terdaftar",
                    payload:null
                });
            }else if(!Roles){
                res.status(500).json({
                    message: "Role tidak terdaftar",
                    payload:null
                });
            }else{
                let Account = await UsersModel.create({ username, password, fullname, email });
                await MUsersRoles.create({
                    id_m_users:Account._id,
                    id_m_roles:id_m_roles
                });
                if (Account) {
                    Account.password = hashPass(Account.password);
                    let StatusSave = await Account.save();
                    res.status(200).json({
                        message: "Successfull Register",
                        payload: StatusSave
                    });
                } else {
                    res.status(500).json({
                        message:"Username gagal terdaftar",
                        payload:null
                    });
                }
            }
        }catch(err){
            res.status(500).json({
                message:err.message,
                payload:null
            });
        }
    }

    static async getAll(req,res,next){
        MUsersRoles.find({}).populate({
            path:"id_m_users",
            select:["-password"]
        }).populate({
            path:"id_m_roles"
        }).then((data)=>{
            res.status(200).json({
                message:"Successfull",
                payload:data
            });
        }).catch(next);
    }

    static async VerifikasiUsers(req,res,next){
        try {
            let {id_m_users}=req.params;
            let {verification}=req.body;
            let CheckUsers=await UsersModel.findByIdAndUpdate({_id:id_m_users},{verification},{new:true});
            res.status(200).json({
                message:"Successfull",
                payload:CheckUsers
            })
        } catch (err) {
            res.status(500).json({
                message:err.message,
                status:500
            });
        }
    }

    static async siswaClass(req,res,next){
        try {
            const {id}=req.decoded;
            let match={};

            let isObjectID=mongoose.Types.ObjectId.isValid(id)
            if(isObjectID){
                match={
                    "kelas.id_m_users._id":mongoose.Types.ObjectId(id)
                };
            }

            let payload=await MClassSiswa.aggregate([
                {
                    $lookup:{
                        from:"m_users_roles",
                        localField:"id_m_users",
                        foreignField:"id_m_users",
                        as:"id_m_users"
                    }
                },
                {
                    $unwind:"$id_m_users"
                },
                {
                    $lookup:{
                        from:"m_users",
                        localField:"id_m_users.id_m_users",
                        foreignField:"_id",
                        as:"id_m_users.id_m_users"
                    }
                },{
                    $unwind:"$id_m_users.id_m_users"
                },
                {
                    $lookup:{
                        from:"m_roles",
                        localField:"id_m_users.id_m_roles",
                        foreignField:"_id",
                        as:"id_m_users.id_m_roles"
                    }
                },{
                    $unwind:"$id_m_users.id_m_roles"
                },
                {
                    $lookup:{
                        from:"m_classes",
                        localField:"id_m_class",
                        foreignField:"_id",
                        as:"id_m_class"
                    }
                },{
                    $unwind:"$id_m_class"
                },
                {
                    $lookup:{
                        from:"m_users",
                        localField:"id_m_class.id_m_users",
                        foreignField:"_id",
                        as:"id_m_class.id_m_users"
                    }
                },{
                    $unwind:"$id_m_class.id_m_users"
                },
                {
                    $project:{
                        _id:"$id_m_users.id_m_users._id",
                        username:"$id_m_users.id_m_users.username",
                        email:"$id_m_users.id_m_users.email",
                        fullname:"$id_m_users.id_m_users.fullname",
                        roles_name:"$id_m_users.id_m_roles.roles_name",
                        kelas:"$id_m_class"
                    }
                },
                {
                    $match:match
                },
                {
                    $project:{
                        _id:1,
                        username:1,
                        email:1,
                        fullname:1,
                        roles_name:1,
                        "kelas._id":1,
                        "kelas.grade_name":1,
                        "kelas.class_name":1,
                        "kelas.wali_kelas_id":"$kelas.id_m_users._id",
                        "kelas.wali_kelas":"$kelas.id_m_users.fullname"
                    }
                },
            ]);

            res.status(200).json({
                message:"Successfull",
                payload
            });
            
        } catch (error) {
            res.status(500).json({
                message:error.message,
                payload:null
            });
        }
    }

}

module.exports=Users;