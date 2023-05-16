import classNames from 'classnames/bind';
import styles from './CalendarRequest.module.scss';
import PageHeader from '../components/PageHeader/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faCircleXmark,
    faPenToSquare,
    faPlus,
    faRotateRight,
    faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import PopperWrapper from '~/components/PopperWrapper/PopperWrapper';
import RequestItem from './CalendarRequestItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const cx = classNames.bind(styles);

function CalendarRequest() {
    const user = JSON.parse(localStorage.getItem('USER_INFO'));
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);

    const fetchRequests = () => {
        const configuration = {
            method: 'get',
            url: `http://localhost:5000/calendars/requests`,
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

    const handleSubmit = (request, status) => {
        const configuration = {
            method: 'post',
            url: `http://localhost:5000/calendars/`,
            params: {
                user,
            },
            data: {
                ...request,
                start_date: moment(request.start_date).format(),
                end_date: moment(request.end_date).format(),
                created_at: moment(request.created_at).format(),
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
            <PageHeader title="All Calendar Request" />
            <div className={cx('container')}>
                <PopperWrapper
                    title="All Calendar Request"
                    fields={[
                        { name: 'Image', ratio: 3 },
                        { name: 'Name', ratio: 5 },
                        { name: 'Start At', ratio: 10 },
                        { name: 'End At', ratio: 10 },
                        { name: 'Room', ratio: 3 },
                        { name: 'Content', ratio: 10 },
                        { name: 'Status', ratio: 3 },
                        { name: 'Actions', ratio: 3 },
                    ]}
                >
                    {requests.map((request) => (
                        <RequestItem
                            key={request.cal_req_id}
                            className={'border-top'}
                            request={request}
                            action={
                                <div className={cx('action')}>
                                    {request.status !== 1 && (
                                        <button
                                            className={cx('action-btn', 'approve-btn')}
                                            onClick={() => handleSubmit(request, 1)}
                                        >
                                            <FontAwesomeIcon icon={faCheck} />
                                        </button>
                                    )}

                                    {request.status !== 2 && (
                                        <button
                                            className={cx('action-btn', 'refuse-btn')}
                                            onClick={() => handleSubmit(request, 2)}
                                        >
                                            <FontAwesomeIcon icon={faCircleXmark} />
                                        </button>
                                    )}
                                </div>
                            }
                        />
                    ))}
                </PopperWrapper>
            </div>
        </div>
    );
}

export default CalendarRequest;
