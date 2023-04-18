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
import Image from '~/components/Image/Image';
import useElementOnScreen from '~/hooks/useElementOnScreen';

const cx = classNames.bind(styles);

function PostItem({ data }) {
    const [stateHeart, setStateHeart] = useState(false);
    const [follow, setFollow] = useState(false);
    const [isPlay, setIsPlay] = useState(true);
    const [isMuted, setIsMuted] = useState(false);

    const options = { root: null, rootMargin: '0px', threshold: 0.7 };
    // const videoRef = useRef(null);
    const video = useRef(null);
    // video.current.play();
    const isVisible = useElementOnScreen(options, video);
    const [playing, setPlaying] = useState(false);

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
                <Image src={data.user.avatar} alt={data.user.nickname} className={cx('avatar')} />
                <div className={cx('info')}>
                    <div>
                        <span className={cx('username')}>{data.user.nickname}</span>
                        <span className={cx('name')}>
                            {data.user.first_name} {data.user.last_name}
                        </span>
                    </div>
                    <span className={cx('caption')}>{data.description}</span>
                    <div className={cx('content')}>
                        <div className={cx('video-player')}>
                            <video
                                ref={video}
                                className={cx('video')}
                                src={data.file_url}
                                type="video/mp4"
                                loop
                                playsInline
                                poster={data.thumb_url}
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
                            <span className={cx('quantity')}>{data.likes_count}</span>
                            <button className={cx('wrap-icon')}>
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
