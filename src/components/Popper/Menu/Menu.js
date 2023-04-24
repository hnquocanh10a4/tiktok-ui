import PropTypes from 'prop-types';
import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import classNames from 'classnames/bind';

import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

function Menu({ children, items = [], hideOnClick = false }) {
    const [childrenMenu, setChildrenMenu] = useState([]);

    // console.log('rerender items', items);
    // console.log('rerender childrenMenu', childrenMenu);

    const getListItem = items.map((item, index) => {
        const isParent = !!item.children;
        return (
            <MenuItem
                data={item}
                key={index}
                onClick={() => {
                    if (isParent) {
                        setChildrenMenu([item.children]);
                    }
                }}
            />
        );
    });

    const getChildrenListItem = childrenMenu[0]?.data?.map((item, index) => {
        return (
            <MenuItem
                data={item}
                key={index}
                onClick={() => {
                    // if () {
                    //     setChildrenMenu(item.children);
                    // }
                    // cai dat da ngon ngu
                }}
            />
        );
    });

    return (
        <Tippy
            hideOnClick={hideOnClick}
            offset={[12, 9]}
            onHide={() => setChildrenMenu([])}
            interactive={true}
            delay={[0, 700]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('content')} tabIndex="-1" {...attrs}>
                    <PopperWrapper classNames={cx('menu-popper')}>
                        {childrenMenu.length > 0 && (
                            <Header
                                title={childrenMenu[0].title}
                                onBack={() => {
                                    setChildrenMenu([]);
                                }}
                            />
                        )}
                        <div className={cx('menu-body')}>
                            {childrenMenu.length === 0 ? getListItem : getChildrenListItem}
                        </div>
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
};

export default Menu;
