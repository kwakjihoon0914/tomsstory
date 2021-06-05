

import CommonAxios from "./CommonAxios";


//const prefix = "https://blog.gy-tech.org";
const prefix ="";
const  ContentService = {
    
    getContentOne : (contentId) => {
        return CommonAxios.get(`${prefix}/blog/contents/${contentId}`);
    },
    getLastContentByMenu: (contentMenu) => {
        return CommonAxios.get(`${prefix}/blog/contents/${contentMenu}/last`);
    },
    getDefaultContentList: () =>{
        return CommonAxios.get(`${prefix}/blog/contents`);
    },
    getContentListByPage: (page,size) =>{
        return CommonAxios.get(`${prefix}/blog/contents?page=${page}&size=${size}`);
    },
    getContentsByTitle : (title,page,size) =>{
        return CommonAxios.get(`${prefix}/blog/contents?page=${page}&size=${size}&title=${title}`);
    },

}

export default ContentService;