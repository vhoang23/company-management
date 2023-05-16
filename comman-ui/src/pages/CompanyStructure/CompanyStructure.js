import classNames from 'classnames/bind';
import styles from './CompanyStructure.module.scss';
import PageHeader from '../components/PageHeader/PageHeader';
import StructureItem from './StructureItem';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function CompanyStructure() {
    const user = JSON.parse(localStorage.getItem('USER_INFO'));

    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const configuration = {
            method: 'get',
            url: `http://localhost:5000/departments`,
            params: {
                user,
            },
        };
        axios(configuration)
            .then((result) => {
                setDepartments(result.data);
            })
            .catch((error) => {
                error = new Error();
            });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <PageHeader title="Company Structure" />
            <div className={cx('container')}>
                <StructureItem className={cx('structure-item')} title="Director" dep_id={null} />

                {departments.map((department) => (
                    <StructureItem
                        className={cx('structure-item')}
                        title={department.dep_name}
                        dep_id={department.dep_id}
                    />
                ))}
            </div>
        </div>
    );
}

export default CompanyStructure;
