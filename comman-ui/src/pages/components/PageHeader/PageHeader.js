import classNames from 'classnames/bind';
import styles from './PageHeader.module.scss';

import { faChevronRight, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function PageHeader({ title }) {
    return (
        <div className={cx('header')}>
            <div className={cx('page-name')}>
                <h2>{title}</h2>
            </div>
            <div className={cx('location')}>
                <span>
                    <FontAwesomeIcon icon={faHouse} />
                </span>
                <span>
                    <FontAwesomeIcon icon={faChevronRight} />
                </span>
                <span>Library</span>
                <span>
                    <FontAwesomeIcon icon={faChevronRight} />
                </span>
                <span>All Documents</span>
            </div>
        </div>
    );
}

export default PageHeader;
