const mongoose=require("mongoose");

const Schema=mongoose.Schema;

let MAbsensiMapelSchema=new Schema({
    id_m_class_siswa:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'m_class_siswa'
    },
    id_m_mapel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'m_mapel'
    },
    approved_teacher:{
        type:Boolean,
        default:false
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

module.exports=mongoose.models.m_absensi_mapel||mongoose.model("m_absensi_mapel",MAbsensiMapelSchema);