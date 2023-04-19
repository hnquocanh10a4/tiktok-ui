import httprequest from '~/untils/httprequest';
import { toast } from 'react-toastify';

export const signIn = async (data) => {
    try {
        const res = await httprequest.post('auth/login', data);
        toast.success('Đăng nhập thành công!');
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
