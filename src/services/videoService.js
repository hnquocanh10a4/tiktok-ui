import * as httprequest from '~/untils/httprequest';
import { TOKEN } from '~/untils/setting/configs';

export const getVideolist = async (page) => {
    try {
        const res = await httprequest.get(`videos?type=for-you&page=${page}`, {
            headers: {
                Authorization: `${localStorage.getItem(TOKEN)}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getVideolistAll = async (page) => {
    try {
        const res = await httprequest.get(`videos?type=for-you&page=${page}`, {
            headers: {
                Authorization: `${localStorage.getItem(TOKEN)}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
