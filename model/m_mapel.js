const mongoose=require("mongoose");

const Schema=mongoose.Schema;

let MMapel=new Schema({
    nama_mapel:{
        type:String,
        default:null
    },
    description:{
        type:String,
        default:null
    },
    nilai_kkm:{
        type:Number,
        default:null
    },
    id_m_users:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"m_users"
    }
},{
    timestamps:{
        createdAt:"createdAt"
    }
});

module.exports=mongoose.models.m_mapel||mongoose.model("m_mapel",MMapel);