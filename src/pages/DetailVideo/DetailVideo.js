import React, { useEffect, useRef, useState } from 'react';
import styles from './DetailVideo.module.scss';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import {
    getCommentByIdSelector,
    getFollowingListSelector,
    getUsertByUserName,
    getVideoListSelector,
    getVolumeSelector,
} from '~/redux/selectors';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import homeSlice, { getVideolist, likeAction, unlikeAction } from '~/redux/slice/homeSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAt,
    faChevronDown,
    faChevronUp,
    faCommentDots,
    faHeart,
    faPause,
    faPlay,
    faVolumeHigh,
    faVolumeXmark,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image/Image';
import Button from '~/components/Button/Button';
import { followAction, unfollowAction } from '~/redux/slice/followingSlice';
import { toast } from 'react-toastify';
import CommentItem from './CommentItem/CommentItem';
import { commentdAction, getCommentByIdAction } from '~/redux/slice/commentSlice';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { getUserProfile } from '~/redux/slice/userSlice';

const cx = classNames.bind(styles);

export default function DetailVideo() {
    const [page, setPage] = useState(1);
    const [isPlay, setIsPlay] = useState(false);
    const [comment, setComment] = useState('');
    // console.log(comment, 'comment');
    // const [data, setData] = useState({});

    const video = useRef();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    //get uuid video
    const location = useLocation();
    const splitPath = location.pathname.split('/');
    const videoId = splitPath[splitPath.length - 1];
    const userId = splitPath[1];

    console.log(userId, 'userId');
    // const previousPathname = location.state?.from?.pathname; // Lấy đường dẫn của trang trước đó từ thuộc tính state
    // console.log(previousPathname, 'previousPathname');
    console.log(location.state, 'previousPathname1'); // Lấy đường dẫn của trang trước đó từ thuộc tính state

    //post video

    // get video volume
    let volume = useSelector(getVolumeSelector);
    if (video?.current) {
        video.current.volume = volume;
    }

    let videoList = '';
    const videoListByPage = useSelector(getVideoListSelector);
    const videoListByUser = useSelector(getUsertByUserName).videos;
    console.log(videoListByPage, 'videoListByPage');
    if (location.state === null) {
        videoList = videoListByPage;
        // console.log('null ne', videoList);
    } else {
        videoList = videoListByUser;
        // console.log('ko null ne', videoList);
    }

    const followingList = useSelector(getFollowingListSelector);
    const commentList = useSelector(getCommentByIdSelector);
    console.log(commentList, 'commentList');

    // get video data
    let data = {};
    let count = -1;
    videoList.forEach((element, index) => {
        if (element.uuid === videoId) {
            // console.log(element, 'element');
            count = index;
            data = element;
        }
    });

    console.log(data, 'data');

    let follow = false;

    followingList.forEach((user) => {
        if (user?.id === data?.user?.id) {
            follow = true;
        }
    });

    let stateHeart = data.is_liked;

    // console.log(videoList, 'videoList: ');
    // console.log(followingList, 'followingList: ');
    useEffect(() => {
        // dispatch(getVideolist(page));

        dispatch(getVideolist());

        dispatch(getUserProfile(`/${userId}`));

        dispatch(getCommentByIdAction(videoId));
    }, [page, dispatch, videoId]);

    const handlePlay = () => {
        video.current.play();
        setIsPlay(false);
    };

    const handlePause = () => {
        video.current.pause();
        setIsPlay(true);
    };

    const renderComment = () => {
        return commentList?.map((comment, index) => {
            return <CommentItem key={index} data={comment} videoId={videoId} />;
        });
    };

    return (
        <div className={cx('container')}>
            <div
                className={cx('video-content')}
                style={{
                    backgroundImage: `url(${data.thumb_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                }}
            >
                <div className={cx('video-glassmorphism-wrap')}>
                    <FontAwesomeIcon
                        className={cx('icon-contain', 'close-icon')}
                        icon={faXmark}
                        onClick={() => {
                            navigate('/');
                        }}
                    />
                </div>
                <div className={cx('content')} key={data.id}>
                    <div className={cx('video-player')}>
                        <video
                            ref={video}
                            className={cx('video')}
                            src={data.file_url}
                            type="video/mp4"
                            muted={volume === 0}
                            autoPlay
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
                </div>
                <div className={cx('video-glassmorphism-wrap')}>
                    {count !== 0 ? (
                        <FontAwesomeIcon
                            className={cx('icon-contain', 'up-icon')}
                            icon={faChevronUp}
                            onClick={() => {
                                count--;
                                data = videoList[count];
                                if (location.state === null) {
                                    navigate(`/@${data.user.nickname}/video/${data.uuid}`);
                                } else {
                                    navigate(`/@${data.user.nickname}/video/${data.uuid}`, {
                                        state: { from: 'profilePage' },
                                    });
                                }
                            }}
                        />
                    ) : (
                        ''
                    )}
                    {count !== videoList.length - 1 ? (
                        <FontAwesomeIcon
                            className={cx('icon-contain', 'down-icon')}
                            icon={faChevronDown}
                            onClick={() => {
                                if (count < videoList.length) {
                                    count++;
                                    data = videoList[count];
                                    console.log(data, 'data ++');
                                    if (location.state === null) {
                                        navigate(`/@${data.user.nickname}/video/${data.uuid}`);
                                    } else {
                                        navigate(`/@${data.user.nickname}/video/${data.uuid}`, {
                                            state: { from: 'profilePage' },
                                        });
                                    }
                                }
                            }}
                        />
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <div className={cx('info-content')}>
                <div className={cx('header-info')}>
                    <div className={cx('info-wrap')}>
                        <Link to={`/@${data?.user?.nickname}`}>
                            <Image src={data?.user?.avatar} alt={data?.user?.first_name} className={cx('avatar')} />
                        </Link>
                        <div className={cx('info')}>
                            <Link to={`/@${data?.user?.nickname}`}>
                                <div>
                                    <span className={cx('username')}>{data?.user?.nickname}</span>
                                    <span className={cx('name')}>
                                        {data?.user?.first_name} {data?.user?.last_name}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <Button
                            outline
                            className={cx('btn-follow', { follow })}
                            // text={follow}
                            onClick={() => {
                                follow ? dispatch(unfollowAction(data.user.id)) : dispatch(followAction(data.user.id));
                            }}
                        >
                            {follow ? 'Following' : 'Follow'}
                        </Button>
                    </div>
                </div>
                <span className={cx('caption')}>{data?.description}</span>
                <span className={cx('music')}>♫{data?.music}</span>
                <div>
                    <div className={cx('wrap-count-like-comment')}>
                        <div className={cx('wrap-like')}>
                            <button
                                className={cx('wrap-icon')}
                                onClick={() => {
                                    stateHeart ? dispatch(unlikeAction(data.uuid)) : dispatch(likeAction(data.uuid));
                                }}
                            >
                                <FontAwesomeIcon icon={faHeart} className={cx('icon', { stateHeart })} />
                            </button>
                            <span className={cx('quantity')}>{data.likes_count}</span>
                        </div>
                        <div className={cx('wrap-like')}>
                            <button className={cx('wrap-icon')}>
                                <FontAwesomeIcon icon={faCommentDots} className={cx('icon')} />
                            </button>
                            <span className={cx('quantity')}>{data.comments_count}</span>
                        </div>
                    </div>
                    <div></div>
                </div>
                <div className={cx('copy-link-wrap')}>
                    <div className={cx('copy-link-title')}>
                        <p className={cx('copy-link-title-detail')}>{window.location.href}</p>
                    </div>
                    <button
                        className={cx('copy-link-btn')}
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            toast.success('Đã sao chép');
                        }}
                    >
                        Sao chép liên kết
                    </button>
                </div>
                {/* comment */}
                {/* <CommentItem data={data} /> */}
                <div className={cx('comment-wrap')}>{renderComment()}</div>

                <div>
                    <form
                        className={cx('comment-post')}
                        onSubmit={(e) => {
                            e.preventDefault();
                            const data = { comment: comment };
                            dispatch(commentdAction({ videoId, data }));
                            setComment('');
                        }}
                    >
                        <div className={cx('comment-input-wrap')}>
                            <input
                                type="text"
                                value={comment}
                                name="comment"
                                className={cx('comment-input')}
                                placeholder="Comment ..."
                                onChange={(e) => {
                                    setComment(e.target.value);
                                }}
                            />
                            <div className={cx('comment-icon-wrap')}>
                                <FontAwesomeIcon className={cx('comment-icon-item')} icon={faAt} />
                                <FontAwesomeIcon className={cx('comment-icon-item')} icon={faFaceSmile} />
                            </div>
                        </div>
                        <Button text disabled={comment === ''}>
                            Post
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
