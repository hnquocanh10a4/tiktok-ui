import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCoins,
    faEllipsisVertical,
    faGear,
    faGlobeAfrica,
    faKeyboard,
    faQuestionCircle,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import config from '~/config';
import Button from '~/components/Button';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icon';
import Image from '~/components/Image';
import Search from '~/components/Search';
import authenticationSlice from '~/redux/slice/authenticationSlice';
import { getCurrentUserSelector } from '~/redux/selectors';

const cx = classNames.bind(styles);

// state true logined, false login failed
// const currentUser = false;

function Header() {
    // const [currentUser, setCurrentUser] = useState(false);
    const currentUser = useSelector(getCurrentUserSelector);
    console.log('currentUser', Object.keys(currentUser)?.length !== 0);
    console.log('currentUserDetail', currentUser);
    const dispatch = useDispatch();

    // if (Object.keys(user).length === 0) {
    //     setCurrentUser(false);
    // } else {
    //     setCurrentUser(true);
    // }
    const MENU_ITEM = [
        {
            icon: <FontAwesomeIcon icon={faGlobeAfrica} />,
            title: 'Language',
            children: {
                title: 'Language',
                data: [
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'vi',
                        title: 'VietNamese',
                    },
                    {
                        code: 'fr',
                        title: 'France',
                    },
                ],
            },
        },
        {
            icon: <FontAwesomeIcon icon={faQuestionCircle} />,
            title: 'Question and Help',
            to: '/',
        },
        {
            icon: <FontAwesomeIcon icon={faKeyboard} />,
            title: 'Keyboard',
        },
    ];

    const useMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@hoaahanassii',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            // to: '/coin',
            to: '/',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            // to: '/settings',
            to: '/',
        },
        ...MENU_ITEM,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            // to: '/logout',
            to: '/logout',
            separate: true,
        },
    ];

    const handleOpenLogin = () => {
        dispatch(authenticationSlice.actions.openpopUpForm());
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="tiktok"></img>
                </Link>
                {/* search */}
                <Search />
                <div className={cx('action')}>
                    {Object.keys(currentUser)?.length !== 0 ? (
                        <>
                            <Tippy delay={[0, 100]} content="Upload video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <Link to="upload">
                                        <UploadIcon />
                                    </Link>
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 100]} content="Message" placement="bottom" offset={[0, 12.8]}>
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 100]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button
                                text
                                onClick={() => {
                                    handleOpenLogin();
                                }}
                            >
                                Upload
                            </Button>
                            <Button
                                onClick={() => {
                                    handleOpenLogin();
                                }}
                                primary
                            >
                                Log in
                            </Button>
                        </>
                    )}
                    <Menu items={Object.keys(currentUser)?.length !== 0 ? useMenu : MENU_ITEM}>
                        {Object.keys(currentUser)?.length !== 0 ? (
                            <Image className={cx('userAvatar')} src={currentUser.avatar} alt="avatar" />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
