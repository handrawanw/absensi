const express=require("express");
const Router=express.Router();

const {Login,Register,VerifikasiUsers,getAll,siswaClass} = require("../controller/users");

const {AuthJWT} = require("../middleware/auth");
const {AuthRoles} = require("../middleware/authRole");

Router.get("/",AuthJWT,AuthRoles({roles_name:['superadmin']}),getAll);
Router.get("/class",AuthJWT,AuthRoles({roles_name:['guru']}),siswaClass);

Router.post("/login",Login);
Router.post("/register",Register);

Router.patch("/verifikasi/:id_m_users",AuthJWT,AuthRoles({roles_name:["superadmin"]}),VerifikasiUsers);

module.exports=Router;