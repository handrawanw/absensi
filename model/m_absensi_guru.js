const mongoose=require("mongoose");

const Schema=mongoose.Schema;

let MAbsensiGuruSchema=new Schema({
    id_m_users:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'m_users'
    },
    status:{
        type:String,
        enum:['Hadir','Tidak hadir','Izin','Sakit','Lainnya'],
        default:'Hadir'
    },
    description:{
        type:String,
        default:'Guru absensi harian'
    }
},{
    timestamps:{
        createdAt:"createdAt"
    }
});

module.exports=mongoose.models.m_absensi_guru||mongoose.model("m_absensi_guru",MAbsensiGuruSchema);