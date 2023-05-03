import classNames from 'classnames/bind';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from '../Home/Home.module.scss';
import { getCurrentUserSelector, getFollowingListSelector, getVideoListSelector } from '~/redux/selectors';
import { getVideolist } from '~/redux/slice/homeSlice';
import PostItem from '../Home/PostItem/PostItem';
import { getFollowingList } from '~/redux/slice/followingSlice';
import authenticationSlice from '~/redux/slice/authenticationSlice';

const cx = classNames.bind(styles);

function Following() {
    const [page, setPage] = useState(1);

    let videoList = useSelector(getVideoListSelector);
    const followingList = useSelector(getFollowingListSelector);
    const currentUser = useSelector(getCurrentUserSelector);
    const dispatch = useDispatch();

    // console.log(videoList, 'videoList');
    if (Object.keys(currentUser)?.length === 0) {
        dispatch(authenticationSlice.actions.openpopUpForm());
    }
    // console.log(location.pathname, 'location.pathname');

    // console.log(followingList, 'followingList');

    useEffect(() => {
        dispatch(getVideolist(page));
    }, [page, dispatch]);

    const fetchMoreData = () => {
        console.log('cong them 1');
        setPage(page + 1);
    };
    return (
        <div className={cx('wrapper')}>
            <InfiniteScroll
                dataLength={videoList.length}
                next={fetchMoreData}
                hasMore={true}
                loader={
                    <div className={cx('loading-wrap')}>
                        <div className={cx('green-ball')}></div>
                        <div className={cx('red-ball')}></div>
                    </div>
                }
            >
                {videoList
                    .filter((item) => {
                        return item.user.is_followed === true;
                    })
                    .map((item) => {
                        return <PostItem key={item.id} data={item} followingList={followingList} />;
                        // return <p>{item.id}</p>;
                    })}
            </InfiniteScroll>
        </div>
    );
}

export default Following;
