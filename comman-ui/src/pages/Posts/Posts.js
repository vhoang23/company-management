import classNames from 'classnames/bind';
import styles from './Posts.module.scss';
import PostItem from '~/components/PostItem/PostItem';
import PageHeader from '../components/PageHeader/PageHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Posts() {
    const [posts, setPosts] = useState([]);

    const user = JSON.parse(localStorage.getItem('USER_INFO'));

    const fetchPosts = () => {
        const configuration = {
            method: 'get',
            url: `http://localhost:5000/posts/`,
            params: {
                user,
            },
        };

        axios(configuration)
            .then((result) => {
                setPosts(result.data);
            })
            .catch((error) => {
                console.log(error);
                error = new Error();
            });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDeletePost = (post_id) => {
        const configuration = {
            method: 'delete',
            url: `http://localhost:5000/posts/${post_id}`,
            params: {
                user,
            },
            data: {
                post_id,
            },
        };

        axios(configuration)
            .then((result) => {
                fetchPosts();
            })
            .catch((error) => {
                error = new Error();
            });
    };

    return (
        <div className={cx('wrapper')}>
            <PageHeader title="All Posts" />
            <div className={cx('container')}>
                {posts.map((post) => (
                    <PostItem
                        key={post.post_id}
                        className={cx('mt-16')}
                        post={post}
                        isOwner={user?.emp_id === post.creator_id}
                        onDeletePost={handleDeletePost}
                    />
                ))}
            </div>
        </div>
    );
}

export default Posts;
