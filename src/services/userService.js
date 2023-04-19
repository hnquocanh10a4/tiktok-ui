import * as httprequest from '~/untils/httprequest';

export const suggestAccount = async (quantity) => {
    try {
        const res = await httprequest.get(`users/suggested?page=1&per_page=${quantity}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getUsertByUserName = async (userName) => {
    try {
        const res = await httprequest.get(`users${userName}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
