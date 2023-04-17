import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '~/components/AccountItem/AccountItem.module.scss';
import ShowInfo from '~/components/ShowInfo';
import Image from '../Image/Image';

const cx = classNames.bind(styles);

function AccountItem({ data, showInfo = false }) {
    if (showInfo) {
        return (
            <ShowInfo data={data}>
                <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
                    <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />
                    <div className={cx('info')}>
                        <p className={cx('username')}>
                            <span>{data.nickname}</span>
                            {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        </p>
                        <span className={cx('name')}>{data.full_name}</span>
                    </div>
                </Link>
            </ShowInfo>
        );
    }

    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />
            <div className={cx('info')}>
                <p className={cx('username')}>
                    <span>{data.nickname}</span>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </p>
                <span className={cx('name')}>{data.full_name}</span>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
