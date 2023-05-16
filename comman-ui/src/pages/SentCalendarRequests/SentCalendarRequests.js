import classNames from 'classnames/bind';
import styles from './SentCalendarRequests.module.scss';
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

function SentCalendarRequests() {
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

    const handleEditRequest = (cal_req_id) => {
        navigate(`/calendars/edit-calendar-request/${cal_req_id}`, { replace: true });
    };

    const handleDeleteCalReq = (cal_req_id) => {
        const configuration = {
            method: 'delete',
            url: `http://localhost:5000/calendars/requests/${cal_req_id}`,
            params: {
                user,
            },
            data: {
                cal_req_id,
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
                        { name: 'Action', ratio: 3 },
                    ]}
                    onAddNew={() => {
                        navigate(`/calendars/add-calendar`, { replace: true });
                    }}
                    onReload={() => fetchRequests()}
                >
                    {requests.map((request) => (
                        <RequestItem
                            key={request.cal_req_id}
                            className={'border-top'}
                            request={request}
                            action={
                                <div className={cx('action')}>
                                    {request.status == 0 && (
                                        <>
                                            <button
                                                className={cx('action-btn', 'edit-btn')}
                                                onClick={() => {
                                                    handleEditRequest(request.cal_req_id);
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>

                                            <button
                                                className={cx('action-btn', 'remove-btn')}
                                                onClick={() => {
                                                    handleDeleteCalReq(request.cal_req_id);
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </button>
                                        </>
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

export default SentCalendarRequests;
