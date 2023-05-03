import {
    faCommentDots,
    faHeart,
    faPause,
    faPlay,
    faShare,
    faVolumeHigh,
    faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import styles from './PostItem.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from '~/components/Image/Image';
import useElementOnScreen from '~/hooks/useElementOnScreen';
import { followAction, unfollowAction } from '~/redux/slice/followingSlice';
import homeSlice, { likeAction, unlikeAction } from '~/redux/slice/homeSlice';
import { getCurrentUserSelector, getVolumeSelector } from '~/redux/selectors';
import { Link, useNavigate } from 'react-router-dom';
import authenticationSlice from '~/redux/slice/authenticationSlice';

const cx = classNames.bind(styles);

function PostItem({ data, followingList }) {
    // const [stateHeart, setStateHeart] = useState(false);

    // const [follow, setFollow] = useState(false);
    const [isPlay, setIsPlay] = useState(true);

    const options = { root: null, rootMargin: '0px', threshold: 0.7 };
    // const videoRef = useRef(null);
    const video = useRef(null);

    const navigate = useNavigate();

    // cai dat am luong cho video

    // video.current.volume = volume;

    //tao bien redux, luu gia tri am luong

    let volume = useSelector(getVolumeSelector);
    // console.log(volume, 'volume');

    if (video?.current) {
        video.current.volume = volume;
    }

    // video.current.play();
    const isVisible = useElementOnScreen(options, video);
    // console.log(isVisible, 'isVisible');
    const [playing, setPlaying] = useState(false);

    // console.log(followingList, 'followingList');
    // console.log(data, 'data');

    // get current user hidden follow btn when user is owner
    const currentUser = useSelector(getCurrentUserSelector);

    // console.log(currentUser, 'currentUser');

    const dispatch = useDispatch();

    let stateHeart = data.is_liked;
    // console.log(stateHeart, 'stateHeart');

    let follow = false;

    followingList.forEach((user) => {
        if (user.id === data.user.id) {
            follow = true;
        }
    });

    // custom video controls

    // useEffect(() => {
    //     // console.log(video.current);
    //     video.current.muted = false;
    //     setIsPlay(video.current.paused);
    //     setIsMuted(false);
    // }, []);

    useEffect(() => {
        if (isVisible) {
            if (!playing) {
                // Rewind the video and play from beginning
                video.current.currentTime = 0;
                video.current.play();
                setPlaying(true);
                setIsPlay(false);
            }
        } else {
            if (playing) {
                video.current.pause();
                setPlaying(false);
                setIsPlay(true);
            }
        }
    }, [isVisible, playing]);

    const handlePlay = () => {
        video.current.play();
        setIsPlay(false);
    };

    const handlePause = () => {
        video.current.pause();
        setIsPlay(true);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Link to={`/@${data.user.nickname}`}>
                    <Image src={data.user.avatar} alt={data.user.nickname} className={cx('avatar')} />
                </Link>
                <div className={cx('info')}>
                    <Link to={`/@${data.user.nickname}`}>
                        <div>
                            <span className={cx('username')}>{data.user.nickname}</span>
                            <span className={cx('name')}>
                                {data.user.first_name} {data.user.last_name}
                            </span>
                        </div>
                    </Link>
                    <span className={cx('caption')}>{data.description}</span>
                    <div className={cx('content')}>
                        <div className={cx('video-player')}>
                            <video
                                ref={video}
                                className={cx('video')}
                                src={data.file_url}
                                type="video/mp4"
                                // muted
                                loop
                                playsInline
                                poster={data.thumb_url}
                                onClick={() => {
                                    navigate(`/@${data.user.nickname}/video/${data.uuid}`);
                                }}
                            ></video>
                            {/* check video is play ? and set onClick to toggle between play and pause */}
                            {isPlay ? (
                                <FontAwesomeIcon
                                    className={cx('play-btn')}
                                    icon={faPlay}
                                    onClick={() => {
                                        handlePlay();
                                    }}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faPause}
                                    className={cx('play-btn')}
                                    onClick={() => {
                                        handlePause();
                                    }}
                                />
                            )}
                            {/* check video is muted ? and set onClick to toggle between muted and play */}

                            {volume === 0 ? (
                                <FontAwesomeIcon
                                    className={cx('mute-btn')}
                                    icon={faVolumeXmark}
                                    onClick={() => {
                                        // video.current.muted = false;
                                        // setIsMuted(false);
                                        dispatch(homeSlice.actions.setVolume(1));
                                    }}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    className={cx('mute-btn')}
                                    icon={faVolumeHigh}
                                    onClick={() => {
                                        // video.current.muted = true;
                                        // setIsMuted(true);
                                        dispatch(homeSlice.actions.setVolume(0));
                                    }}
                                />
                            )}
                            <input
                                className={cx('input-range')}
                                type="range"
                                min="0"
                                max="1"
                                value={volume}
                                step="0.01"
                                onChange={(e) => {
                                    // eslint-disable-next-line eqeqeq
                                    // if (e.target.value == 0) {
                                    //     setIsMuted(true);
                                    // } else {
                                    //     setIsMuted(false);
                                    // }
                                    console.log(typeof e.target.value, 'am luong');
                                    dispatch(homeSlice.actions.setVolume(+e.target.value));
                                    // video.current.volume = volume;
                                }}
                            />
                        </div>
                        <div className={cx('icon-group')}>
                            <button
                                className={cx('wrap-icon')}
                                onClick={() => {
                                    if (Object.keys(currentUser)?.length !== 0) {
                                        stateHeart
                                            ? dispatch(unlikeAction(data.uuid))
                                            : dispatch(likeAction(data.uuid));
                                    } else {
                                        dispatch(authenticationSlice.actions.openpopUpForm());
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faHeart} className={cx('icon', { stateHeart })} />
                            </button>
                            <span className={cx('quantity')}>{data.likes_count}</span>
                            <button
                                className={cx('wrap-icon')}
                                onClick={() => {
                                    navigate(`/@${data.user.nickname}/video/${data.uuid}`);
                                }}
                            >
                                <FontAwesomeIcon icon={faCommentDots} className={cx('icon')} />
                            </button>
                            <span className={cx('quantity')}>{data.comments_count}</span>
                            <button className={cx('wrap-icon')}>
                                <FontAwesomeIcon icon={faShare} className={cx('icon')} />
                            </button>
                            <span className={cx('quantity')}>{data.shares_count}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {data.user.id === currentUser.id ? (
                    ''
                ) : (
                    <Button
                        small
                        outline
                        className={cx('btn-follow', { follow })}
                        // text={follow}
                        onClick={() => {
                            if (Object.keys(currentUser)?.length !== 0) {
                                follow ? dispatch(unfollowAction(data.user.id)) : dispatch(followAction(data.user.id));
                            } else {
                                dispatch(authenticationSlice.actions.openpopUpForm());
                            }
                        }}
                    >
                        {follow ? 'Following' : 'Follow'}
                    </Button>
                )}
            </div>
        </div>
    );
}

PostItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default PostItem;
