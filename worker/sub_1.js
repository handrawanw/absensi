const {parentPort,workerData}=require("worker_threads");

function processWorker(value){
    // console.log(value)
    return value;
}

let resultData=processWorker(workerData);

setTimeout(()=>{
    parentPort.postMessage({resultData});
},10000);