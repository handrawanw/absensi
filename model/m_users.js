const mongoose=require("mongoose");

const Schema=mongoose.Schema;

let UserSchema=new Schema({
    username:{
        type:String,
        lowercase:true,
        required:["Username tidak boleh kosong",true]
    },
    email:{
        type:String,
        lowercase:true,
        required:["Email tidak boleh kosong",true]
    },
    password:{
        type:String,
        required:["Password tidak boleh kosong",true]
    },
    fullname:{
        type:String,
        required:["Nama lengkap tidak boleh kosong",true]
    },
    verification:{
        type:Boolean,
        default:false
    }
},{
    timestamps:{
        createdAt:"createdAt"
    }
});

module.exports=mongoose.models.m_users||mongoose.model("m_users",UserSchema);