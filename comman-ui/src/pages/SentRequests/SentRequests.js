import classNames from 'classnames/bind';
import styles from './SentRequests.module.scss';
import PageHeader from '../components/PageHeader/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus, faRotateRight, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import EmployeeItem from '../Employees/EmployeeItem';
import PopperWrapper from '~/components/PopperWrapper/PopperWrapper';
import RequestItem from './RequestItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function SentRequests() {
    const user = JSON.parse(localStorage.getItem('USER_INFO'));
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);

    const fetchRequests = () => {
        const configuration = {
            method: 'get',
            url: `http://localhost:5000/requests/sent-requests`,
            params: {
                user,
            },
        };
        axios(configuration)
            .then((result) => {
                setRequests(result.data);
            })
            .catch((error) => {
                error = new Error();
            });
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleDeleteReq = (req_id) => {
        const configuration = {
            method: 'delete',
            url: `http://localhost:5000/requests/${req_id}`,
            params: {
                user,
            },
            data: {
                req_id,
            },
        };
        axios(configuration)
            .then((result) => {
                fetchRequests();
            })
            .catch((error) => {
                error = new Error();
            });
    };

    return (
        <div className={cx('wrapper')}>
            <PageHeader title="All SentRequests" />
            <div className={cx('container')}>
                <PopperWrapper
                    title="All SentRequests"
                    fields={[
                        { name: 'Image', ratio: 3 },
                        { name: 'Name', ratio: 5 },
                        { name: 'Request Type', ratio: 5 },
                        { name: 'Status', ratio: 3 },
                        { name: 'Created At', ratio: 10 },
                        { name: 'Content', ratio: 10 },
                        { name: 'Actions', ratio: 3 },
                    ]}
                    onAddNew={() => {
                        navigate(`/requests/add-request/`, { replace: true });
                    }}
                    onReload={() => fetchRequests()}
                >
                    {requests.map((request) => (
                        <RequestItem
                            key={request.req_id}
                            className={'border-top'}
                            request={request}
                            action={
                                <>
                                    {request.status === 0 && (
                                        <>
                                            <button
                                                className={cx('action-btn', 'edit-btn')}
                                                onClick={() => {
                                                    navigate(`/requests/edit-request/${request.req_id}`, {
                                                        replace: true,
                                                    });
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>

                                            <button
                                                className={cx('action-btn', 'remove-btn')}
                                                onClick={() => {
                                                    handleDeleteReq(request.req_id);
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </button>
                                        </>
                                    )}
                                </>
                            }
                        />
                    ))}
                </PopperWrapper>
            </div>
        </div>
    );
}

export default SentRequests;
