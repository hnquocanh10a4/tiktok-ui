import classNames from 'classnames/bind';
import styles from '~/components/Popper/Popper.module.scss';

const cx = classNames.bind(styles);

function Wrapper({ children, classNames }) {
    return <div className={cx('wrapper', classNames)}>{children}</div>;
}

export default Wrapper;
