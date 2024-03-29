import React, { useEffect, useRef, useState } from 'react';
import styles from './DetailVideo.module.scss';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import {
    getCommentByIdSelector,
    getCurrentUserSelector,
    getFollowingListSelector,
    getUsertByUserName,
    getVideoLikedlistSelector,
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
    faEllipsis,
    faHeart,
    faPause,
    faPlay,
    faTrashCan,
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
import { getUserProfile, getVideoLikedlistAction } from '~/redux/slice/userSlice';
import authenticationSlice from '~/redux/slice/authenticationSlice';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { deleteVideoAction } from '~/redux/slice/uploadSlice';

const cx = classNames.bind(styles);

export default function DetailVideo() {
    const [isPlay, setIsPlay] = useState(false);
    const [comment, setComment] = useState('');

    const video = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //get uuid video
    const location = useLocation();
    const splitPath = location.pathname.split('/');
    const videoId = splitPath[splitPath.length - 1]; // id cua video
    const userId = splitPath[1]; // nickname cua nguoi dang video

    // Lấy đường dẫn của trang trước đó từ thuộc tính state kiểm tra xem người dùng xem list video từ home, profile, liked
    if (location.state?.from === 'likedPage') {
        localStorage.setItem('prePage', 'likedPage');
    } else if (location.state?.from === 'homePage') {
        localStorage.setItem('prePage', 'homePage');
    } else {
        localStorage.setItem('prePage', 'profilePage');
    }

    //post video

    // get video volume
    let volume = useSelector(getVolumeSelector);
    if (video?.current) {
        video.current.volume = volume;
    }

    // tạo mảng videolist chung
    let videoList = '';

    const currentUser = useSelector(getCurrentUserSelector); // user hiện tại
    const userName = useSelector(getUsertByUserName);
    const videoListByPage = useSelector(getVideoListSelector); // list video từ home
    const videoListByUser = useSelector(getUsertByUserName).videos; // list video từ profile
    const videoListByUserLiked = useSelector(getVideoLikedlistSelector); // list video từ liked

    console.log(userName.id, 'userName');

    // tùy vào trang trước của người dùng gán list video phù hợp
    if (localStorage.getItem('prePage') === 'homePage') {
        videoList = videoListByPage;
    } else if (localStorage.getItem('prePage') === 'likedPage') {
        videoList = videoListByUserLiked;
    } else {
        videoList = videoListByUser;
    }

    // lấy chi tiết 1 video
    let data = {};

    // lấy following và comment
    const followingList = useSelector(getFollowingListSelector);
    const commentList = useSelector(getCommentByIdSelector);

    // lấy vị trí hiện tại của video trong list và lấy chi tiết video
    let count = -1;

    videoList?.forEach((element, index) => {
        if (element.uuid === videoId) {
            count = index;
            data = element;
        }
    });

    // console.log(data, 'datadata');
    console.log(videoList, 'videoList');

    // kiểm tra có đang follow
    let follow = false;
    followingList.forEach((user) => {
        if (user?.id === data?.user?.id) {
            follow = true;
        }
    });

    // kiểm tra có đang tim
    let stateHeart = data?.is_liked;

    useEffect(() => {
        dispatch(getUserProfile(`/${userId}`));
        dispatch(getVideolist(1));
        dispatch(getCommentByIdAction(videoId));
    }, [dispatch, videoId, userId]);

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
            return <CommentItem key={index} data={comment} videoId={videoId} currentUser={currentUser} />;
        });
    };

    return (
        <div className={cx('container')}>
            <div
                className={cx('video-content')}
                style={{
                    backgroundImage: `url(${data?.thumb_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                }}
            >
                <div className={cx('video-glassmorphism-wrap')}>
                    <FontAwesomeIcon
                        className={cx('icon-contain', 'close-icon')}
                        icon={faXmark}
                        onClick={() => {
                            if (localStorage.getItem('prePage') === 'homePage') {
                                navigate('/');
                            } else {
                                navigate(`/@${data?.user?.nickname}`);
                            }
                        }}
                    />
                </div>
                <div className={cx('content')} key={data?.id}>
                    <div className={cx('video-player')}>
                        <video
                            ref={video}
                            className={cx('video')}
                            src={data?.file_url}
                            type="video/mp4"
                            muted={volume === 0}
                            autoPlay
                            loop
                            playsInline
                            poster={data?.thumb_url}
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
                                if (localStorage.getItem('prePage') === 'homePage') {
                                    navigate(`/@${data.user.nickname}/video/${data.uuid}`, {
                                        state: { from: 'homePage' },
                                    });
                                } else if (localStorage.getItem('prePage') === 'likedPage') {
                                    navigate(`/@${data.user.nickname}/video/${data.uuid}`, {
                                        state: { from: 'likedPage' },
                                    });
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
                    {count !== videoList?.length - 1 ? (
                        <FontAwesomeIcon
                            className={cx('icon-contain', 'down-icon')}
                            icon={faChevronDown}
                            onClick={() => {
                                if (count < videoList?.length) {
                                    count++;
                                    data = videoList[count];
                                    console.log(data, 'data ++');
                                    if (localStorage.getItem('prePage') === 'homePage') {
                                        navigate(`/@${data.user.nickname}/video/${data.uuid}`, {
                                            state: { from: 'homePage' },
                                        });
                                    } else if (localStorage.getItem('prePage') === 'likedPage') {
                                        navigate(`/@${data.user.nickname}/video/${data.uuid}`, {
                                            state: { from: 'likedPage' },
                                        });
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
                        {data?.user?.id === currentUser.id ? (
                            <Tippy
                                placement="left"
                                render={(attrs) => (
                                    <div {...attrs}>
                                        <PopperWrapper>
                                            <div className={cx('wrap-detele-edit-button')}>
                                                <Button
                                                    className={cx('detele-edit-button')}
                                                    text
                                                    leftIcon={<FontAwesomeIcon icon={faTrashCan} />}
                                                    onClick={() => {
                                                        //delete post
                                                        dispatch(deleteVideoAction(data?.id));
                                                        navigate(`/`);

                                                        // dispatch(deleteCommentdAction({ id: data?.id, uuid: videoId }));
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </PopperWrapper>
                                    </div>
                                )}
                                hideOnClick={false}
                                interactive={true}
                                delay={[0, 500]}
                            >
                                <div>
                                    <FontAwesomeIcon
                                        className={cx('comment-container-info-icon-more')}
                                        icon={faEllipsis}
                                    />
                                </div>
                            </Tippy>
                        ) : (
                            <Button
                                outline
                                className={cx('btn-follow', { follow })}
                                // text={follow}
                                onClick={() => {
                                    if (Object.keys(currentUser)?.length !== 0) {
                                        follow
                                            ? dispatch(unfollowAction(data.user.id))
                                            : dispatch(followAction(data.user.id));
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
                <span className={cx('caption')}>{data?.description}</span>
                <span className={cx('music')}>♫{data?.music}</span>
                <div>
                    <div className={cx('wrap-count-like-comment')}>
                        <div className={cx('wrap-like')}>
                            {localStorage.getItem('prePage') === 'homePage' && (
                                <>
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
                                </>
                            )}
                        </div>
                        <div className={cx('wrap-like')}>
                            <button className={cx('wrap-icon')}>
                                <FontAwesomeIcon icon={faCommentDots} className={cx('icon')} />
                            </button>
                            <span className={cx('quantity')}>{data?.comments_count}</span>
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
                <div className={cx('comment-wrap')}>
                    {commentList?.length === 0 ? (
                        <p className={cx('title-no-comment')}>Hãy là người đầu tiên bình luận</p>
                    ) : (
                        renderComment()
                    )}
                </div>

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
                        {Object.keys(currentUser)?.length === 0 ? (
                            <Button
                                outline
                                className={cx('btn-login-comment')}
                                onClick={() => {
                                    dispatch(authenticationSlice.actions.openpopUpForm());
                                }}
                            >
                                Đăng nhập để bình luận
                            </Button>
                        ) : (
                            <>
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
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
