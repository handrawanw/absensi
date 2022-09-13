const MClass=require("../model/m_class");

class CRUDClass {

    static createClass(req,res,next){
        const {class_name,grade_name,description,id_m_users}=req.body;
        
        MClass.create({class_name,grade_name,description,id_m_users}).then((data)=>{
            res.status(201).json({
                message:"Successfull created",
                payload:data
            });
        }).catch(next);
    }

    static updateClass(req,res,next){
        const {id}=req.params;
        const {class_name,grade_name,description,id_m_users}=req.body;

        MClass.findByIdAndUpdate({_id:id},{class_name,grade_name,description,id_m_users},{new:true}).then((data)=>{
            res.status(200).json({
                message:"Successfull updated",
                payload:data
            });
        }).catch(next);
    }

    static deleteClass(req,res,next){
        const {id}=req.params;

        MClass.findByIdAndDelete({_id:id}).then((data)=>{
            res.status(200).json({
                message:"Successfull deleted",
                payload:data
            });
        }).catch(next);
    }

    static getClass(req,res,next){
        MClass.find({}).populate({
            path:"id_m_users",
            select:["username","fullname","email","createdAt","updatedAt","__v"]
        }).then((data)=>{
            res.status(200).json({
                message:"Successfull class",
                payload:data
            });
        }).catch(next);
    }

    static getMyClass(req,res,next){
        let {id}=req.params;
        MClass.findOne({_id:id}).populate({
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