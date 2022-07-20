import * as httprequest from '~/untils/httprequest';

export const search = async (q, type = 'less') => {
    try {
        const res = await httprequest.get('users/search', {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const suggestAccount = async () => {
    try {
        const res = await httprequest.get('users/search?q=n&type=less');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
