import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import NavItem from './components/NavItem/NavItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightFromBracket,
    faBarsProgress,
    faBlog,
    faBook,
    faCalendar,
    faUser,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPosition } from '~/userDefineFunction';
import axios from 'axios';

const cx = classNames.bind(styles);

function SideBar() {
    const { pathname } = useLocation();

    const [path, setPath] = useState();
    const [userData, setUserData] = useState({});

    const user = JSON.parse(localStorage.getItem('USER_INFO'));

    useEffect(() => {
        const configuration = {
            method: 'get',
            url: `http://localhost:5000/employees/${user?.emp_id}`,
            params: { user, emp_id: user?.emp_id },
        };
        user?.emp_id &&
            axios(configuration)
                .then((result) => {
                    setUserData(result.data);
                })
                .catch((error) => {
                    error = new Error();
                });
    }, [user?.emp_id]);

    useEffect(() => {
        const pos = getPosition(pathname, '/', 2);
        const result = pathname.slice(0, pos);
        setPath(result);
    }, [pathname]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('side-bar-header')}>
                <img
                    className={cx('company-logo')}
                    src="https://einfosoft.com/templates/admin/kuber/source/light/assets/images/logo.png"
                    alt="header-img"
                />
                <span className={cx('company-name')}>Company</span>
            </div>
            <div className={cx('user-info')}>
                <img className={cx('user-img')} src={userData.avatar} alt="user-img" />
                <h4 className={cx('user-name')}>{userData.emp_name}</h4>
                <p className={cx('user-role')}>{userData.role}</p>
            </div>
            <div className={cx('navigation-container')}>
                <div className={cx('nav-group')}>
                    <div className={cx('nav-group-header')}>MAIN</div>
                    <div className={cx('navigation-menu')}>
                        <NavItem
                            labelName="Posts"
                            labelIcon={<FontAwesomeIcon icon={faBlog} />}
                            navList={[
                                { name: 'All Posts', to: '/posts' },
                                { name: 'Add Post', to: '/posts/add-post', for: ['Director', 'Manager'] },
                                { name: 'Edit Post', to: '/posts/edit-post', for: ['Director', 'Manager'] },
                            ]}
                            active={path === '/posts'}
                        />

                        <NavItem
                            labelName="Documents"
                            labelIcon={<FontAwesomeIcon icon={faBook} />}
                            navList={[
                                { name: 'All Documents', to: '/documents' },
                                { name: 'Add Documents', to: '/documents/add-document', for: ['Director'] },
                            ]}
                            active={path === '/documents'}
                        />

                        <NavItem
                            labelName="Employees"
                            labelIcon={<FontAwesomeIcon icon={faUsers} />}
                            navList={[
                                { name: 'All Employees', to: '/employees' },
                                { name: 'Add Employee', to: '/employees/add-employee', for: ['Director', 'Manager'] },
                                { name: 'Edit Employee', to: '/employees/edit-employee', for: ['Director', 'Manager'] },
                            ]}
                            active={path === '/employees'}
                        />

                        <NavItem
                            labelName="Profile"
                            labelIcon={<FontAwesomeIcon icon={faUser} />}
                            navList={[
                                { name: 'My Profile', to: '/profile' },
                                { name: 'Edit Profile', to: '/profile/edit-profile' },
                            ]}
                            active={path === '/profile'}
                        />
                        <NavItem
                            labelName="Calendar"
                            labelIcon={<FontAwesomeIcon icon={faCalendar} />}
                            navList={[
                                { name: 'All Calendar', to: '/calendars' },
                                { name: 'Calendar Request', to: '/calendars/requests', for: ['Director'] },
                                { name: 'Sent Calendar Request', to: '/calendars/sent-requests', for: ['Manager'] },
                                { name: 'Add Calendar', to: '/calendars/add-calendar', for: ['Director', 'Manager'] },
                                { name: 'Edit Calendar', to: '/calendars/edit-calendar', for: ['Director'] },
                                {
                                    name: 'Edit Calendar Request',
                                    to: '/calendars/edit-calendar-request',
                                    for: ['Manager'],
                                },
                            ]}
                            active={path === '/calendar'}
                        />

                        <NavItem
                            labelName="Request"
                            labelIcon={<FontAwesomeIcon icon={faBarsProgress} />}
                            navList={[
                                {
                                    name: 'Arrival Request',
                                    to: '/requests/arrival-requests',
                                    for: ['Director', 'Manager'],
                                },
                                { name: 'Sent Request', to: '/requests/sent-requests', for: ['Manager', 'Employee'] },
                                { name: 'Add Request', to: '/requests/add-request', for: ['Manager', 'Employee'] },
                                { name: 'Edit Request', to: '/requests/edit-request', for: ['Manager', 'Employee'] },
                            ]}
                            active={path === '/requests'}
                        />

                        <NavItem
                            to={'/company-structure'}
                            labelName="Company Structure"
                            labelIcon={<FontAwesomeIcon icon={faBarsProgress} />}
                            active={path === '/company-structure'}
                        />

                        <NavItem
                            to="/login"
                            labelName="Log Out"
                            labelIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
                            active={path === '/login'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
