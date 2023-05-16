import classNames from 'classnames/bind';
import styles from './DetailInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function DetailInfo({ about, education, experience }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info-group')}>
                <label className={cx('label')}>About</label>
                <div className={cx('content')}>{about}</div>
            </div>
            <div className={cx('info-group')}>
                <label className={cx('label')}>Education</label>
                <div className={cx('content')}>{education}</div>
            </div>
            <div className={cx('info-group')}>
                <label className={cx('label')}>Experience</label>
                <div className={cx('content')}>{experience}</div>
            </div>
        </div>
    );
}

export default DetailInfo;
