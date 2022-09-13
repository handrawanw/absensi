const mongoose=require("mongoose");

const Schema=mongoose.Schema;

let MUsersRolesSchema=new Schema({
    id_m_users:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'m_users'
    },
    id_m_roles:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'m_roles'
    }
},{
    timestamps:{
        createdAt:"createdAt"
    }
});

module.exports=mongoose.models.m_users_roles||mongoose.model("m_users_roles",MUsersRolesSchema);