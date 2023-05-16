import classNames from 'classnames/bind';
import styles from './AddCalendar.module.scss';
import PageHeader from '../components/PageHeader/PageHeader';
import { useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const cx = classNames.bind(styles);

function AddCalendar() {
    const user = JSON.parse(localStorage.getItem('USER_INFO'));

    const navigate = useNavigate();

    const [calData, setCalData] = useState({
        room: '',
        start_date: moment(new Date()).format(),
        end_date: moment(new Date()).format(),
        created_at: moment(new Date()).format(),
        content: '',
        creator_id: user.emp_id,
    });

    const handleSubmit = () => {
        let configuration = {};

        if (user.role === 'Director') {
            configuration = {
                method: 'post',
                url: 'http://localhost:5000/calendars',
                params: {
                    user,
                },
                data: { ...calData },
            };
        }

        if (user.role === 'Manager') {
            configuration = {
                method: 'post',
                url: 'http://localhost:5000/calendars/requests',
                params: {
                    user,
                },
                data: { ...calData },
            };
        }

        axios(configuration)
            .then((result) => {
                if (user.role === 'Director') {
                    navigate('/calendars', { replace: true });
                } else {
                    navigate('/calendars/sent-requests', { replace: true });
                }
            })
            .catch((error) => {
                error = new Error();
            });
    };

    return (
        <div className={cx('wrapper')}>
            <PageHeader title="Add Calendar" />
            <div className={cx('container')}>
                <div className={cx('input-box')}>
                    <span className={cx('input-label')}>Room*</span>
                    <input
                        value={calData.room}
                        placeholder="Room*"
                        onChange={(e) =>
                            setCalData((prev) => {
                                return { ...prev, room: e.target.value };
                            })
                        }
                    />
                </div>
                <div className={cx('date-time-picker')}>
                    <div className={cx('start-time-picker')}>
                        <span className={cx('input-label')}>Start Date*</span>
                        <Datetime
                            initialValue={new Date()}
                            onChange={(value) =>
                                setCalData((prev) => {
                                    return { ...prev, start_date: value.format() };
                                })
                            }
                        />
                    </div>

                    <div className={cx('end-time-picker')}>
                        <span className={cx('input-label')}>End Date*</span>
                        <Datetime
                            initialValue={new Date()}
                            onChange={(value) =>
                                setCalData((prev) => {
                                    return { ...prev, end_date: value.format() };
                                })
                            }
                        />
                    </div>
                </div>
                <div className={cx('calendar-content')}>
                    <textarea
                        value={calData.content}
                        rows={5}
                        className={cx('content-input')}
                        placeholder="Content*"
                        onChange={(e) =>
                            setCalData((prev) => {
                                return { ...prev, content: e.target.value };
                            })
                        }
                    />
                </div>

                <div className={cx('footer')}>
                    <button className={cx('submit-btn')} onClick={handleSubmit}>
                        Submit
                    </button>
                    <button className={cx('cancel-btn')}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default AddCalendar;
