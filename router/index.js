const express=require("express");
const Router=express.Router();

let api_users=require("./api_users");
let api_class=require("./api_class");
let api_mapping=require("./api_mapping");
let api_absensi=require("./api_absensi");
let api_mapel=require("./api_mapel");
let api_jadwal=require("./api_jadwal");

Router.use("/users",api_users);
Router.use("/class",api_class);
Router.use("/mapping",api_mapping);
Router.use("/absensi",api_absensi);
Router.use("/mapel",api_mapel);
Router.use("/jadwal",api_jadwal);

module.exports=Router;