const express=require("express");
const Router=express.Router();

const {absenSiswa,absenSiswaMapel,approvedAbsenSiswa,absenGuru,absenSiswaHistory,absenGuruHistory} = require("../controller/absensi");

const {AuthJWT} = require("../middleware/auth");
const {AuthRoles} = require("../middleware/authRole");

Router.get("/siswa",AuthJWT,AuthRoles({roles_name:["siswa"]}),absenSiswaHistory);
Router.get("/guru",AuthJWT,AuthRoles({roles_name:["guru"]}),absenGuruHistory);

Router.post("/siswa",AuthJWT,AuthRoles({roles_name:["siswa"]}),absenSiswa);
Router.post("/guru",AuthJWT,AuthRoles({roles_name:["guru"]}),absenGuru);
Router.post("/siswa/mapel/:id_m_users",AuthJWT,AuthRoles({roles_name:["siswa"]}),absenSiswaMapel);

Router.patch("/siswa/approved/:id_m_absensi_mapel/:id_m_mapel",AuthJWT,AuthRoles({roles_name:["guru"]}),approvedAbsenSiswa);

module.exports=Router;