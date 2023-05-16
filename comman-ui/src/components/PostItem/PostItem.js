import classNames from 'classnames/bind';
import styles from './PostItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function PostItem({ post, className, isOwner, onDeletePost }) {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return (
        <div className={cx('wrapper', { [className]: className })}>
            <div className={cx('header')}>
                <div className={cx('user-avatar')}>
                    <img src={post.avatar} alt="user-avatar" />
                </div>
                <div className={cx('info')}>
                    <div>
                        <span className={cx('user-name')}>{post.emp_name}</span>
                        <span> posted on </span>
                        <span className={cx('dep-name')}>{post.dep_name}</span>
                    </div>
                    <span className={cx('time-stamp')}>{formatDate(post.created_at)}</span>
                </div>
                {isOwner && (
                    <div className={cx('col-item', 'flex-5')}>
                        <button
                            className={cx('action-btn', 'edit-btn')}
                            onClick={() => {
                                navigate(`/posts/edit-post/${post.post_id}`, { replace: true });
                            }}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>

                        <button className={cx('action-btn', 'remove-btn')} onClick={() => onDeletePost(post.post_id)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                )}
            </div>
            <div className={cx('content')}>
                <p>{post.content}</p>
            </div>
        </div>
    );
}

export default PostItem;
