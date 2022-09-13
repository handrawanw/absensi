

class HelpersFunc {

    static converterJadwalTime({day1ms=86400000,time}){
        let _1hours=3600000;
        let nows=Date.now(),dates;
        nows=nows-(nows%day1ms);
        dates=new Date(nows);
        let [sTval1,sTval2]=String(time).split(".");
        dates.setHours(Number(sTval1));
        if(sTval2){
            dates.setMinutes(Number(sTval2*10));
        }
        return dates.getTime();
    }

}

module.exports=HelpersFunc;