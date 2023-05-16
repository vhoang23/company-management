import classNames from 'classnames/bind';
import styles from './NavItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function NavItem({ labelName, labelIcon, navList, to, active }) {
    const user = JSON.parse(localStorage.getItem('USER_INFO'));

    const [isShowMenu, setIsShowMenu] = useState(false);

    let Comp = to ? NavLink : 'div';

    return (
        <Comp to={to} className={cx('wrapper', { active: active })}>
            <div
                className={cx('label')}
                onClick={() => {
                    if (navList) {
                        setIsShowMenu((prev) => !prev);
                    } else {
                        setIsShowMenu(true);
                    }
                }}
            >
                <div className={cx('label-container')}>
                    <span className={cx('label-icon')}>{labelIcon}</span>
                    <p className={cx('label-name')}>{labelName}</p>
                </div>
                {navList && (
                    <span>
                        {isShowMenu ? (
                            <FontAwesomeIcon className={cx('drop-icon')} icon={faChevronDown} />
                        ) : (
                            <FontAwesomeIcon className={cx('drop-icon')} icon={faChevronRight}></FontAwesomeIcon>
                        )}
                    </span>
                )}
            </div>

            {isShowMenu && navList && (
                <ul className={cx('drop-down-menu')}>
                    {navList.map((item, index) => {
                        if (!item.for) {
                            return (
                                <Link key={index} className={cx('item-link')} to={item.to}>
                                    <li className={cx('menu-item')}>
                                        <p>{item.name}</p>
                                    </li>
                                </Link>
                            );
                        } else {
                            if (
                                item?.for?.includes(user.role) ||
                                (item?.for?.includes('Employee') && user.role !== 'Director')
                            ) {
                                return (
                                    <Link key={index} className={cx('item-link')} to={item.to}>
                                        <li className={cx('menu-item')}>
                                            <p>{item.name}</p>
                                        </li>
                                    </Link>
                                );
                            } else {
                                return <></>;
                            }
                        }
                    })}
                </ul>
            )}
        </Comp>
    );
}

export default NavItem;
