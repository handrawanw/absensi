const MMapel=require("../model/m_mapel");

class CRUDClass {

    static createMapel(req,res,next){
        const {nama_mapel,nilai_kkm,description,id_m_users}=req.body;
        
        MMapel.create({nama_mapel,nilai_kkm,description,id_m_users}).then((data)=>{
            res.status(201).json({
                message:"Successfull created",
                payload:data
            });
        }).catch(next);
    }

    static updateMapel(req,res,next){
        const {id}=req.params;
        const {nama_mapel,nilai_kkm,description,id_m_users}=req.body;

        MMapel.findByIdAndUpdate({_id:id},{nama_mapel,nilai_kkm,description,id_m_users},{new:true}).then((data)=>{
            res.status(200).json({
                message:"Successfull updated",
                payload:data
            });
        }).catch(next);
    }

    static deleteMapel(req,res,next){
        const {id}=req.params;

        MMapel.findByIdAndDelete({_id:id}).then((data)=>{
            res.status(200).json({
                message:"Successfull deleted",
                payload:data
            });
        }).catch(next);
    }

    static getMapel(req,res,next){
        MMapel.find({}).populate({
            path:"id_m_users",
            select:["username","fullname","email","createdAt","updatedAt","__v"]
        }).then((data)=>{
            res.status(200).json({
                message:"Successfull",
                payload:data
            });
        }).catch(next);
    }

    static getMyMapel(req,res,next){
        let {id}=req.params;
        MMapel.findOne({_id:id}).populate({
            path:"id_m_users",
            select:["username","fullname","email","createdAt","updatedAt","__v"]
        }).then((data)=>{
            res.status(200).json({
                message:"Successfull",
                payload:data
            });
        }).catch(next);
    }

}

module.exports=CRUDClass;