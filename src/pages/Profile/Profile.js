import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { LookIcon } from '~/components/Icon';
import { useSelector, useDispatch } from 'react-redux';
import {
    getCurrentUserSelector,
    getFollowingListSelector,
    getUsertByUserName,
    getVideoLikedlistSelector,
} from '~/redux/selectors';
import { getUserProfile, getVideoLikedlistAction } from '../../redux/slice/userSlice';
import Image from '~/components/Image/Image';
import { followAction, unfollowAction } from '~/redux/slice/followingSlice';
import { useNavigate } from 'react-router-dom';
import authenticationSlice from '~/redux/slice/authenticationSlice';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Profile() {
    // get username
    // const [info, setInfo] = useState([]);

    const info = useSelector(getUsertByUserName);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [active, setActive] = useState(true);

    const currentUser = useSelector(getCurrentUserSelector);

    const videoLikedList = useSelector(getVideoLikedlistSelector);

    console.log(videoLikedList, 'videoLikedList');

    // console.log(location.pathname, 'location.pathname');
    // console.log(info, 'info');

    // const [follow, setFollow] = useState(false);
    let follow = false;
    const followingList = useSelector(getFollowingListSelector);

    followingList.forEach((user) => {
        if (user.id === info.id) {
            follow = true;
        }
    });

    useEffect(() => {
        dispatch(getUserProfile(location.pathname));
        dispatch(getVideoLikedlistAction(info.id));
    }, [location, currentUser, active]);

    console.log('info', info);
    const handlePlay = (e) => {
        e.target.play();
    };

    const handlePause = (e) => {
        console.log('pause');
        e.target.pause();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('image-wrapper')}>
                <Image className={cx('image')} src={info?.avatar} alt={info?.nickname} />
                <div className={cx('info')}>
                    <p className={cx('username')}>
                        <span>{info?.nickname}</span>
                        {info?.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                    </p>
                    <span className={cx('name')}>{info?.full_name}</span>
                    {info.id === currentUser.id ? (
                        <Button
                            rounded
                            leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                            onClick={() => {
                                dispatch(authenticationSlice.actions.openpopUpForm());
                                dispatch(authenticationSlice.actions.openEditProfileForm());
                            }}
                        >
                            Edit Profile
                        </Button>
                    ) : (
                        <Button
                            primary
                            className={cx('btn-follow', { primary: !follow, outline: follow })}
                            onClick={() => {
                                if (Object.keys(currentUser)?.length !== 0) {
                                    follow ? dispatch(unfollowAction(info.id)) : dispatch(followAction(info.id));
                                } else {
                                    dispatch(authenticationSlice.actions.openpopUpForm());
                                }
                            }}
                        >
                            {follow ? 'Unfollow' : 'Follow'}
                        </Button>
                    )}
                </div>
            </div>
            <div className={cx('follow-wrapper')}>
                <span className={cx('count-num')}>
                    {info?.followings_count} <span className={cx('count-letter')}>Following</span>
                </span>
                <span className={cx('count-num')}>
                    {info?.followers_count} <span className={cx('count-letter')}>Followers</span>
                </span>
                <span className={cx('count-num')}>
                    {info?.likes_count} <span className={cx('count-letter')}>Likes</span>
                </span>
            </div>
            <span className={cx('bio')}> {info?.bio}</span>
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
                info?.videos?.length === 0 ? (
                    <div className={cx('content')}>
                        <FontAwesomeIcon icon={faVideoSlash} className={cx('video-icon')} />
                        <p className={cx('like-title')}>This user's videos videos are private</p>
                        <p className={cx('like-des')}>Videos liked by {info?.nickname} are currently hidden</p>
                    </div>
                ) : (
                    <div className={cx('content-video')}>
                        {info?.videos?.map((video, index) => {
                            return (
                                // <Link to={`/@${video.user.nickname}/video/${video.uuid}`}>
                                <video
                                    muted
                                    key={index}
                                    className={cx('video')}
                                    src={video.file_url}
                                    type="video/mp4"
                                    loop
                                    poster={video.thumb_url}
                                    onMouseOver={handlePlay}
                                    onMouseOut={handlePause}
                                    onClick={() => {
                                        navigate(`/@${video.user.nickname}/video/${video.uuid}`, {
                                            state: { from: 'profilePage' },
                                        });
                                    }}
                                ></video>
                                // </Link>
                            );
                        })}
                    </div>
                )
            ) : videoLikedList?.length === 0 ? (
                <div className={cx('content')}>
                    <LookIcon />
                    <p className={cx('like-title')}>This user's liked videos are private</p>
                    <p className={cx('like-des')}>Videos liked by {info?.nickname} are currently hidden</p>
                </div>
            ) : (
                <div className={cx('content-video')}>
                    {videoLikedList?.map((video, index) => {
                        return (
                            // <Link to={`/@${video.user.nickname}/video/${video.uuid}`}>
                            <video
                                muted
                                key={index}
                                className={cx('video')}
                                src={video.file_url}
                                type="video/mp4"
                                loop
                                poster={video.thumb_url}
                                onMouseOver={handlePlay}
                                onMouseOut={handlePause}
                                onClick={() => {
                                    navigate(`/@${video.user.nickname}/video/${video.uuid}`, {
                                        state: { from: 'likedPage' },
                                    });
                                }}
                            ></video>
                            // </Link>
                        );
                    })}
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
