import React from 'react';
import styles from '../SignIn/SingIn.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import authenticationSlice, { signIn, signUp } from '../authenticationSlice';
import { getCurrentUserSelector } from '~/redux/selectors';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function SignUp() {
    const currentUser = useSelector(getCurrentUserSelector);
    console.log('currentUser', currentUser);

    const dispatch = useDispatch();
    const formilk = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
            password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 kí tự').required('Mật khẩu không được để trống'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Mật khẩu không trừng khớp')
                .required('Mật khẩu xác nhận không được để trống'),
        }),
        onSubmit: (value) => {
            // console.log('da dien ', value);
            dispatch(signUp(value));
        },
    });
    return (
        <div className={cx('content')}>
            <h1>Đăng ký</h1>
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

                <div>
                    <span className={cx('input-sign-title')}>Xác nhận mật khẩu</span>
                    <input
                        name="confirmPassword"
                        className={cx('input-sign-in')}
                        placeholder="Mời bạn nhập vào mật khẩu"
                        type="password"
                        onChange={formilk.handleChange}
                    />
                    {formilk.errors.confirmPassword && formilk.touched.confirmPassword && (
                        <p className={cx('error-title')}>{formilk.errors.confirmPassword}</p>
                    )}
                </div>

                <Button outline className={cx('input-btn')}>
                    Đăng ký
                </Button>
            </form>
            <p className={cx('singup-title-wrap')}>
                Bạn đã có tài khoản ?
                <Button
                    text
                    className={cx('singup-title')}
                    onClick={() => {
                        dispatch(authenticationSlice.actions.openLoginForm());
                    }}
                >
                    Đăng nhập
                </Button>
            </p>
        </div>
    );
}
