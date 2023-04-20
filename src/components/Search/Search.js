import { useEffect, useState, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icon';
import { useDebounce } from '~/hooks';
import { useSelector, useDispatch } from 'react-redux';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { searchLoadingSelector, searchResultSelector } from '~/redux/selectors';
import searchSlice, { search } from '../../redux/slice/searchSlice';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);

    const searchResult = useSelector(searchResultSelector);
    const showLoading = useSelector(searchLoadingSelector);

    const dispatch = useDispatch();

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            dispatch(searchSlice.actions.clearSearchResults());
            return;
        }

        dispatch(search(debouncedValue));
    }, [debouncedValue]);

    const handleShowResult = () => {
        setShowResult(false);
    };
    return (
        // Using a wrapper <div> tag around the reference element solves
        // this by creating a new parentNode context.
        <div>
            {/* search result tab  */}
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
                                searchSlice.actions.clearSearchResults();
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
