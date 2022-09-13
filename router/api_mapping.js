const express=require("express");
const Router=express.Router();

const {create} = require("../controller/mapping");

const {AuthJWT} = require("../middleware/auth");
const {AuthRoles} = require("../middleware/authRole");

Router.post("/siswa/class",AuthJWT,AuthRoles({roles_name:["superadmin"]}),create);

module.exports=Router;