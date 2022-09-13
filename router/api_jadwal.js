const express=require("express");
const Router=express.Router();

const {createJadwal,getJadwal,getMyJadwal,updateJadwal,deleteJadwal} = require("../controller/jadwal");

const {AuthJWT} = require("../middleware/auth");
const {AuthRoles} = require("../middleware/authRole");

Router.get("/",AuthJWT,AuthRoles({roles_name:['superadmin']}),getJadwal);
Router.get("/:id",AuthJWT,AuthRoles({roles_name:['superadmin']}),getMyJadwal);

Router.post("/create",AuthJWT,AuthRoles({roles_name:["superadmin"]}),createJadwal);

Router.patch("/edit/:id",AuthJWT,AuthRoles({roles_name:['superadmin']}),updateJadwal);

Router.delete("/del/:id",AuthJWT,AuthRoles({roles_name:['superadmin']}),deleteJadwal);

module.exports=Router;