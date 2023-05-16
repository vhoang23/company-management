import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Header() {
    const [userData, setUserData] = useState({});

    const user = JSON.parse(localStorage.getItem('USER_INFO'));

    useEffect(() => {
        const configuration = {
            method: 'get',
            url: `http://localhost:5000/employees/${user?.emp_id}`,
            params: { user, emp_id: user?.emp_id },
        };
        user?.emp_id &&
            axios(configuration)
                .then((result) => {
                    setUserData(result.data);
                })
                .catch((error) => {
                    error = new Error();
                });
    }, [user?.emp_id]);

    const checkSameDay = (day1, day2) => {
        return (
            day1.getFullYear() === day2.getFullYear() &&
            day1.getMonth() === day2.getMonth() &&
            day1.getDate() === day2.getDate()
        );
    };

    return (
        <div className={cx('wrapper')}>
            {checkSameDay(new Date(user?.birth_date), new Date()) && (
                <marquee className={cx('congratulation-text')}>
                    {`Happy Birthday ${user.emp_name}. I hope your celebration gives you many happy memories! 🎉 🎉 🎉`}
                </marquee>
            )}
            <div className={cx('user-container')}>
                <p className={cx('user-name')}>{userData.emp_name}</p>
                <img className={cx('user-img')} src={userData.avatar} alt="user-img" />
            </div>
        </div>
    );
}

export default Header;
