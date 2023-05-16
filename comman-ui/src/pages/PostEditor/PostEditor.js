import classNames from 'classnames/bind';
import styles from './PostEditor.module.scss';
import PageHeader from '../components/PageHeader/PageHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const cx = classNames.bind(styles);

function PostEditor() {
    const user = JSON.parse(localStorage.getItem('USER_INFO'));

    const navigate = useNavigate();

    const { postId } = useParams();

    const [postData, setPostData] = useState({});

    useEffect(() => {
        const configuration = {
            method: 'get',
            url: `http://localhost:5000/posts/${postId}`,
            params: {
                user,
            },
        };
        postId &&
            axios(configuration)
                .then((result) => {
                    setPostData(result.data[0]);
                })
                .catch((error) => {
                    error = new Error();
                });
    }, [postId]);

    const handleSubmit = () => {
        const configuration = {
            method: 'put',
            url: `http://localhost:5000/posts/${postId}`,
            params: {
                user,
            },
            data: {
                ...postData,
            },
        };
        axios(configuration)
            .then((result) => {
                navigate('/posts', { replace: true });
            })
            .catch((error) => {
                error = new Error();
            });
    };

    return (
        <div className={cx('wrapper')}>
            <PageHeader title="Edit Post" />
            <div className={cx('container')}>
                <div className={cx('input-container')}>
                    <div className={cx('input-box')}>
                        <textarea
                            value={postData.content}
                            rows={10}
                            placeholder="Content*"
                            onChange={(e) =>
                                setPostData((prev) => {
                                    return { ...prev, content: e.target.value };
                                })
                            }
                        />
                    </div>
                </div>
                <div className={cx('footer')}>
                    <button className={cx('submit-btn')} onClick={handleSubmit}>
                        Submit
                    </button>
                    <button className={cx('cancel-btn')}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default PostEditor;
