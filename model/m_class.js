const mongoose=require("mongoose");

const Schema=mongoose.Schema;

let MClassSchema=new Schema({
    class_name:{
        type:String,
        lowercase:true,
        required:["Class name tidak boleh kosong",true]
    },
    grade_name:{
        type:String,
        uppercase:true,
        required:["Grade name tidak boleh kosong",true]
    },
    description:{
        type:String,
        default:null
    },
    id_m_users:{
         // id walikelas
         type:mongoose.Schema.Types.ObjectId,
         ref:'m_users'
    },
},{
    timestamps:{
        createdAt:"createdAt"
    }
});

module.exports=mongoose.models.m_class||mongoose.model("m_class",MClassSchema);