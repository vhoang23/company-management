import classNames from 'classnames/bind';
import styles from './ProfileEditor.module.scss';
import PageHeader from '../components/PageHeader/PageHeader';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import DetailInfo from '../Profile/components/DetailInfo/DetailInfo';
import moment from 'moment';
import Datetime from 'react-datetime';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProfileEditor() {
    const user = JSON.parse(localStorage.getItem('USER_INFO'));

    const navigate = useNavigate();

    const avatarinpRef = useRef();

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
                    result.data.birth_date = moment(result.data.birth_date).format();
                    result.data.joining_date = moment(result.data.joining_date).format();
                    setUserData(result.data);
                })
                .catch((error) => {
                    error = new Error();
                });
    }, [user?.emp_id]);

    const handleSubmit = () => {
        const formData = new FormData();

        formData.append('userData', JSON.stringify(userData));
        userData.user_avatar && formData.append('userAvatar', userData.user_avatar);

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
            params: { user },
        };

        axios
            .put(`http://localhost:5000/employees/personal-profile/${userData.emp_id}`, formData, config)
            .then((result) => {
                navigate(`/profile`, { replace: true });
            })
            .catch((error) => {
                error = new Error();
                console.log(error);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <PageHeader title="Edit Profile" />
            <div className={cx('container')}>
                <div className={cx('input-container')}>
                    <div className={cx('input-box', 'disabled')}>
                        <span className={cx('input-label')}>Employee ID*</span>
                        <input
                            value={userData.citizen_identification || ''}
                            placeholder="Employee ID*"
                            readOnly
                            className={cx('disabled')}
                        />
                    </div>

                    <div className={cx('input-box')}>
                        <span className={cx('input-label')}>Mobile*</span>
                        <input
                            value={userData.phone_num || ''}
                            placeholder="Mobile*"
                            onChange={(e) =>
                                setUserData((prev) => {
                                    return { ...prev, phone_num: e.target.value };
                                })
                            }
                        />
                    </div>

                    <div className={cx('input-box')}>
                        <span className={cx('input-label')}>Full name*</span>
                        <input
                            readOnly
                            className={cx('disabled')}
                            value={userData.emp_name || ''}
                            placeholder="Full name*"
                            onChange={(e) =>
                                setUserData((prev) => {
                                    return { ...prev, emp_name: e.target.value };
                                })
                            }
                        />
                    </div>

                    <div className={cx('drop-down-menu', 'input-box')}>
                        <span className={cx('input-label')}>Sex*</span>
                        <div className={cx('drop-down-header')}>
                            <span>{userData.sex === 1 ? 'Male' : 'Female'}</span>
                            <FontAwesomeIcon className={cx('drop-icon')} icon={faChevronDown} />
                        </div>
                    </div>

                    <div className={cx('drop-down-menu', 'input-box')}>
                        <span className={cx('input-label')}>Role*</span>
                        <div className={cx('drop-down-header')}>
                            <span>{userData.role}</span>
                            <FontAwesomeIcon className={cx('drop-icon')} icon={faChevronDown} />
                        </div>
                    </div>

                    <div className={cx('input-box')}>
                        <span className={cx('input-label')}>User Name*</span>
                        <input
                            readOnly
                            className={cx('disabled')}
                            value={userData.user_name || ''}
                            placeholder="User Name*"
                        />
                    </div>

                    <div className={cx('input-box')}>
                        <span className={cx('input-label')}>Password*</span>
                        <input
                            value={userData.password || ''}
                            placeholder="Password*"
                            onChange={(e) =>
                                setUserData((prev) => {
                                    return { ...prev, password: e.target.value };
                                })
                            }
                        />
                    </div>

                    <div className={cx('input-box')}>
                        <span className={cx('input-label')}>Salary*</span>
                        <input
                            readOnly
                            className={cx('disabled')}
                            value={userData.salary || ''}
                            placeholder="Salary*"
                        />
                    </div>

                    <div className={cx('input-box')}>
                        <span className={cx('input-label')}>Email*</span>
                        <input
                            value={userData.email || ''}
                            placeholder="Email*"
                            onChange={(e) =>
                                setUserData((prev) => {
                                    return { ...prev, email: e.target.value };
                                })
                            }
                        />
                    </div>

                    <div className={cx('drop-down-menu', 'input-box')}>
                        <span className={cx('input-label')}>Department*</span>
                        <div className={cx('drop-down-header')}>
                            <span>{userData.dep_name}</span>
                            <FontAwesomeIcon className={cx('drop-icon')} icon={faChevronDown} />
                        </div>
                    </div>

                    <div className={cx('input-box')}>
                        <span className={cx('input-label')}>Birth Date*</span>
                        <Datetime
                            value={new Date(userData.birth_date)}
                            onChange={(value) =>
                                setUserData((prev) => {
                                    return { ...prev, birth_date: value.format() };
                                })
                            }
                        />
                    </div>

                    <div className={cx('input-box')}>
                        <span className={cx('input-label')}>Joining Date*</span>
                        <Datetime value={moment(userData.joining_date)} open={false} />
                    </div>

                    <div className={cx('input-box', 'w100')}>
                        <span className={cx('input-label')}>About*</span>
                        <textarea
                            readOnly
                            className={cx('disabled')}
                            value={userData.about || ''}
                            rows={3}
                            placeholder="About*"
                        />
                    </div>

                    <div className={cx('input-box')}>
                        <span className={cx('input-label')}>Degree*</span>
                        <textarea
                            readOnly
                            className={cx('disabled')}
                            value={userData.degree || ''}
                            rows={3}
                            placeholder="Degree*"
                        />
                    </div>

                    <div className={cx('input-box')}>
                        <span className={cx('input-label')}>Education*</span>
                        <textarea
                            readOnly
                            className={cx('disabled')}
                            value={userData.education || ''}
                            rows={3}
                            placeholder="Education*"
                        />
                    </div>

                    <div className={cx('input-box')}>
                        <span className={cx('input-label')}>Experience*</span>
                        <textarea
                            readOnly
                            className={cx('disabled')}
                            value={userData.experience || ''}
                            rows={3}
                            placeholder="Experience*"
                        />
                    </div>
                    <div className={cx('input-box', 'address-inp')}>
                        <span className={cx('input-label')}>Address*</span>
                        <textarea
                            value={userData.address || ''}
                            rows={3}
                            placeholder="Address*"
                            onChange={(e) =>
                                setUserData((prev) => {
                                    return { ...prev, address: e.target.value };
                                })
                            }
                        />
                    </div>

                    <div className={cx('input-box', 'upload-img-area', 'w100')}>
                        <button onClick={() => avatarinpRef.current.click()}>Choose file</button>
                        <p>{userData?.user_avatar?.name || 'or drag and drop file here'}</p>
                    </div>
                </div>
                <div className={cx('footer')}>
                    <input
                        ref={avatarinpRef}
                        className={cx('avatar-input')}
                        type="file"
                        onChange={(e) =>
                            setUserData((prev) => {
                                return { ...prev, user_avatar: e.target.files[0] };
                            })
                        }
                    />
                    <button className={cx('submit-btn')} onClick={handleSubmit}>
                        Submit
                    </button>
                    <button className={cx('cancel-btn')}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ProfileEditor;
