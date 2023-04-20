import * as httprequest from '~/untils/httprequest';
import { TOKEN } from '~/untils/setting/configs';

export const getFollowingList = async (page = 1) => {
    try {
        const res = await httprequest.get(`me/followings?page=${page}`, {
            headers: {
                Authorization: `${localStorage.getItem(TOKEN)}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const follow = async (userId) => {
    try {
        const res = await httprequest.post(`users/${userId}/follow`, null, {
            headers: {
                Authorization: `${localStorage.getItem(TOKEN)}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const unfollow = async (userId) => {
    try {
        const res = await httprequest.post(`users/${userId}/unfollow`, null, {
            headers: {
                Authorization: `${localStorage.getItem(TOKEN)}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
