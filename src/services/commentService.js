import { toast } from 'react-toastify';
import * as httprequest from '~/untils/httprequest';
import { TOKEN } from '~/untils/setting/configs';

export const getCommentById = async (uuid) => {
    try {
        const res = await httprequest.get(`videos/${uuid}/comments`, {
            headers: {
                Authorization: `${localStorage.getItem(TOKEN)}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const comment = async (uuid, data) => {
    try {
        const res = await httprequest.post(`videos/${uuid}/comments`, data, {
            headers: {
                Authorization: `${localStorage.getItem(TOKEN)}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteComment = async (id) => {
    try {
        const res = await httprequest.del(`comments/${id}`, {
            headers: {
                Authorization: `${localStorage.getItem(TOKEN)}`,
            },
        });
        toast.success('Xoá thành công!');

        return res.data;
    } catch (error) {
        toast.error('Xoá không thành công vui lòng kiểm tra lại');
        console.log(error);
    }
};

export const likeComment = async (uuid) => {
    try {
        const res = await httprequest.post(`comments/${uuid}/like`, null, {
            headers: {
                Authorization: `${localStorage.getItem(TOKEN)}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const unlikeComment = async (uuid) => {
    try {
        const res = await httprequest.post(`comments/${uuid}/unlike`, null, {
            headers: {
                Authorization: `${localStorage.getItem(TOKEN)}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
