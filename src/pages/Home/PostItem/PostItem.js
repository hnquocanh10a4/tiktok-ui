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

const cx = classNames.bind(styles);

function PostItem({ data }) {
    const [stateHeart, setStateHeart] = useState(false);
    const [follow, setFollow] = useState(false);
    const [isPlay, setIsPlay] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    // custom video controls
    const video = useRef();

    useEffect(() => {
        // console.log(video.current);
        video.current.muted = false;
        setIsPlay(video.current.paused);
        setIsMuted(false);
    }, []);

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
                <img src={data.avatar} alt={data.username} className={cx('avatar')} />
                <div className={cx('info')}>
                    <div>
                        <span className={cx('username')}>{data.username}</span>
                        <span className={cx('name')}>{data.name}</span>
                    </div>
                    <span className={cx('caption')}>{data.caption}</span>
                    <div className={cx('content')}>
                        <div className={cx('video-player')}>
                            <video
                                ref={video}
                                className={cx('video')}
                                src={data.video}
                                type="video/mp4"
                                loop
                                onClick={() => {
                                    if (video.current.paused) {
                                        handlePlay();
                                    } else {
                                        handlePause();
                                    }
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

                            {isMuted ? (
                                <FontAwesomeIcon
                                    className={cx('mute-btn')}
                                    icon={faVolumeXmark}
                                    onClick={() => {
                                        video.current.muted = false;
                                        setIsMuted(false);
                                    }}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    className={cx('mute-btn')}
                                    icon={faVolumeHigh}
                                    onClick={() => {
                                        video.current.muted = true;
                                        setIsMuted(true);
                                    }}
                                />
                            )}
                            <input
                                className={cx('input-range')}
                                type="range"
                                min="0"
                                max="1"
                                // value={volume}
                                step="0.01"
                                onMouseMove={(e) => {
                                    // eslint-disable-next-line eqeqeq
                                    if (e.target.value == 0) {
                                        setIsMuted(true);
                                    } else {
                                        setIsMuted(false);
                                    }
                                    video.current.volume = e.target.value;
                                }}
                            />
                        </div>
                        <div className={cx('icon-group')}>
                            <button className={cx('wrap-icon')}>
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className={cx('icon', { stateHeart })}
                                    onClick={() => {
                                        stateHeart ? setStateHeart(false) : setStateHeart(true);
                                    }}
                                />
                            </button>
                            {/* <span className={cx('quantity')}>{data.likes}</span> */}
                            <button className={cx('wrap-icon')}>
                                <FontAwesomeIcon icon={faCommentDots} className={cx('icon')} />
                            </button>
                            {/* <span className={cx('quantity')}>{data.comments}</span> */}
                            <button className={cx('wrap-icon')}>
                                <FontAwesomeIcon icon={faShare} className={cx('icon')} />
                            </button>
                            {/* <span className={cx('quantity')}>{data.share}</span> */}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Button
                    small
                    outline
                    className={cx('btn-follow', { follow })}
                    // text={follow}
                    onClick={() => {
                        follow ? setFollow(false) : setFollow(true);
                    }}
                >
                    {follow ? 'Following' : 'Follow'}
                </Button>
            </div>
        </div>
    );
}

PostItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default PostItem;
