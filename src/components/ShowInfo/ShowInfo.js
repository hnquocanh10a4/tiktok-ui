import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import styles from './ShowInfo.module.scss';
// import Button from '../Button';
import InfoItem from './InfoItem';
const cx = classNames.bind(styles);

function ShowInfo({ children, data }) {
    return (
        <Tippy
            placement="bottom-start"
            interactive={true}
            delay={[500, 0]}
            render={(attrs) => (
                <div className={cx('content')} tabIndex="-1" {...attrs}>
                    <PopperWrapper classNames={cx('menu-popper')}>
                        <InfoItem data={data} />
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
