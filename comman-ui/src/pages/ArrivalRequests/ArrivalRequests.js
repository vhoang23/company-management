import classNames from 'classnames/bind';
import styles from './ArrivalRequests.module.scss';
import PageHeader from '../components/PageHeader/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircle, faCircleXmark, faPlus, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import EmployeeItem from '../Employees/EmployeeItem';
import PopperWrapper from '~/components/PopperWrapper/PopperWrapper';
import RequestItem from './RequestItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ArrivalRequests() {
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);

    const user = JSON.parse(localStorage.getItem('USER_INFO'));

    const fetchRequests = () => {
        const configuration = {
            method: 'get',
            url: `http://localhost:5000/requests/received-requests`,
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

    const handleSubmit = (req_id, status) => {
        const configuration = {
            method: 'put',
            url: `http://localhost:5000/requests/status/${req_id}`,
            params: {
                req_id,
                user,
                status,
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
            <PageHeader title="All ArrivalRequests" />
            <div className={cx('container')}>
                <PopperWrapper
                    title="All ArrivalRequests"
                    fields={[
                        { name: 'Image', ratio: 3 },
                        { name: 'Name', ratio: 5 },
                        { name: 'Request Type', ratio: 5 },
                        { name: 'Status', ratio: 3 },
                        { name: 'Created At', ratio: 10 },
                        { name: 'Content', ratio: 10 },
                        { name: 'Actions', ratio: 3 },
                    ]}
                >
                    {requests.map((request) => (
                        <RequestItem
                            key={request.req_id}
                            className={'border-top'}
                            request={request}
                            action={
                                <div>
                                    <button
                                        className={cx('action-btn', 'approve-btn')}
                                        onClick={() => handleSubmit(request.req_id, 1)}
                                    >
                                        <FontAwesomeIcon icon={faCheck} />
                                    </button>

                                    <button
                                        className={cx('action-btn', 'refuse-btn')}
                                        onClick={() => handleSubmit(request.req_id, 2)}
                                    >
                                        <FontAwesomeIcon icon={faCircleXmark} />
                                    </button>
                                </div>
                            }
                        />
                    ))}
                </PopperWrapper>
            </div>
        </div>
    );
}

export default ArrivalRequests;
