import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/slice/authenticationSlice';

export default function LogOut() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(logOut());
        navigate('/');
    }, []);
    return <></>;
}
