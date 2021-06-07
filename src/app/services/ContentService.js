

import CommonAxios from "./CommonAxios";


const prefix = "https://blog.gy-tech.org";
//const prefix ="";
const  ContentService = {
    
    getContentOne : (contentId) => {
        return CommonAxios.get(`${prefix}/blog/contents/${contentId}`);
    },
    getContentHotOne : () => {
        return CommonAxios.get(`${prefix}/blog/contents/hot`);
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

    getAllMenus:()=>{
        return CommonAxios.get(`${prefix}/blog/menus`);
    },

    createContent: (createdContent) => {
        return CommonAxios.post(`${prefix}/blog/contents`,createdContent);
    }

}

export default ContentService;