import classNames from 'classnames/bind';
import styles from './DocumentItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function DocumentItem({ src, title, file_name, className, onRemoveDocument }) {
    const user = JSON.parse(localStorage.getItem('USER_INFO'));

    const downloadFile = (url, filename) => {
        axios.get(url, { responseType: 'blob' }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        });
    };

    return (
        <div className={cx('wrapper', { [className]: className })} onClick={() => downloadFile(src, file_name)}>
            <div className={cx('container')}>
                <FontAwesomeIcon className={cx('doc-icon')} icon={faFile} />
                <div className={cx('doc-name')}>{title}</div>
            </div>
            <button
                className={cx('remove-btn')}
                onClick={(e) => {
                    e.stopPropagation();
                    onRemoveDocument();
                }}
            >
                <FontAwesomeIcon className={cx('remove-icon')} icon={faXmark} />
            </button>
        </div>
    );
}

export default DocumentItem;
