import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import * as searchService from '~/services/searchService';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { LookIcon } from '~/components/Icon';

const cx = classNames.bind(styles);

function Profile() {
    // get username
    const [info, setInfo] = useState([]);
    // console.log(window.location.pathname.split('/@')[1]);
    let username = window.location.pathname.split('/@')[1];
    const location = useLocation();

    const [active, setActive] = useState(true);
    const [follow, setFollow] = useState(false);

    useEffect(() => {
        const featchApi = async () => {
            const result = await searchService.search(username);
            setInfo(result[0]);
        };
        featchApi();
    }, [location, username]);

    // console.log(info);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('image-wrapper')}>
                <img className={cx('image')} src={info.avatar} alt={info.nickname} />
                <div className={cx('info')}>
                    <p className={cx('username')}>
                        <span>{info.nickname}</span>
                        {info.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                    </p>
                    <span className={cx('name')}>{info.full_name}</span>
                    <Button
                        primary
                        className={cx('btn-follow', { primary: !follow, outline: follow })}
                        onClick={() => {
                            follow ? setFollow(false) : setFollow(true);
                        }}
                    >
                        {follow ? 'Unfollow' : 'Follow'}
                    </Button>
                </div>
            </div>
            <div className={cx('follow-wrapper')}>
                <span className={cx('count-num')}>
                    {info.followings_count} <span className={cx('count-letter')}>Following</span>
                </span>
                <span className={cx('count-num')}>
                    {info.followers_count} <span className={cx('count-letter')}>Followers</span>
                </span>
                <span className={cx('count-num')}>
                    {info.likes_count} <span className={cx('count-letter')}>Likes</span>
                </span>
            </div>
            <span className={cx('bio')}> {info.bio}</span>
            <div className={cx('video-tab')}>
                <p
                    className={cx('video-tab-title', { activeVideo: active })}
                    onClick={() => {
                        setActive(true);
                    }}
                >
                    Videos
                </p>
                <p
                    className={cx('like-tab-title', { activeLike: !active })}
                    onClick={() => {
                        setActive(false);
                    }}
                >
                    Liked
                </p>
                <div className={cx('video-tab-scroll')}></div>
            </div>
            {active ? (
                <div className={cx('content')}>
                    <FontAwesomeIcon icon={faVideoSlash} className={cx('video-icon')} />
                    <p className={cx('like-title')}>This user's videos videos are private</p>
                    <p className={cx('like-des')}>Videos liked by {info.nickname} are currently hidden</p>
                </div>
            ) : (
                <div className={cx('content')}>
                    <LookIcon />
                    <p className={cx('like-title')}>This user's liked videos are private</p>
                    <p className={cx('like-des')}>Videos liked by {info.nickname} are currently hidden</p>
                </div>
            )}

            {/* <div className={cx('content')}>
                <LookIcon />
                <p className={cx('like-title')}>This user's liked videos are private</p>
                <p className={cx('like-des')}>Videos liked by {info.nickname} are currently hidden</p>
            </div> */}
        </div>
    );
}

export default Profile;
