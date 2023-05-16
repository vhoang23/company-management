import classNames from 'classnames/bind';
import styles from './AddPost.module.scss';
import PageHeader from '../components/PageHeader/PageHeader';
import { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function AddPost() {
    const user = JSON.parse(localStorage.getItem('USER_INFO'));

    const navigate = useNavigate();

    const [postData, setPostData] = useState({
        content: '',
    });

    const handleSubmit = () => {
        const configuration = {
            method: 'post',
            url: `http://localhost:5000/posts`,
            data: {
                ...postData,
                created_at: moment(new Date()).format(),
            },
            params: {
                user,
            },
        };
        postData.content &&
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
            <PageHeader title="Add Post" />
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

export default AddPost;
