const mongoose=require("mongoose");
const MClassSiswa=require("../model/m_class_siswa");
const MUsersRoles=require("../model/m_users_roles");
const MClass=require("../model/m_class");

class MappingData {

    static async create(req,res,next){
        try {
            const {id_m_users,id_m_class}=req.body;
            let data=await MUsersRoles.findOne({id_m_users}).populate("id_m_roles").populate("id_m_users");
            let dataClass=await MClass.findOne({_id:id_m_class});
            if(!data){
                return res.status(500).json({
                    message:"Maaf user ini tidak memiliki role akses",
                    payload:null
                });
            }else if(!dataClass){
                return res.status(500).json({
                    message:"Data kelas tidak ditemukan",
                    payload:null
                });
            }else{
                if(data.id_m_roles){
                    if(data.id_m_roles.roles_name=='siswa'){
                        let existsMapping=await MClassSiswa.findOne({id_m_users});
                        if(!existsMapping){
                            let dataMapping=await MClassSiswa.create({id_m_users,id_m_class});
                            return res.status(201).json({
                                message:"Successfull",
                                payload:dataMapping
                            });
                        }else{
                            return res.status(500).json({
                                message:`Maaf user ini sudah terdaftar dikelas tujuan`,
                                payload:null
                            });
                        }
                    }else{
                        return res.status(500).json({
                            message:`Maaf user ${data.id_m_users.fullname} ini bukan sebagai roles siswa`,
                            payload:null
                        });
                    }
                }else{
                    return res.status(500).json({
                        message:`Maaf role dengan id ini ${id_m_roles} sudah terhapus`,
                        payload:null
                    });
                }
            }
        } catch (err) {
            return res.status(500).json({
                message:err.message,
                payload:null
            });
        }
    }

}

module.exports=MappingData;