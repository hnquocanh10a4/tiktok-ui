import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/components/Icon';

import { useState, useEffect } from 'react';
import config from '~/config';
import * as searchService from '~/services/searchService';
import AccountItem from '~/components/AccountItem';
import { useDispatch, useSelector } from 'react-redux';
import { getSuggesedUserSelector } from '~/redux/selectors';
import { getSuggesedUser } from './sideBarSlice';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function Sidebar() {
    // const [suggestAccount, setSuggestAccount] = useState([]);
    const [quantity, setQuantity] = useState(5);
    console.log(quantity);

    const dispatch = useDispatch();

    const suggestAccount = useSelector(getSuggesedUserSelector);

    useEffect(() => {
        // const featchApi = async () => {
        //     const result = await searchService.suggestAccount();
        //     // console.log(result);
        //     setSuggestAccount(result);
        // };
        // featchApi();
        dispatch(getSuggesedUser(quantity));
    }, [quantity]);

    // console.log(suggestAccount);
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
                <div className={cx('separate')}>
                    <h4>Suggested accounts</h4>
                    {suggestAccount?.map((item) => {
                        return <AccountItem key={item.id} data={item} showInfo={true} />;
                    })}
                    {quantity === 20 ? (
                        ''
                    ) : (
                        <Button
                            className={cx('more-btn')}
                            onClick={() => {
                                setQuantity(20);
                            }}
                        >
                            Xem tất cả ...
                        </Button>
                    )}
                </div>
            </Menu>
        </aside>
    );
}

export default Sidebar;
