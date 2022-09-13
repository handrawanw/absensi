const express=require("express");
const Router=express.Router();

const {createMapel,getMapel,getMyMapel,updateMapel,deleteMapel} = require("../controller/mapel");

const {AuthJWT} = require("../middleware/auth");
const {AuthRoles} = require("../middleware/authRole");

Router.get("/",AuthJWT,AuthRoles({roles_name:['superadmin']}),getMapel);
Router.get("/:id",AuthJWT,AuthRoles({roles_name:['superadmin']}),getMyMapel);

Router.post("/create",AuthJWT,AuthRoles({roles_name:["superadmin"]}),createMapel);

Router.patch("/edit/:id",AuthJWT,AuthRoles({roles_name:['superadmin']}),updateMapel);

Router.delete("/del/:id",AuthJWT,AuthRoles({roles_name:['superadmin']}),deleteMapel);

module.exports=Router;