import classNames from 'classnames/bind';
import styles from './CompanyStructure.module.scss';
import PopperWrapper from '~/components/PopperWrapper/PopperWrapper';
import EmployeeItem from '../Employees/EmployeeItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function StructureItem({ dep_id, title, className }) {
    const user = JSON.parse(localStorage.getItem('USER_INFO'));

    const navigate = useNavigate();
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

    if (user?.role === 'Director' || (user?.role === 'Manager' && dep_id === user?.dep_id)) {
        fields.push({ name: 'Actions', ratio: 5 });
    }

    const [employees, setEmployees] = useState([]);

    const fetchEmployees = () => {
        const configuration = {
            method: 'get',
            url: `http://localhost:5000/employees/by-department/${dep_id}`,
            params: {
                user,
                dep_id,
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
    return (
        <div className={cx('item-wrapper', { [className]: className })}>
            <PopperWrapper
                title={title}
                fields={fields}
                onAddNew={() => {
                    navigate(`/employees/add-employee`, { replace: true });
                }}
                onReload={fetchEmployees}
            >
                {employees.map((emp) => (
                    <EmployeeItem
                        key={emp.emp_id}
                        className={cx('employee-item', 'border-top')}
                        emp={emp}
                        onEditEmployee={() => {
                            if (user?.emp_id === emp.emp_id) {
                                navigate(`/profile/edit-profile`, { replace: true });
                            } else {
                                navigate(`/employees/edit-employee/${emp.emp_id}`, { replace: true });
                            }
                        }}
                    />
                ))}
            </PopperWrapper>
        </div>
    );
}

export default StructureItem;
