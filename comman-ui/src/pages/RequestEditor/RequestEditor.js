import classNames from 'classnames/bind';
import styles from './RequestEditor.module.scss';
import PageHeader from '../components/PageHeader/PageHeader';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function RequestEditor() {
    const user = JSON.parse(localStorage.getItem('USER_INFO'));

    const navigate = useNavigate();

    const { reqId } = useParams();

    const [isShowDestinationMenu, setIsShowDestinationMenu] = useState(false);
    const [isShowTypeReqMenu, setIsShowTypeReqMenu] = useState(false);

    const [request, setRequest] = useState();

    const [managers, setManagers] = useState([]);

    const [reqData, setReqData] = useState();

    useEffect(() => {
        const configuration = {
            method: 'get',
            url: `http://localhost:5000/employees/managers`,
            params: { user },
        };
        reqId &&
            axios(configuration)
                .then((result) => {
                    setManagers(result.data);
                })
                .catch((error) => {
                    error = new Error();
                });
    }, []);

    useEffect(() => {
        const configuration = {
            method: 'get',
            url: `http://localhost:5000/requests/${reqId}`,
            params: {
                user,
                req_id: reqId,
            },
        };
        reqId &&
            axios(configuration)
                .then((result) => {
                    setReqData(result.data[0]);
                })
                .catch((error) => {
                    error = new Error();
                });
    }, []);

    const handleSubmit = () => {
        const configuration = {
            method: 'put',
            url: `http://localhost:5000/requests/${reqId}`,
            data: reqData,
            params: {
                user,
            },
        };
        reqId &&
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
            <PageHeader title="Edit Request" />
            <div className={cx('container')}>
                <div className={cx('input-container')}>
                    <div className={cx('drop-input')}>
                        <div className={cx('drop-down-menu')}>
                            <div
                                className={cx('drop-down-header')}
                                onClick={() => setIsShowDestinationMenu((prev) => !prev)}
                            >
                                <span>{reqData?.receiver_name}</span>
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
                                                    };
                                                })
                                            }
                                        >
                                            {manager.emp_name}
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
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className={cx('content-input')}>
                        <textarea
                            value={reqData?.content}
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

export default RequestEditor;
