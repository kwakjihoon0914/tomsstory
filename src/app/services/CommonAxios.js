
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

export default CommonAxios;
