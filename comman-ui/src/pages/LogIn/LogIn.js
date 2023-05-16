import classNames from 'classnames/bind';
import styles from './LogIn.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function LogIn() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = () => {
        const configuration = {
            method: 'post',
            url: `http://localhost:5000/auth/login`,
            data: {
                user_name: userName,
                password,
            },
        };
        axios(configuration)
            .then((result) => {
                if (result.status === 200) {
                    navigate('/posts', { replace: true });
                    localStorage.setItem('USER_INFO', JSON.stringify(result.data.user));
                } else {
                    console.log('Login fail :((');
                }
            })
            .catch((error) => {
                error = new Error();
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-side')}>
                <div className={cx('company-logo')}>
                    <img
                        src="https://einfosoft.com/templates/admin/kuber/source/light/assets/images/logo.png"
                        alt="logo"
                    />
                    <h2 className={cx('company-name')}>Company</h2>
                </div>
                <div className={cx('back-ground')}></div>
            </div>
            <div className={cx('log-in-box')}>
                <div className={cx('log-in-container')}>
                    <div className={cx('header')}>
                        <h2>Welcome to Kuber</h2>
                    </div>
                    <div className={cx('form-container')}>
                        <label>Log In</label>
                        <div className={cx('form-input')}>
                            <input placeholder="User name ....." onChange={(e) => setUserName(e.target.value)} />
                            <input placeholder="Password ....." onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div className={cx('footer')}>
                        <button className={cx('submit-btn')} onClick={handleSubmit}>
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
