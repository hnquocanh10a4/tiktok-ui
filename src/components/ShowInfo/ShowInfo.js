import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useSelector } from 'react-redux';

import styles from './ShowInfo.module.scss';
// import Button from '../Button';
import InfoItem from './InfoItem';
import { getFollowingListSelector } from '~/redux/selectors';
const cx = classNames.bind(styles);

function ShowInfo({ children, data }) {
    const followingList = useSelector(getFollowingListSelector);

    return (
        <Tippy
            placement="bottom-start"
            interactive={true}
            delay={[500, 0]}
            render={(attrs) => (
                <div className={cx('content')} tabIndex="-1" {...attrs}>
                    <PopperWrapper classNames={cx('menu-popper')}>
                        <InfoItem data={data} followingList={followingList} />
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

ShowInfo.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ShowInfo;
