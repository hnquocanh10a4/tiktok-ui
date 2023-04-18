import React, { useState } from 'react';
import styles from './PopUp.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import authenticationSlice from './authenticationSlice';
import { getLoginFormSelector } from '~/redux/selectors';

const cx = classNames.bind(styles);

export default function PopUp({ children }) {
    const stateLoginForm = useSelector(getLoginFormSelector);

    const dispatch = useDispatch();

    return (
        <div hidden={!stateLoginForm}>
            <div className={cx('overlay')}></div>
            <div className={cx('content')}>
                <FontAwesomeIcon
                    onClick={() => {
                        dispatch(authenticationSlice.actions.closeLoginForm());
                    }}
                    className={cx('close-btn')}
                    icon={faCircleXmark}
                />
                {children}
            </div>
        </div>
    );
}
