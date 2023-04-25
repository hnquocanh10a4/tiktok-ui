import React, { useState } from 'react';
import styles from '../DetailVideo.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '~/components/Image/Image';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faHeart as faHeartR, faFlag } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCommentdAction } from '~/redux/slice/commentSlice';
import { getCurrentUserSelector } from '~/redux/selectors';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

export default function CommentItem({ data, videoId }) {
    const [hiddenMoreBtn, setHiddenMoreBtn] = useState(true);
    console.log(data, 'data id');
    console.log(videoId, 'data videoId');
    const dispatch = useDispatch();

    const currentUser = useSelector(getCurrentUserSelector);
    console.log(currentUser, 'currentUser');

    return (
        <div className={cx('comment-container')}>
            <div className={cx('comment-container-info')}>
                <div className={cx('info-wrap')}>
                    <Link to={`/@${data?.user?.nickname}`}>
                        <Image src={data?.user?.avatar} alt={data?.user?.first_name} className={cx('avatar')} />
                    </Link>
                    <div className={cx('info')}>
                        <Link to={`/@${data?.user?.nickname}`}>
                            <div className={cx('wrap-username-name')}>
                                <span className={cx('username')}>{data?.user?.nickname}</span>
                                <span className={cx('name')}>
                                    {data?.user?.first_name} {data?.user?.last_name}
                                </span>
                                <p>{data?.comment}</p>
                                <span className={cx('date-comment')}>{data?.created_at}</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            {/* function */}
            <div
                className={cx('comment-container-info-icon')}
                onMouseOver={() => {
                    setHiddenMoreBtn(false);
                }}
                onMouseOut={() => {
                    setHiddenMoreBtn(true);
                }}
            >
                <Tippy
                    placement="left"
                    render={(attrs) => (
                        <div {...attrs}>
                            <PopperWrapper>
                                <div className={cx('wrap-detele-edit-button')}>
                                    {currentUser.id === data.user.id ? (
                                        <Button
                                            className={cx('detele-edit-button')}
                                            text
                                            leftIcon={<FontAwesomeIcon icon={faTrashCan} />}
                                            onClick={() => {
                                                dispatch(deleteCommentdAction({ id: data.id, uuid: videoId }));
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    ) : (
                                        <Button
                                            className={cx('detele-edit-button')}
                                            text
                                            leftIcon={<FontAwesomeIcon icon={faFlag} />}
                                            onClick={() => {
                                                toast.success('Báo cáo thành công!');
                                            }}
                                        >
                                            Report
                                        </Button>
                                    )}
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
                            className={cx('comment-container-info-icon-more', { hiddenMoreBtn })}
                            icon={faEllipsis}
                        />
                    </div>
                </Tippy>

                <div className={cx('comment-container-info-icon-heart')}>
                    <FontAwesomeIcon icon={faHeartR} />
                    <span>{data?.likes_count}</span>
                </div>
            </div>
        </div>
    );
}
