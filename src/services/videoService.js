import * as httprequest from '~/untils/httprequest';
import { TOKEN } from '~/untils/setting/configs';
import { toast } from 'react-toastify';

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

// export const getAVideo = async (uuid) => {
//     try {
//         const res = await httprequest.get(`videos/${uuid}`, {
//             headers: {
//                 Authorization: `${localStorage.getItem(TOKEN)}`,
//             },
//         });

//         return res.data;
//     } catch (error) {
//         console.log(error);
//     }
// };

// export const getVideolistAll = async (page) => {
//     try {
//         const res = await httprequest.get(`videos?type=for-you&page=${page}`, {
//             headers: {
//                 Authorization: `${localStorage.getItem(TOKEN)}`,
//             },
//         });
//         return res;
//     } catch (error) {
//         console.log(error);
//     }
// };

export const postVideo = async (data) => {
    try {
        const res = await httprequest.post(`videos`, data, {
            headers: {
                Authorization: `${localStorage.getItem(TOKEN)}`,
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
            },
        });

        toast.success('Đăng video thành công');

        return res.data;
    } catch (error) {
        toast.error('Đăng video thất bại');

        console.log(error);
    }
};

export const deleteVideo = async (id) => {
    try {
        const res = await httprequest.del(`videos/${id}`, {
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
