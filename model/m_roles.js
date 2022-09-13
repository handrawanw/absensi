const mongoose=require("mongoose");

const Schema=mongoose.Schema;

let RolesSchema=new Schema({
    roles_name:{
        type:String,
        lowercase:true,
        required:["Name roles tidak boleh kosong",true]
    },
    description:{
        type:String,
        default:null
    }
},{
    timestamps:{
        createdAt:"createdAt"
    }
});

module.exports=mongoose.models.m_roles||mongoose.model("m_roles",RolesSchema);