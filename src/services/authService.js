import httprequest from '~/untils/httprequest';
import { toast } from 'react-toastify';
import { TOKEN } from '~/untils/setting/configs';

export const signIn = async (data) => {
    try {
        console.log(data, 'data service');

        const res = await httprequest.post('auth/login', data);
        // await toast.success('Đăng nhập thành công!');
        window.location.reload();
        return res.data;
    } catch (error) {
        toast.error('Vui lòng kiểm tra lại email hoặc mật khẩu');
        console.log(error);
    }
};

export const signUp = async (data) => {
    try {
        const res = await httprequest.post('auth/register', data);
        toast.success('Đăng ký thành công mời bạn đăng nhập');
        return res.data;
    } catch (error) {
        toast.error('Email đã được sử dụng');
        console.log(error);
    }
};

export const logOut = async () => {
    try {
        const res = await httprequest.post('auth/logout');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = async (data) => {
    try {
        const res = await httprequest.post(`auth/me?_method=PATCH`, data, {
            headers: {
                Authorization: `${localStorage.getItem(TOKEN)}`,
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
            },
        });

        toast.success('Sửa thông tin thành công');

        return res.data;
    } catch (error) {
        toast.error('Sửa thông tin thất bại');

        console.log(error);
    }
};

export const getCurrentUser = async () => {
    try {
        const res = await httprequest.get(`auth/me`, {
            headers: {
                Authorization: `${localStorage.getItem(TOKEN)}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
