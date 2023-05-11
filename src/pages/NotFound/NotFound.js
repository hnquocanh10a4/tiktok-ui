import React from 'react';
import classNames from 'classnames/bind';
import notFound from '~/assets/images/not-found-2384304_1280.jpg';
import styles from './NotFound.module.scss';

const cx = classNames.bind(styles);

export default function NotFound() {
    return <img src={notFound} alt="notFound" className={cx('container')} />;
}
