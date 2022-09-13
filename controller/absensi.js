const mongoose = require("mongoose");
const MClassSiswa = require("../model/m_class_siswa");
const MAbsensi = require("../model/m_absensi");
const MAbsensiGuru = require("../model/m_absensi_guru");
const MAbsensiMapel = require("../model/m_absensi_mapel");
const MJadwal = require("../model/m_jadwal");

const { processMainSub1 } = require("../worker/main");

class Absensi {

    static async absenSiswaHistory(req, res, next) {
        try {
            const { id } = req.decoded;

            MAbsensi.aggregate([
                {
                    $lookup:{
                        from:"m_class_siswas",
                        localField:"id_m_class_siswa",
                        foreignField:"_id",
                        as:"id_m_class_siswa"
                    }
                },
                {
                    $unwind:"$id_m_class_siswa"
                },
                {
                    $match:{
                        "id_m_class_siswa.id_m_users":mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $lookup:{
                        from:"m_users",
                        localField:"id_m_class_siswa.id_m_users",
                        foreignField:"_id",
                        as:"id_m_class_siswa.id_m_users"
                    }
                },
                {
                    $unwind:"$id_m_class_siswa.id_m_users"
                },
                {
                    $project:{
                        status:1,
                        description:1,
                        username:"$id_m_class_siswa.id_m_users.username",
                        fullname:"$id_m_class_siswa.id_m_users.fullname",
                        createdAt:1,
                        updatedAt:1,
                        __v:1
                    }
                }
            ]).then((data)=>{
                res.status(200).json({
                    message:"Successfull",
                    payload:data
                })
            }).catch(next);

        } catch (err) {
            res.status(500).json({
                message: err.message,
                payload: null
            });
        }
    }

    static async absenGuruHistory(req, res, next) {
        try {
            const { id } = req.decoded;

            MAbsensiGuru.aggregate([
                {
                    $match:{
                        "id_m_users":mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $lookup:{
                        from:"m_users",
                        localField:"id_m_users",
                        foreignField:"_id",
                        as:"id_m_users"
                    }
                },
                {
                    $unwind:"$id_m_users"
                },
                {
                    $project:{
                        status:1,
                        description:1,
                        username:"$id_m_users.username",
                        fullname:"$id_m_users.fullname",
                        createdAt:1,
                        updatedAt:1,
                        __v:1
                    }
                }
            ]).then((data)=>{
                res.status(200).json({
                    message:"Successfull",
                    payload:data
                })
            }).catch(next);

        } catch (err) {
            res.status(500).json({
                message: err.message,
                payload: null
            });
        }
    }

    static async absenSiswa(req, res) {
        try {
            const { id } = req.decoded;
            const { status } = req.body;
            let dataMapping = await MClassSiswa.findOne({ id_m_users: id });
            if (dataMapping) {
                let _1days = 86400000;
                let dateNow = Date.now() - (Date.now() % _1days);
                let existsAbsensi = await MAbsensi.findOne({ id_m_class_siswa: dataMapping._id, createdAt: { $gte: new Date(dateNow), $lte: new Date(dateNow + _1days) } });
                if (!existsAbsensi) {
                    await MAbsensi.create({ id_m_class_siswa: dataMapping._id, status });
                    res.status(201).json({
                        message: `Anda berhasil absen harian`,
                        payload: null
                    });
                } else {
                    res.status(201).json({
                        message: "Anda sudah absen harian",
                        payload: null
                    });
                }
            } else {
                res.status(500).json({
                    message: "Anda belum terdaftar dikelas manapun, silakan hubungi administrator",
                    payload: null
                })
            }

        } catch (err) {
            res.status(500).json({
                message: err.message,
                payload: null
            });
        }
    }

    static async absenSiswaMapel(req, res) {
        try {
            const { id } = req.decoded;
            let dataMapping = await MClassSiswa.findOne({ id_m_users :id });
            if (!dataMapping) {
                res.status(500).json({
                    message: "Anda belum terdaftar dikelas manapun, silakan hubungi administrator",
                    payload: null
                })
            } else {
                let date = new Date();
                let formatValue = parseFloat(`${date.getHours()}.${date.getMinutes()}`);
                let dataJadwal = await MJadwal.findOne({ id_m_class: dataMapping.id_m_class, startTime: { $lte: formatValue }, endTime: { $gte: formatValue } })
                    .populate({
                        path: "id_m_mapel",
                        select: ["nama_mapel"]
                    });
                let _1days = 86400000;
                let dateNow = Date.now() - (Date.now() % _1days);
                let existsAbsensi = await MAbsensiMapel.findOne({ id_m_class_siswa: dataMapping._id, createdAt: { $gte: new Date(dateNow), $lte: new Date(dateNow + _1days) } });
                if (!existsAbsensi) {
                    if (dataJadwal) {
                        await MAbsensiMapel.create({ id_m_class_siswa: dataMapping._id, id_m_mapel: dataJadwal.id_m_mapel._id });
                        res.status(201).json({
                            message: `Anda berhasil absen di mapel ${dataJadwal.id_m_mapel.nama_mapel}, silakan tunggu persetujuan guru`,
                            payload: null
                        });
                    } else {
                        res.status(201).json({
                            message: "Jadwal mapel tidak tersedia",
                            payload: null
                        });
                    }
                } else {
                    res.status(201).json({
                        message: `Anda sudah mengisi absen mapel ini`,
                        payload: null
                    });
                }
                // di jeda 10 detik
            }

        } catch (err) {
            res.status(500).json({
                message: err.message,
                payload: null
            });
        }
    }

    static async approvedAbsenSiswa(req, res) {
        try {
            let { id_m_absensi_mapel, id_m_mapel } = req.params;
            let match = { approved_teacher: false };
            let isObjectID = (value) => mongoose.Types.ObjectId.isValid(value);
            if (isObjectID(id_m_absensi_mapel)) {
                match["id_m_mapel"] = id_m_mapel;
            }

            if (isObjectID(id_m_absensi_mapel)) {
                match["_id"] = id_m_absensi_mapel;
            }


            let updated = await MAbsensiMapel.updateMany(match, { approved_teacher: true }, { new: true });

            res.status(200).json({
                message: `Absen berhasil di approved ${updated.nModified}`,
                payload: null
            });

        } catch (error) {
            res.status(500).json({
                message: error.message,
                payload: null
            });
        }
    }

    static async absenGuru(req, res) {
        try {
            const { id } = req.decoded;
            const { status } = req.body;
            let _1days = 86400000;
            let dateNow = Date.now() - (Date.now() % _1days);
            let existsAbsensi = await MAbsensiGuru.findOne({ id_m_users:id, createdAt: { $gte: new Date(dateNow), $lte: new Date(dateNow + _1days) } });
            if (!existsAbsensi) {
                await MAbsensiGuru.create({ id_m_users: id, status });
                res.status(201).json({
                    message: `Anda berhasil absen harian`,
                    payload: null
                });
            } else {
                res.status(201).json({
                    message: "Anda sudah absen harian",
                    payload: null
                });
            }

        } catch (err) {
            res.status(500).json({
                message: err.message,
                payload: null
            });
        }
    }

}

module.exports = Absensi;