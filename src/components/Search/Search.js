import { useEffect, useState, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icon';
import { useDebounce } from '~/hooks';

import * as searchService from '~/services/searchService';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [showLoading, setShowLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const featchApi = async () => {
            setShowLoading(true);
            const result = await searchService.search(debouncedValue);
            setSearchResult(result);
            setShowLoading(false);
        };
        featchApi();
    }, [debouncedValue]);

    const handleShowResult = () => {
        setShowResult(false);
    };
    return (
        // Using a wrapper <div> tag around the reference element solves
        // this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                visible={searchResult.length > 0 && showResult}
                interactive={true}
                render={(attrs) => (
                    <div
                        className={cx('search-result')}
                        tabIndex="-1"
                        {...attrs}
                        onClick={() => {
                            setShowResult(false);
                        }}
                    >
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((item) => (
                                <AccountItem key={item.id} data={item} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleShowResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={(e) => {
                            if (!e.target.value.startsWith(' ')) {
                                setSearchValue(e.target.value);
                            }
                        }}
                        onFocus={() => {
                            setShowResult(true);
                        }}
                    />

                    {searchValue && !showLoading ? (
                        <button
                            className={cx('clear')}
                            onClick={() => {
                                setSearchValue('');
                                inputRef.current.focus();
                                setSearchResult([]);
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    ) : (
                        <></>
                    )}

                    {showLoading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    {/* loading */}
                    <button
                        className={cx('search-btn')}
                        onMouseDown={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
