

import CommonAxios from "./CommonAxios";

const  ContentService = {

    getContentOne : (contentId) => {
        return CommonAxios.get(`/blog/contents/${contentId}`);
    },

    getLastContentByMenu: (contentMenu) => {
        return CommonAxios.get(`/blog/contents/${contentMenu}/last`);
    },
    getDefaultContentList: () =>{
        return CommonAxios.get(`/blog/contents`);
    },
    getContentListByPage: (page,size) =>{
        return CommonAxios.get(`/blog/contents?page=${page}&size=${size}`);
    }

}

export default ContentService;