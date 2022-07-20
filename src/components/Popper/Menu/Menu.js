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
    const [historyList, setHistoryList] = useState([{ data: items }]);

    let currentList = historyList[historyList.length - 1];

    // console.log(currentList);

    const getListItem = currentList.data.map((item, index) => {
        const isParent = !!item.children;
        return (
            <MenuItem
                data={item}
                key={index}
                onClick={() => {
                    if (isParent) {
                        setHistoryList((pre) => {
                            return [...pre, item.children];
                        });
                    }
                }}
            />
        );
    });
    return (
        <Tippy
            hideOnClick={hideOnClick}
            offset={[12, 9]}
            onHide={() =>
                setHistoryList((pre) => {
                    return pre.slice(0, 1);
                })
            }
            interactive={true}
            delay={[0, 700]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('content')} tabIndex="-1" {...attrs}>
                    <PopperWrapper classNames={cx('menu-popper')}>
                        {historyList.length > 1 && (
                            <Header
                                title={currentList.title}
                                onBack={() => {
                                    setHistoryList((pre) => {
                                        return pre.slice(0, pre.length - 1);
                                    });
                                }}
                            />
                        )}
                        <div className={cx('menu-body')}>{getListItem}</div>
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
