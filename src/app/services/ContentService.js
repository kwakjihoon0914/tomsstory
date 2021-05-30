

import CommonAxios from "./CommonAxios";

const  ContentService = {

    getContentOne : (contentId) => {
        return CommonAxios.get(`https://blog.gy-tech.org/blog/contents/${contentId}`);
    },
    getLastContentByMenu: (contentMenu) => {
        return CommonAxios.get(`https://blog.gy-tech.org/blog/contents/${contentMenu}/last`);
    },
    getDefaultContentList: () =>{
        return CommonAxios.get(`https://blog.gy-tech.org/blog/contents`);
    },
    getContentListByPage: (page,size) =>{
        return CommonAxios.get(`https://blog.gy-tech.org/blog/contents?page=${page}&size=${size}`);
    },
    getContentsByTitle : (title,page,size) =>{
        return CommonAxios.get(`https://blog.gy-tech.org/blog/contents?page=${page}&size=${size}&title=${title}`);
    },

}

export default ContentService;