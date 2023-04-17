import * as httprequest from '~/untils/httprequest';

export const getVideolist = async (page) => {
    try {
        const res = await httprequest.get(`videos?type=for-you&page=${page}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
