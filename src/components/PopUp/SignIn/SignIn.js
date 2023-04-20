import React from 'react';
import styles from './SingIn.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import authenticationSlice, { signIn } from '../../../redux/slice/authenticationSlice';
import { getCurrentUserSelector } from '~/redux/selectors';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function SignIn() {
    const currentUser = useSelector(getCurrentUserSelector);
    console.log('currentUser', currentUser);

    const dispatch = useDispatch();
    const formilk = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
            password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 kí tự').required('Mật khẩu không được để trống'),
        }),
        onSubmit: (value) => {
            console.log('da dien ', value);
            dispatch(signIn(value));
        },
    });
    return (
        <div className={cx('content')}>
            <h1>Đăng nhập</h1>
            <form className={cx('form-sign')} onSubmit={formilk.handleSubmit}>
                <div>
                    <span className={cx('input-sign-title')}>Email</span>
                    <input
                        name="email"
                        className={cx('input-sign-in')}
                        placeholder="Mời bạn nhập vào Email"
                        onChange={formilk.handleChange}
                    />
                    {formilk.errors.email && formilk.touched.email && (
                        <p className={cx('error-title')}>{formilk.errors.email}</p>
                    )}
                </div>
                <div>
                    <span className={cx('input-sign-title')}>Mật khẩu</span>
                    <input
                        name="password"
                        className={cx('input-sign-in')}
                        placeholder="Mời bạn nhập vào mật khẩu"
                        type="password"
                        onChange={formilk.handleChange}
                    />
                    {formilk.errors.password && formilk.touched.password && (
                        <p className={cx('error-title')}>{formilk.errors.password}</p>
                    )}
                </div>

                <Button outline className={cx('input-btn')}>
                    Đăng nhập
                </Button>
            </form>
            <p className={cx('singup-title-wrap')}>
                Bạn không có tài khoản ?
                <Button
                    text
                    className={cx('singup-title')}
                    onClick={() => {
                        dispatch(authenticationSlice.actions.openRegisterForm());
                    }}
                >
                    Đăng ký
                </Button>
            </p>
        </div>
    );
}
