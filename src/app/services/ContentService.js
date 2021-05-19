

import CommonAxios from "./CommonAxios";

const  ContentService = {

    getContentOne : (contentId) => {
        return CommonAxios.get(`/contents/${contentId}`);
    },

    getLastContent: (contentMenu) => {
        return CommonAxios.get(`/contents/${contentMenu}/last`);
    }

}

export default ContentService;