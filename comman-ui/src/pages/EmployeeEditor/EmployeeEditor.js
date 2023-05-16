import classNames from 'classnames/bind';
import styles from './EmployeeEditor.module.scss';
import PageHeader from '../components/PageHeader/PageHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Datetime from 'react-datetime';
import moment from 'moment';

const cx = classNames.bind(styles);

function EmployeeEditor() {
    const user = JSON.parse(localStorage.getItem('USER_INFO'));

    const { empId } = useParams();
    const navigate = useNavigate();

    const avatarinpRef = useRef();

    const [userData, setUserData] = useState({});

    const [isOpenDepPicker, setIsOpenDepPicker] = useState();
    const [isOpenSexPicker, setIsOpenSexPicker] = useState();
    const [isOpenRolePicker, setIsOpenRolePicker] = useState();

    const [departments, setDepartments] = useState([]);

    const user_role = useRef('');

    useEffect(() => {
        const configuration = {
            method: 'get',
            url: 'http://localhost:5000/departments',
            params: {
                user,
            },
        };
        axios(configuration)
            .then((result) => {
                setDepartments(result.data);
                let ind = result.data.findIndex((dep) => {
                    return dep.dep_id === user?.dep_id;
                });
                if (ind === -1) {
                    ind = 0;
                }
                setUserData((prev) => {
                    return {
                        ...prev,
                        dep_id: result.data[ind].dep_id,
                        dep_name: result.data[ind].dep_name,
                    };
                });
            })
            .catch((error) => {
                error = new Error();
            });
    }, []);

    useEffect(() => {
        const configuration = {
            method: 'get',
            url: `http://localhost:5000/employees/${empId}`,
            params: {
                user,
                emp_id: empId,
            },
        };
        empId &&
            axios(configuration)
                .then((result) => {
                    result.data.birth_date = moment(result.data.birth_date).format();
                    result.data.joining_date = moment(result.data.joining_date).format();
                    user_role.current = result.data.role;
                    setUserData(result.data);
                })
                .catch((error) => {
                    error = new Error();
                });
    }, [empId]);

    const handleSubmit = () => {
        const formData = new FormData();

        formData.append('userData', JSON.stringify(userData));
        userData.user_avatar && formData.append('userAvatar', userData.user_avatar);

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
            params: { user },
        };

        axios
            .put(`http://localhost:5000/employees/${userData.emp_id}`, formData, config)
            .then((result) => {
                navigate('/employees', { replace: true });
            })
            .catch((error) => {
                if ((error.response.data.code = 'ER_DUP_ENTRY')) {
                    alert('User name is exist :(');
                }
                error = new Error();
            });
    };

    return (
        <div className={cx('wrapper')}>
            <PageHeader title="Edit Employee" />
            <div className={cx('container')}>
                <div className={cx('input-container')}>
                    <div className={cx('input-box')}>
                        <span className={cx('input-label')}>Employee ID*</span>
                        <input
                            value={userData.citizen_identification || ''}
                            placeholder="Employee ID*"
                            onChange={(e) =>
                                setUserData((prev) => {
                                    return { ...prev, citizen_identification: e.target.value };
                                })
                            }
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
                        <div className={cx('drop-down-header')} onClick={() => setIsOpenSexPicker((prev) => !prev)}>
                            <span>{userData.sex === 1 ? 'Male' : 'Female'}</span>
                            <FontAwesomeIcon className={cx('drop-icon')} icon={faChevronDown} />
                        </div>
                        {isOpenSexPicker && (
                            <ul className={cx('item-list')} onClick={() => setIsOpenSexPicker(false)}>
                                <li
                                    onClick={(e) =>
                                        setUserData((prev) => {
                                            return { ...prev, sex: 1 };
                                        })
                                    }
                                >
                                    Male
                                </li>
                                <li
                                    onClick={(e) =>
                                        setUserData((prev) => {
                                            return { ...prev, sex: 0 };
                                        })
                                    }
                                >
                                    Female
                                </li>
                            </ul>
                        )}
                    </div>

                    <div className={cx('drop-down-menu', 'input-box')}>
                        <span className={cx('input-label')}>Role*</span>
                        <div className={cx('drop-down-header')} onClick={() => setIsOpenRolePicker((prev) => !prev)}>
                            <span>{userData.role}</span>
                            <FontAwesomeIcon className={cx('drop-icon')} icon={faChevronDown} />
                        </div>
                        {isOpenRolePicker && user_role.current !== 'Manager' && user_role.current !== 'Director' && (
                            <ul className={cx('item-list')} onClick={() => setIsOpenRolePicker(false)}>
                                {user?.role === 'Director' && (
                                    <li
                                        onClick={(e) =>
                                            setUserData((prev) => {
                                                return { ...prev, role: 'Manager' };
                                            })
                                        }
                                    >
                                        Manager
                                    </li>
                                )}
                                <li
                                    onClick={(e) =>
                                        setUserData((prev) => {
                                            return { ...prev, role: 'Tester' };
                                        })
                                    }
                                >
                                    Tester
                                </li>
                                <li
                                    onClick={(e) =>
                                        setUserData((prev) => {
                                            return { ...prev, role: 'Designer' };
                                        })
                                    }
                                >
                                    Designer
                                </li>
                                <li
                                    onClick={(e) =>
                                        setUserData((prev) => {
                                            return { ...prev, role: 'Developer' };
                                        })
                                    }
                                >
                                    Developer
                                </li>
                            </ul>
                        )}
                    </div>

                    <div className={cx('input-box')}>
                        <span className={cx('input-label')}>User Name*</span>
                        <input
                            value={userData.user_name || ''}
                            placeholder="User Name*"
                            onChange={(e) =>
                                setUserData((prev) => {
                                    return { ...prev, user_name: e.target.value };
                                })
                            }
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
                            value={userData.salary || ''}
                            placeholder="Salary*"
                            onChange={(e) =>
                                setUserData((prev) => {
                                    return { ...prev, salary: e.target.value };
                                })
                            }
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

                    {user_role.current !== 'Director' && (
                        <div className={cx('drop-down-menu', 'input-box')}>
                            <span className={cx('input-label')}>Department*</span>
                            <div className={cx('drop-down-header')} onClick={() => setIsOpenDepPicker((prev) => !prev)}>
                                <span>{userData.dep_name}</span>
                                <FontAwesomeIcon className={cx('drop-icon')} icon={faChevronDown} />
                            </div>
                            {isOpenDepPicker && user?.role === 'Director' && userData.role !== 'Manager' && (
                                <ul className={cx('item-list')} onClick={() => setIsOpenDepPicker(false)}>
                                    {departments?.map((dep) => (
                                        <li
                                            key={dep.dep_id}
                                            onClick={(e) =>
                                                setUserData((prev) => {
                                                    return { ...prev, dep_id: dep.dep_id, dep_name: dep.dep_name };
                                                })
                                            }
                                        >
                                            {dep.dep_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

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
                        <Datetime
                            value={moment(userData.joining_date)}
                            onChange={(value) =>
                                setUserData((prev) => {
                                    return { ...prev, joining_date: value.format() };
                                })
                            }
                        />
                    </div>

                    <div className={cx('input-box', 'w100')}>
                        <span className={cx('input-label')}>About*</span>
                        <textarea
                            value={userData.about || ''}
                            rows={3}
                            placeholder="About*"
                            onChange={(e) =>
                                setUserData((prev) => {
                                    return { ...prev, about: e.target.value };
                                })
                            }
                        />
                    </div>

                    <div className={cx('input-box')}>
                        <span className={cx('input-label')}>Degree*</span>
                        <textarea
                            value={userData.degree || ''}
                            rows={3}
                            placeholder="Degree*"
                            onChange={(e) =>
                                setUserData((prev) => {
                                    return { ...prev, degree: e.target.value };
                                })
                            }
                        />
                    </div>

                    <div className={cx('input-box')}>
                        <span className={cx('input-label')}>Education*</span>
                        <textarea
                            value={userData.education || ''}
                            rows={3}
                            placeholder="Education*"
                            onChange={(e) =>
                                setUserData((prev) => {
                                    return { ...prev, education: e.target.value };
                                })
                            }
                        />
                    </div>

                    <div className={cx('input-box')}>
                        <span className={cx('input-label')}>Experience*</span>
                        <textarea
                            value={userData.experience || ''}
                            rows={3}
                            placeholder="Experience*"
                            onChange={(e) =>
                                setUserData((prev) => {
                                    return { ...prev, experience: e.target.value };
                                })
                            }
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

export default EmployeeEditor;
