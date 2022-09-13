const {CronJob}=require("cron");
const {processMainCron} = require("../worker/main");

let cron=new CronJob('0 */10 * * * *',()=>{
    let date=Date.now()-()
    processMainCron();
});
