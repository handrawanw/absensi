const MJadwal=require("../model/m_jadwal");
let {converterJadwalTime} = require("../helpers/functions");

class CRUDClass {

    static createJadwal(req,res,next){
        const {startTime,endTime,description,id_m_mapel,id_m_class}=req.body;
        
        MJadwal.create({startTime:parseFloat(startTime),endTime:parseFloat(endTime),description,id_m_mapel,id_m_class}).then((data)=>{
            res.status(201).json({
                message:"Successfull created",
                payload:data
            });
        }).catch(next);
    }

    static updateJadwal(req,res,next){
        const {id}=req.params;
        const {startTime,endTime,description,id_m_mapel,id_m_class}=req.body;

        MJadwal.findByIdAndUpdate({_id:id},{startTime:parseFloat(startTime),endTime:parseFloat(endTime),description,id_m_mapel,id_m_class},{new:true}).then((data)=>{
            res.status(200).json({
                message:"Successfull updated",
                payload:data
            });
        }).catch(next);
    }

    static deleteJadwal(req,res,next){
        const {id}=req.params;

        MJadwal.findByIdAndDelete({_id:id}).then((data)=>{
            res.status(200).json({
                message:"Successfull deleted",
                payload:data
            });
        }).catch(next);
    }

    static getJadwal(req,res,next){
        MJadwal.find({}).populate({
            path:"id_m_mapel",
            select:["nama_mapel","description","nilai_kkm"],
            populate:{
                path:"id_m_users",
                select:["username","fullname","email"]
            }
        }).populate({
            path:"id_m_class",
            select:["class_name","grade_name","description"],
            populate:{
                path:"id_m_users",
                select:["username","fullname","email"]
            }
        }).then((data)=>{
            for(let item of data){
                item.startTime=converterJadwalTime({time:item.startTime});
                item.endTime=converterJadwalTime({time:item.endTime});
            }
            res.status(200).json({
                message:"Successfull",
                payload:data
            });
        }).catch(next);
    }

    static getMyJadwal(req,res,next){
        let {id}=req.params;
        MJadwal.findOne({_id:id}).populate({
            path:"id_m_mapel",
            select:["nama_mapel","description","nilai_kkm"],
            populate:{
                path:"id_m_users",
                select:["username","fullname","email"]
            }
        }).populate({
            path:"id_m_class",
            select:["class_name","grade_name","description"],
            populate:{
                path:"id_m_users",
                select:["username","fullname","email"]
            }
        }).then((data)=>{
            res.status(200).json({
                message:"Successfull",
                payload:data
            });
        }).catch(next);
    }

}

module.exports=CRUDClass;