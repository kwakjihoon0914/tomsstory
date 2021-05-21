

import moment from "moment";

function DateUtils(){

    this.convertYYYY_MM_DDFrom = (date) => {
        return moment(date).format('YYYY-MM-DD');
    }
    this.convertYYYY_MM_DDFromNow = ()=>{
        return moment().format('YYYY-MM-DD');
    }
    this.convertUsingFormatFrom = (date,format) =>{
        return moment(date).format(format);
    }
    this.convertUsingFormatFromNow = (format) =>{
        return moment().format(format);
    }



}


export default new DateUtils();