import classNames from 'classnames/bind';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PostItem from './PostItem';
import styles from './Home.module.scss';
import { getVideoListSelector } from '~/redux/selectors';
import { getVideolist } from './homeSlice';

const cx = classNames.bind(styles);

function Home() {
    const [page, setPage] = useState(1);

    const videoList = useSelector(getVideoListSelector);
    console.log(videoList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideolist(page));
    }, [page]);

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
                {videoList.map((item) => {
                    return <PostItem key={item.id} data={item} />;
                    // return <p>{item.id}</p>;
                })}
            </InfiniteScroll>
        </div>
    );
}

export default Home;
