import React, { useState } from 'react';
import styles from './PopUp.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import SignIn from './SignIn/SignIn';

const cx = classNames.bind(styles);

export default function PopUp() {
    const [hidden, setHidden] = useState();

    return (
        <div hidden={hidden}>
            <div className={cx('overlay')}></div>
            <div className={cx('content')}>
                <FontAwesomeIcon
                    onClick={() => {
                        setHidden(true);
                    }}
                    className={cx('close-btn')}
                    icon={faCircleXmark}
                />
                <SignIn />
            </div>
        </div>
    );
}
