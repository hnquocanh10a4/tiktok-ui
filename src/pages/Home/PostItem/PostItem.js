import { faCommentDots, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import styles from './PostItem.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { useState } from 'react';

const cx = classNames.bind(styles);

function PostItem({ data }) {
    const [stateHeart, setStateHeart] = useState(false);
    const [follow, setFollow] = useState(false);

    // let classes = cx('wrap-icon', { heart });

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
                        <video className={cx('video')} loop muted autoPlay controls>
                            <source src={data.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
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
