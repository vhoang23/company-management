import classNames from 'classnames/bind';
import styles from './AddDocument.module.scss';
import PageHeader from '../components/PageHeader/PageHeader';
import { useRef, useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function AddDocument() {
    const user = JSON.parse(localStorage.getItem('USER_INFO'));

    const navigate = useNavigate();

    const fileInpRef = useRef(null);

    const [docData, setDocData] = useState({
        doc_name: '',
    });

    const [file, setFile] = useState({});

    const handleSubmit = () => {
        !docData.doc_name && alert('You must fill out Document name');

        const formData = new FormData();

        formData.append('docData', JSON.stringify(docData));
        formData.append('document', file);

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
            params: { user },
        };

        docData.doc_name &&
            axios
                .post(`http://localhost:5000/documents`, formData, config)
                .then((result) => {
                    navigate('/documents', { replace: true });
                })
                .catch((error) => {
                    error = new Error();
                });
    };

    return (
        <div className={cx('wrapper')}>
            <PageHeader title="Add Document" />
            <div className={cx('container')}>
                <div className={cx('input-box')}>
                    <span className={cx('input-label')}>Document title*</span>
                    <input
                        value={docData.room}
                        placeholder="Document title*"
                        onChange={(e) =>
                            setDocData((prev) => {
                                return { ...prev, doc_name: e.target.value };
                            })
                        }
                    />
                </div>

                <div className={cx('input-box', 'upload-img-area')}>
                    <button onClick={() => fileInpRef.current.click()}>Choose file</button>
                    <p>{file?.name || 'or drag and drop file here'}</p>
                    <input
                        ref={fileInpRef}
                        className={cx('file-input')}
                        type="file"
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                        }}
                    />
                </div>

                <div className={cx('footer')}>
                    <button className={cx('submit-btn')} onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddDocument;
