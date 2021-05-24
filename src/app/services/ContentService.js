

import CommonAxios from "./CommonAxios";

const  ContentService = {

    getContentOne : (contentId) => {
        return CommonAxios.get(`http://3.36.215.51:8080/blog/contents/${contentId}`);
    },
    getLastContentByMenu: (contentMenu) => {
        return CommonAxios.get(`http://3.36.215.51:8080/blog/contents/${contentMenu}/last`);
    },
    getDefaultContentList: () =>{
        return CommonAxios.get(`http://3.36.215.51:8080/blog/contents`);
    },
    getContentListByPage: (page,size) =>{
        return CommonAxios.get(`http://3.36.215.51:8080/blog/contents?page=${page}&size=${size}`);
    },
    getContentsByTitle : (title,page,size) =>{
        return CommonAxios.get(`http://3.36.215.51:8080/blog/contents?page=${page}&size=${size}&title=${title}`);
    },

}

export default ContentService;