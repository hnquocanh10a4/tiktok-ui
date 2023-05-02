import React from 'react';
import styles from './Loading.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function Loading({ hidden }) {
    return (
        <div hidden={hidden}>
            <div className={cx('loading')}>
                <div className={cx('loading-wrap')}>
                    <div className={cx('green-ball')}></div>
                    <div className={cx('red-ball')}></div>
                </div>
            </div>
            <div className={cx('blur-wrap')}></div>
        </div>
    );
}
