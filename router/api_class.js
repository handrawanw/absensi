const express=require("express");
const Router=express.Router();

const {createClass,getClass,getMyClass,updateClass,deleteClass} = require("../controller/class");

const {AuthJWT} = require("../middleware/auth");
const {AuthRoles} = require("../middleware/authRole");

Router.get("/",AuthJWT,AuthRoles({roles_name:['superadmin']}),getClass);
Router.get("/:id",AuthJWT,AuthRoles({roles_name:['superadmin']}),getMyClass);

Router.post("/create",AuthJWT,AuthRoles({roles_name:["superadmin"]}),createClass);

Router.patch("/edit/:id",AuthJWT,AuthRoles({roles_name:['superadmin']}),updateClass);

Router.delete("/del/:id",AuthJWT,AuthRoles({roles_name:['superadmin']}),deleteClass);

module.exports=Router;