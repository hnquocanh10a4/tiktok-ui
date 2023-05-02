import { toast } from 'react-toastify';
import * as httprequest from '~/untils/httprequest';
import { TOKEN } from '~/untils/setting/configs';

export const getCommentById = async (uuid) => {
    try {
        const res = await httprequest.get(`videos/${uuid}/comments`, {
            headers: {
                // Authorization: `${localStorage.getItem(TOKEN)}`,
                //fake token
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY4Mjk5OTEzMiwiZXhwIjoxNjg1NTkxMTMyLCJuYmYiOjE2ODI5OTkxMzIsImp0aSI6IjVaVUoxbHVJTFBjMDBEYnciLCJzdWIiOjUzNDcsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.7fu9v2oiVecLD2mfmYsNri3vwA3E-rjp1MBAf5KiI88`,
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
