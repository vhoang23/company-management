import classNames from 'classnames/bind';
import styles from './Calendar.module.scss';

import Kalend, { CalendarView } from 'kalend'; // import component
import 'kalend/dist/styles/index.css'; // import styles
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Calendar() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('USER_INFO'));

    const [calendars, setCalendars] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const configuration = {
            method: 'get',
            url: `http://localhost:5000/calendars`,
            params: {
                user,
            },
        };
        axios(configuration)
            .then((result) => {
                setCalendars(result.data);
            })
            .catch((error) => {
                error = new Error();
            });
    }, []);

    useEffect(() => {
        setEvents(
            calendars.map((calendar) => {
                return {
                    id: calendar.cal_id,
                    creator_id: calendar.creator_id,
                    startAt: calendar.start_date,
                    endAt: calendar.end_date,
                    summary: calendar.content,
                    color: 'blue',
                };
            }),
        );
    }, [calendars]);

    const handleEditCalendar = (calendar) => {
        if (user?.role === 'Director') {
            navigate(`/calendars/edit-calendar/${calendar.id}`, { replace: true });
        }
    };

    return (
        <>
            <Kalend
                events={events}
                initialDate={new Date().toISOString()}
                hourHeight={60}
                initialView={CalendarView.WEEK}
                disabledViews={[CalendarView.DAY]}
                timeFormat={'24'}
                weekDayStart={'Monday'}
                calendarIDsHidden={['work']}
                language={'en'}
                onEventClick={(value) => {
                    handleEditCalendar(value);
                }}
            />
        </>
    );
}

export default Calendar;
