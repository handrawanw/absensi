const {Worker}=require("worker_threads");

function processMainSub1(value){
    return new Promise((resolve,reject)=>{
        let worker=new Worker(__dirname+"/sub_1.js",{workerData:value});
        // console.log("Location worker",__dirname+"/sub_1.js");

        worker.on("message",resolve);
        worker.on("error",reject);
        worker.on("exit",(code)=>{
            if(code!==0){
                reject(new Error(`Stopped with exit code ${code}`));   
            }
        })
    });
}

function processMainCron(value){
    return new Promise((resolve,reject)=>{
        let worker=new Worker(__dirname+"/sub_cron.js",{workerData:value});
        // console.log("Location worker",__dirname+"/sub_1.js");

        worker.on("message",resolve);
        worker.on("error",reject);
        worker.on("exit",(code)=>{
            if(code!==0){
                reject(new Error(`Stopped with exit code ${code}`));   
            }
        })
    });
}

module.exports={
    processMainSub1,
    processMainCron
}