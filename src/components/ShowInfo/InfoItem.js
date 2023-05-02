import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from '../Button';
import styles from './InfoItem.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { followAction, unfollowAction } from '~/redux/slice/followingSlice';
import authenticationSlice from '~/redux/slice/authenticationSlice';
import { getCurrentUserSelector } from '~/redux/selectors';

const cx = classNames.bind(styles);

function InfoItem({ data, followingList }) {
    // only style inline can be used
    const currentUser = useSelector(getCurrentUserSelector);

    const dispatch = useDispatch();
    const styles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        width: '100%',
    };
    let follow = false;

    followingList.forEach((user) => {
        if (user.id === data.id) {
            follow = true;
        }
    });

    return (
        <div className={cx('wrapper')}>
            <div style={styles}>
                <img className={cx('image')} src={data.avatar} alt={data.nickname} />
                <Button
                    className={cx('btn-follow', { follow })}
                    primary={!follow}
                    outline={follow}
                    small
                    onClick={() => {
                        if (Object.keys(currentUser)?.length !== 0) {
                            follow ? dispatch(unfollowAction(data.id)) : dispatch(followAction(data.id));
                        } else {
                            dispatch(authenticationSlice.actions.openpopUpForm());
                        }
                    }}
                >
                    {follow ? 'Following' : 'Follow'}
                </Button>
            </div>
            <div className={cx('info')}>
                <span className={cx('username')}>
                    {data.nickname}
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}{' '}
                </span>
                <span className={cx('name')}>{data.full_name}</span>
            </div>
            <div>
                <span className={cx('count-num')}>
                    {data.followings_count} <span className={cx('count-letter')}>Followers</span>
                </span>
                <span className={cx('count-num')}>
                    {data.likes_count} <span className={cx('count-letter')}>Likes</span>
                </span>
            </div>
        </div>
    );
}

export default InfoItem;
