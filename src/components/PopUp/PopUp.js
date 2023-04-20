import React, { useState } from 'react';
import styles from './PopUp.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import authenticationSlice from '../../redux/slice/authenticationSlice';
import { getpopUpFormSelector } from '~/redux/selectors';

const cx = classNames.bind(styles);

export default function PopUp({ children }) {
    const statepopUpForm = useSelector(getpopUpFormSelector);

    const dispatch = useDispatch();

    return (
        <div hidden={!statepopUpForm}>
            <div className={cx('overlay')}></div>
            <div className={cx('content')}>
                <FontAwesomeIcon
                    onClick={() => {
                        dispatch(authenticationSlice.actions.closepopUpForm());
                    }}
                    className={cx('close-btn')}
                    icon={faCircleXmark}
                />
                {children}
            </div>
        </div>
    );
}
