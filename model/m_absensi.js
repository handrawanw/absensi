const mongoose=require("mongoose");

const Schema=mongoose.Schema;

let MAbsensiSchema=new Schema({
    id_m_class_siswa:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'m_class_siswa'
    },
    status:{
        type:String,
        enum:['Hadir','Tidak hadir','Izin','Sakit','Lainnya'],
        default:'Hadir'
    },
    description:{
        type:String,
        default:'Siswa absensi harian'
    }
},{
    timestamps:{
        createdAt:"createdAt"
    }
});

module.exports=mongoose.models.m_absensi||mongoose.model("m_absensi",MAbsensiSchema);