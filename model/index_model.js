let m_users=require("./m_users");
let m_roles=require("./m_roles");
let m_users_roles=require("./m_users_roles");
let m_class=require("./m_class");

let mongoose=require("mongoose");

async function refresh(){
    // console.log("Starting ...");
    let array=[
        {
            class_name:"",
            grade_name:"",
            description:"",
            id_m_users:""
        }
    ];
    for(let item of array){
    //    await m_class.create({
    //     class_name
    //    })
    }
    // console.log("Finished ...");
}

module.exports=refresh;