import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

function Popper({ handleClickOutSide, children }) {
    return (
        <div className={cx('wrapper')} onClick={() => handleClickOutSide(false)}>
            <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Popper;
