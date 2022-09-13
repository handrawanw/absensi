const mongoose=require("mongoose");

const Schema=mongoose.Schema;

let MClassSiswaSchema=new Schema({
    id_m_users:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'m_users'
    },
    id_m_class:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'m_class'
    }
},{
    timestamps:{
        createdAt:"createdAt"
    }
});

module.exports=mongoose.models.m_class_siswa||mongoose.model("m_class_siswa",MClassSiswaSchema);