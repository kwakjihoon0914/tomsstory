
import axios from 'axios';
import CommonConfig from '../config/CommonConfig';

/* Common axios */
const CommonAxios = axios.create({
    baseURL: CommonConfig.BASE_HOST,
    timeout: 3000,
    headers: {
        "Authorization": ""
        ,'Access-Control-Allow-Origin':"*"
    },
});

/**************************************************************************/
/* Interceptors  */
/**************************************************************************/

/* at request */
CommonAxios.interceptors.request.use(
    (config) => {
        if (CommonConfig.ENV == 'LOCAL' || CommonConfig.ENV == 'DEV') {
            printRequestDebug(config);
        }
        
        return config;
    },
    (error) => {
        if (CommonConfig.ENV == 'LOCAL' || CommonConfig.ENV == 'DEV') {
            printErrorDebug(error);
        }

        return Promise.reject(error);
    },
);
/* at response */
CommonAxios.interceptors.response.use(
    (response) => {
        if (CommonConfig.ENV == 'LOCAL' || CommonConfig.ENV == 'DEV') {
            printResponseDebug(response);
        }

        return response;
    },
    (error) => {
        if (CommonConfig.ENV == 'LOCAL' || CommonConfig.ENV == 'DEV') {
            printErrorDebug(error);
        }

        if (error.response) {
            // 2xx 외 응답일때
        } else if (error.request) {
            // 요청하였으나 응답을 받지 못함
        } else {
            // 그외..
        }
        return Promise.reject(error);
    },
);

/**************************************************************************/
/* Custom Functions  */
/**************************************************************************/
const customConsole = (text,type) =>{
    if (!type){
        console.log(`\x1b[36m${text}\x1b[0m`);
    }
    if (type == 0){ //FgRed
        console.log(`\x1b[31m${text}\x1b[0m`);
    }
    if (type == 1){ //FgGreen
        console.log(`\x1b[32m${text}\x1b[0m`);
    }
    if (type == 2){ //FgYellow
        console.log(`\x1b[33m${text}\x1b[0m`);
    }
}
/*
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
*/
function printErrorDebug(error) {
    console.warn(
        `############### COMMON AXIOS ERROR START ############# [ ${new Date()
            .toLocaleString('en-US')
            .split(', ')} ]`,
    );
    if (error.response) {

        console.warn('(ERR) URL        : ', error.response._url);
        console.warn('(ERR) DATA       : ', error.response.data);
        console.warn('(ERR) STAUTS     : ', error.response.status);
        console.warn('(ERR) HEADERS    : ', error.response.header);
    } else if (error.request) {
        console.warn('(ERR) URL        : ', error.request._url);
        console.warn('(ERR) STATUS     : ', error.request._response);
    } else {
        console.warn('ERROR      : ', error.message);
    }
    console.warn('############### COMMON AXIOS ERROR END ################');
}

function printRequestDebug(config) {

    customConsole(
        `############### COMMON AXIOS REQ START ############# [ ${new Date()
            .toLocaleString('en-US')
            .split(', ')} ]`,1
    );
    
    customConsole(`(REQ) URL           :  ${config.url    }`,1);
    customConsole(`(REQ) METHOD        :  ${config.method }`,1);
    customConsole(`(REQ) HEADERS       :  ${JSON.stringify(config.headers)}`,1);
    customConsole(`(REQ) BODY          :  ${JSON.stringify(config.data   )}`,1);
    customConsole('############### COMMON AXIOS REQ END ###############',1);
}

function printResponseDebug(response) {
    customConsole(
        `############### COMMON AXIOS RES START ############# [ ${new Date()
            .toLocaleString('en-US')
            .split(', ')} ]`,2
    );
    customConsole(`(RES) URL          :  ${response.config.url}`,2);
    customConsole(`(RES) DATA         :  ${JSON.stringify(response.data  )}`,2);
    customConsole(`(RES) HTTP_STATUS  :  ${JSON.stringify(response.status)}`,2);
    customConsole(`############### COMMON AXIOS RES END ###############`,2);
}

export default CommonAxios;
