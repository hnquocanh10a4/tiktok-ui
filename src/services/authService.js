import httprequest from '~/untils/httprequest';

export const signIn = async (data) => {
    try {
        const res = await httprequest.post('auth/login', data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
