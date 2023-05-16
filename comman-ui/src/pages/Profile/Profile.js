import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import PageHeader from '../components/PageHeader/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import DetailInfo from './components/DetailInfo/DetailInfo';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Profile() {
    const user = JSON.parse(localStorage.getItem('USER_INFO'));

    const [userData, setUserData] = useState({});

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

    const { emp_name, role, avatar, address, phone_num, email, about, education, experience } = userData;

    return (
        <div className={cx('wrapper')}>
            <PageHeader title="Profile" />
            <div className={cx('container')}>
                <div className={cx('contact-box')}>
                    <div className={cx('contact-header')}>
                        <h4 className={cx('user-name')}>{emp_name}</h4>
                        <p>{role}</p>
                    </div>
                    <div className={cx('user-avatar')}>
                        <img alt="avatar" src={avatar} />
                    </div>
                    <div className={cx('contact-content')}>
                        <p className={cx('address')}>{address}</p>
                        <div className={cx('phone-number')}>
                            <FontAwesomeIcon className={cx('phone-icon')} icon={faPhone} />
                            <p>{phone_num}</p>
                        </div>
                        <div className={cx('email')}>
                            <FontAwesomeIcon className={cx('email-icon')} icon={faEnvelope} />
                            <p>{email}</p>
                        </div>
                    </div>
                </div>
                <div className={cx('detail-info')}>
                    <DetailInfo about={about} education={education} experience={experience} />
                </div>
            </div>
        </div>
    );
}

export default Profile;
