import React from 'react';
import styles from './SingIn.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

export default function SignIn() {
    return (
        <div className={cx('content')}>
            <h1>Đăng nhập</h1>
            <form className={cx('form-sign')}>
                <div>
                    <span className={cx('input-sign-title')}>Email</span>
                    <input className={cx('input-sign-in')} placeholder="Mời bạn nhập vào Email" />
                </div>
                <div>
                    <span className={cx('input-sign-title')}>Mật khẩu</span>
                    <input className={cx('input-sign-in')} placeholder="Mời bạn nhập vào mật khẩu" type="password" />
                </div>

                <Button disabled outline className={cx('input-btn')}>
                    Đăng nhập
                </Button>
            </form>
        </div>
    );
}
