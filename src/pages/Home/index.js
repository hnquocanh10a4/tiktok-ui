import PostItem from './PostItem';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';

const cx = classNames.bind(styles);

const data = [
    {
        id: 0,
        name: 'Mo Farooq',
        username: 'mofarooq32',
        avatar: 'https://i.imgur.com/9KYq7VG.png',
        is_followed: true,
        video: 'https://i.imgur.com/FTBP02Y.mp4',
        caption: 'These ducks are MEGA cute',
        likes: 10,
        share: 8,
        comments: 2,
        timestamp: '2019-03-10T09:08:31.020Z',
        button_visible: true,
    },
    {
        id: 1,
        name: 'Tim Salowski',
        username: 'timmytam',
        avatar: 'https://i.imgur.com/rWYtZa6.png',
        is_followed: false,
        video: 'https://i.imgur.com/1A7AKoF.mp4',
        caption: 'When your fries give you attitude #getInMyBelly',
        share: 8,
        likes: 12,
        comments: 2,
        timestamp: '2020-03-10T09:08:31.020Z',
        button_visible: true,
    },
    {
        id: 2,
        name: 'Angela Lee',
        username: 'angiecakes',
        avatar: 'https://i.imgur.com/eX3hkoc.png',
        is_followed: true,
        video: 'https://i.imgur.com/al6MLay.mp4',
        caption: 'Happiest of Birthdays my Angel',
        likes: 2,
        share: 8,
        comments: 4,
        timestamp: '2020-04-10T09:08:31.020Z',
        button_visible: true,
    },
    {
        id: 3,
        name: 'Nina Xen',
        username: 'nina_lina',
        avatar: 'https://i.imgur.com/IigY4Hm.png',
        is_followed: false,
        video: 'https://i.imgur.com/Kzvbeup.mp4',
        caption: 'The new normal',
        likes: 10,
        share: 8,
        comments: 2,
        timestamp: '2020-05-10T09:08:31.020Z',
        button_visible: true,
    },
    {
        id: 4,
        name: 'Lana Del Mont',
        username: 'lana_del_away',
        avatar: 'https://i.imgur.com/jONHmE5.png',
        is_followed: true,
        video: 'https://i.imgur.com/H9UX0Jm.mp4',
        caption: 'Art is for everyone',
        likes: 231,
        share: 8,
        comments: 20,
        timestamp: '2020-09-10T09:08:31.020Z',
        button_visible: true,
    },
    {
        id: 5,
        name: 'Mo Farooq',
        username: 'mofarooq32',
        avatar: 'https://i.imgur.com/9KYq7VG.png',
        is_followed: true,
        video: 'https://i.imgur.com/FTBP02Y.mp4',
        caption: 'These ducks are MEGA cute',
        likes: 10,
        share: 8,
        comments: 2,
        timestamp: '2019-03-10T09:08:31.020Z',
        button_visible: true,
    },
    {
        id: 6,
        name: 'Tim Salowski',
        username: 'timmytam',
        avatar: 'https://i.imgur.com/rWYtZa6.png',
        is_followed: false,
        video: 'https://i.imgur.com/1A7AKoF.mp4',
        caption: 'When your fries give you attitude #getInMyBelly',
        share: 8,
        likes: 12,
        comments: 2,
        timestamp: '2020-03-10T09:08:31.020Z',
        button_visible: true,
    },
    {
        id: 7,
        name: 'Angela Lee',
        username: 'angiecakes',
        avatar: 'https://i.imgur.com/eX3hkoc.png',
        is_followed: true,
        video: 'https://i.imgur.com/al6MLay.mp4',
        caption: 'Happiest of Birthdays my Angel',
        likes: 2,
        share: 8,
        comments: 4,
        timestamp: '2020-04-10T09:08:31.020Z',
        button_visible: true,
    },
    {
        id: 8,
        name: 'Nina Xen',
        username: 'nina_lina',
        avatar: 'https://i.imgur.com/IigY4Hm.png',
        is_followed: false,
        video: 'https://i.imgur.com/Kzvbeup.mp4',
        caption: 'The new normal',
        likes: 10,
        share: 8,
        comments: 2,
        timestamp: '2020-05-10T09:08:31.020Z',
        button_visible: true,
    },
    {
        id: 9,
        name: 'Mo Farooq',
        username: 'mofarooq32',
        avatar: 'https://i.imgur.com/9KYq7VG.png',
        is_followed: true,
        video: 'https://i.imgur.com/FTBP02Y.mp4',
        caption: 'These ducks are MEGA cute',
        likes: 10,
        share: 8,
        comments: 2,
        timestamp: '2019-03-10T09:08:31.020Z',
        button_visible: true,
    },
    {
        id: 10,
        name: 'Tim Salowski',
        username: 'timmytam',
        avatar: 'https://i.imgur.com/rWYtZa6.png',
        is_followed: false,
        video: 'https://i.imgur.com/1A7AKoF.mp4',
        caption: 'When your fries give you attitude #getInMyBelly',
        share: 8,
        likes: 12,
        comments: 2,
        timestamp: '2020-03-10T09:08:31.020Z',
        button_visible: true,
    },
    {
        id: 11,
        name: 'Angela Lee',
        username: 'angiecakes',
        avatar: 'https://i.imgur.com/eX3hkoc.png',
        is_followed: true,
        video: 'https://i.imgur.com/al6MLay.mp4',
        caption: 'Happiest of Birthdays my Angel',
        likes: 2,
        share: 8,
        comments: 4,
        timestamp: '2020-04-10T09:08:31.020Z',
        button_visible: true,
    },
    {
        id: 12,
        name: 'Nina Xen',
        username: 'nina_lina',
        avatar: 'https://i.imgur.com/IigY4Hm.png',
        is_followed: false,
        video: 'https://i.imgur.com/Kzvbeup.mp4',
        caption: 'The new normal',
        likes: 10,
        share: 8,
        comments: 2,
        timestamp: '2020-05-10T09:08:31.020Z',
        button_visible: true,
    },
];

let count = 3;
function Home() {
    const [item, setItem] = useState(data.slice(0, count));

    const fetchMoreData = () => {
        setTimeout(() => {
            console.log(count);
            count = count + 3;
            console.log(count);
            setItem(data.slice(0, count));
        }, 1400);
    };
    return (
        <div className={cx('wrapper')}>
            <InfiniteScroll
                dataLength={item.length * 3}
                next={fetchMoreData}
                hasMore={true}
                loader={
                    <div className={cx('loading-wrap')}>
                        <div className={cx('green-ball')}></div>
                        <div className={cx('red-ball')}></div>
                    </div>
                }
            >
                {item.map((item) => {
                    return <PostItem key={item.id} data={item} />;
                })}
            </InfiniteScroll>
        </div>
    );
}

export default Home;
