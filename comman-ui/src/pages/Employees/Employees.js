import classNames from 'classnames/bind';
import styles from './Employees.module.scss';
import PageHeader from '../components/PageHeader/PageHeader';
import EmployeeItem from './EmployeeItem';
import PopperWrapper from '~/components/PopperWrapper/PopperWrapper';
import Popper from '~/components/Popper/Popper';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(styles);

function Employees() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('USER_INFO'));

    const [employees, setEmployees] = useState([]);

    const fetchEmployees = () => {
        const configuration = {
            method: 'get',
            url: `http://localhost:5000/employees`,
            params: {
                user,
            },
        };
        axios(configuration)
            .then((result) => {
                setEmployees(result.data);
            })
            .catch((error) => {
                error = new Error();
            });
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fields = [
        { name: 'Image', ratio: 3 },
        { name: 'Name', ratio: 5 },
        { name: 'Department', ratio: 5 },
        { name: 'Role', ratio: 5 },
        { name: 'Degree', ratio: 5 },
        { name: 'Mobile', ratio: 5 },
        { name: 'Email', ratio: 10 },
        { name: 'Joining Date', ratio: 5 },
    ];

    if (user?.role === 'Director' || user?.role === 'Manager') {
        fields.push({ name: 'Actions', ratio: 5 });
    }

    const handleDeleteEmployee = (emp_id) => {
        const configuration = {
            method: 'delete',
            url: `http://localhost:5000/employees/${emp_id}`,
            params: {
                user,
            },
            data: {
                emp_id,
            },
        };
        axios(configuration)
            .then((result) => {
                fetchEmployees();
            })
            .catch((error) => {
                error = new Error();
            });
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <PageHeader title="All Employee" />
                <div className={cx('container')}>
                    <PopperWrapper
                        title="All Employees"
                        fields={fields}
                        onAddNew={() => {
                            navigate(`/employees/add-employee`, { replace: true });
                        }}
                        onReload={() => fetchEmployees()}
                    >
                        {employees.map((emp) => (
                            <EmployeeItem
                                key={emp.emp_id}
                                className={cx('employee-item', 'border-top')}
                                emp={emp}
                                onEditEmployee={() => {
                                    navigate(`/employees/edit-employee/${emp.emp_id}`, { replace: true });
                                }}
                                onDeleteEmployee={handleDeleteEmployee}
                            />
                        ))}
                    </PopperWrapper>
                </div>
            </div>
        </>
    );
}

export default Employees;
