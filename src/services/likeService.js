import * as httprequest from '~/untils/httprequest';
import { TOKEN } from '~/untils/setting/configs';

export const like = async (id) => {
    try {
        const res = await httprequest.post(`/videos/${id}/like`, null, {
            headers: {
                Authorization: `${localStorage.getItem(TOKEN)}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const unlike = async (id) => {
    try {
        const res = await httprequest.post(`/videos/${id}/unlike`, null, {
            headers: {
                Authorization: `${localStorage.getItem(TOKEN)}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
