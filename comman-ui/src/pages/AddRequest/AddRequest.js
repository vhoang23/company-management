import classNames from 'classnames/bind';
import styles from './AddRequest.module.scss';
import PageHeader from '~/pages/components/PageHeader/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function AddRequest() {
    const user = JSON.parse(localStorage.getItem('USER_INFO'));

    const navigate = useNavigate();

    const [isShowDestinationMenu, setIsShowDestinationMenu] = useState(false);
    const [isShowTypeReqMenu, setIsShowTypeReqMenu] = useState(false);

    const [reqData, setReqData] = useState({
        creator_id: user?.emp_id,
        receiver_id: 0,
        req_type: 'Maternity Leave',
        content: '',
        created_at: moment(new Date()).format(),
    });

    const [managers, setManagers] = useState([]);

    useEffect(() => {
        const configuration = {
            method: 'get',
            url: `http://localhost:5000/employees/managers`,
            params: {
                user,
            },
        };
        axios(configuration)
            .then((result) => {
                setManagers(result.data);
                setReqData((prev) => {
                    return {
                        ...prev,
                        receiver_id: result.data[0].emp_id,
                        receiver_name: result.data[0].emp_name,
                        receiver_role: result.data[0].role,
                        dep_name: result.data[0].dep_name,
                    };
                });
            })
            .catch((error) => {
                error = new Error();
            });
    }, []);

    const handleSubmit = () => {
        const configuration = {
            method: 'post',
            url: `http://localhost:5000/requests`,
            data: reqData,
            params: {
                user,
            },
        };
        axios(configuration)
            .then((result) => {
                navigate('/requests/sent-requests', { replace: true });
            })
            .catch((error) => {
                error = new Error();
            });
    };

    return (
        <div className={cx('wrapper')}>
            <PageHeader title="Add Request" />
            <div className={cx('container')}>
                <div className={cx('input-container')}>
                    <div className={cx('drop-input')}>
                        <div className={cx('drop-down-menu')}>
                            <div
                                className={cx('drop-down-header')}
                                onClick={() => setIsShowDestinationMenu((prev) => !prev)}
                            >
                                <span>
                                    {`${reqData?.receiver_name} - ${reqData?.dep_name} - ${reqData?.receiver_role}`}{' '}
                                </span>
                                <FontAwesomeIcon className={cx('drop-icon')} icon={faChevronDown} />
                            </div>
                            {isShowDestinationMenu && (
                                <ul className={cx('item-list')} onClick={() => setIsShowDestinationMenu(false)}>
                                    {managers.map((manager) => (
                                        <li
                                            key={manager.emp_id}
                                            onClick={() =>
                                                setReqData((prev) => {
                                                    return {
                                                        ...prev,
                                                        receiver_id: manager.emp_id,
                                                        receiver_name: manager.emp_name,
                                                        dep_name: manager.dep_name,
                                                        receiver_role: manager.role,
                                                    };
                                                })
                                            }
                                        >
                                            {manager.emp_name} - {manager.dep_name} - {manager.role}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className={cx('drop-down-menu')}>
                            <div
                                className={cx('drop-down-header')}
                                onClick={() => setIsShowTypeReqMenu((prev) => !prev)}
                            >
                                <span>{reqData?.req_type}</span>
                                <FontAwesomeIcon className={cx('drop-icon')} icon={faChevronDown} />
                            </div>
                            {isShowTypeReqMenu && (
                                <ul className={cx('item-list')} onClick={() => setIsShowTypeReqMenu(false)}>
                                    <li
                                        onClick={() => {
                                            setReqData((prev) => {
                                                return { ...prev, req_type: 'Medical Leave' };
                                            });
                                        }}
                                    >
                                        Medical Leave
                                    </li>
                                    <li
                                        onClick={() => {
                                            setReqData((prev) => {
                                                return { ...prev, req_type: 'Maternity Leave' };
                                            });
                                        }}
                                    >
                                        Maternity Leave
                                    </li>
                                    <li
                                        onClick={() => {
                                            setReqData((prev) => {
                                                return { ...prev, req_type: 'Casual Leave' };
                                            });
                                        }}
                                    >
                                        Casual Leave
                                    </li>
                                    <li
                                        onClick={() => {
                                            setReqData((prev) => {
                                                return { ...prev, req_type: 'Maternity Leave' };
                                            });
                                        }}
                                    >
                                        Maternity Leave
                                    </li>
                                    <li
                                        onClick={() => {
                                            setReqData((prev) => {
                                                return { ...prev, req_type: 'Casual Leave' };
                                            });
                                        }}
                                    >
                                        Casual Leave
                                    </li>

                                    <li
                                        onClick={() => {
                                            setReqData((prev) => {
                                                return { ...prev, req_type: 'Other' };
                                            });
                                        }}
                                    >
                                        Other
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className={cx('content-input')}>
                        <textarea
                            rows={10}
                            placeholder="Content*"
                            onChange={(e) =>
                                setReqData((prev) => {
                                    return { ...prev, content: e.target.value };
                                })
                            }
                        />
                    </div>
                </div>
                <div className={cx('footer')}>
                    <button
                        className={cx('submit-btn')}
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        Submit
                    </button>
                    <button className={cx('cancel-btn')}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default AddRequest;
