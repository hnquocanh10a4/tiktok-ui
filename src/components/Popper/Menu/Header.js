import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Header({ title, onBack }) {
    return (
        <div className={cx('title-menu')}>
            <FontAwesomeIcon icon={faChevronLeft} className={cx('title-menu-icon')} onClick={onBack} />
            <h4 className={cx('title-menu-title')}>{title}</h4>
        </div>
    );
}

export default Header;
