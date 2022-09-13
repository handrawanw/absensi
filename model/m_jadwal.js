const mongoose=require("mongoose");

const Schema=mongoose.Schema;

let MJadwal=new Schema({
    id_m_mapel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'m_mapel'
    },
    id_m_class:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'m_class'
    },
    startTime:{
        type:Number,
        default:0
    },
    endTime:{
        type:Number,
        default:0
    },
},{
    timestamps:{
        createdAt:"createdAt"
    }
});

module.exports=mongoose.models.m_jadwal||mongoose.model("m_jadwal",MJadwal);