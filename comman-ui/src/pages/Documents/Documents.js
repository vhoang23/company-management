import classNames from 'classnames/bind';
import styles from './Documents.module.scss';

import PageHeader from '../components/PageHeader/PageHeader';
import DocumentItem from '~/components/DocumentItem/DocumentItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Documents() {
    const user = JSON.parse(localStorage.getItem('USER_INFO'));
    const navigate = useNavigate();

    const [docs, setDocs] = useState([]);

    const fetchDocuments = () => {
        const configuration = {
            method: 'get',
            url: `http://localhost:5000/documents`,
            params: {
                user,
            },
        };
        axios(configuration)
            .then((result) => {
                setDocs(result.data);
            })
            .catch((error) => {
                error = new Error();
            });
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleRemoveDocument = (doc_id) => {
        const configuration = {
            method: 'delete',
            url: `http://localhost:5000/documents/${doc_id}`,
            params: {
                user,
                doc_id,
            },
        };
        axios(configuration)
            .then((result) => {
                fetchDocuments();
            })
            .catch((error) => {
                error = new Error();
            });
    };

    return (
        <div className={cx('wrapper')}>
            <PageHeader title="All Documents" />
            <div className={cx('container')}>
                {docs.map((doc) => (
                    <DocumentItem
                        key={doc.doc_id}
                        className={cx('doc-item')}
                        title={doc.doc_name}
                        src={doc.content}
                        file_name={doc.file_name}
                        onRemoveDocument={() => handleRemoveDocument(doc.doc_id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Documents;
