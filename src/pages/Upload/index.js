import React, { useRef, useState } from 'react';
import styles from './UpLoad.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { postVideoAction } from '~/redux/slice/uploadSlice';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function Upload() {
    const dispatch = useDispatch();
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const inputFile = useRef();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            description: '',
            viewable: 'public',
            comment: true,
            duet: true,
            stitch: true,
            thumbnail_time: '',
        },
        onSubmit: async (values) => {
            await dispatch(
                postVideoAction({
                    ...values,
                    upload_file: selectedVideo,
                    allows: [values.comment ? 'comment' : '', values.duet ? 'duet' : '', values.stitch ? 'stitch' : ''],
                }),
            );
            await navigate('/');
            // window.location.reload();
        },
    });
    // console.log(inputFile.current.target, 'inputFile.current');
    // console.log(inputFile.current.value, 'inputFile.currentvalue');
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <h2>Upload Video</h2>
                <h3 className={cx('content-title')}>Post a video to your account</h3>
                <div className={cx('content-wrap')}>
                    {videoUrl ? (
                        <video src={videoUrl} width="263" height="450" controls>
                            Sorry, your browser doesn't support embedded videos.
                        </video>
                    ) : (
                        <div
                            className={cx('file')}
                            onClick={() => {
                                inputFile.current.click();
                            }}
                        >
                            <FontAwesomeIcon className={cx('file-update-icon')} icon={faCloudArrowUp} />
                            <h3>Select video to upload</h3>
                            <p>Or drag and drop a file</p>
                            <div className={cx('file-update-detail')}>
                                <p>MP4 or WebM</p>
                                <p>720x1280 resolution or higher</p>
                                <p>Up to 30 minutes</p>
                                <p>Less than 2 GB</p>
                            </div>
                            <Button primary className={cx('file-update-btn')}>
                                Select a file
                            </Button>
                            <input
                                type="file"
                                ref={inputFile}
                                hidden
                                onChange={(event) => {
                                    const file = event.target.files[0];
                                    setSelectedVideo(file);
                                    // Kiểm tra file có phải là video không
                                    if (file.type && file.type.indexOf('video') === -1) {
                                        toast.error('File không phải là video');
                                        return;
                                    }

                                    const reader = new FileReader();
                                    reader.addEventListener('load', () => {
                                        setVideoUrl(reader.result);
                                    });
                                    reader.readAsDataURL(file);
                                }}
                            />
                        </div>
                    )}

                    <div className={cx('info')}>
                        <form onSubmit={formik.handleSubmit}>
                            <div className={cx('info-divide')}>
                                <h3>Divide videos and edit</h3>
                                <p>
                                    You can quickly divide videos into multiple parts, remove redundant parts and turn
                                    landscape videos into portrait videos
                                </p>
                            </div>
                            <div className={cx('info-input-wrap')}>
                                <h3>Caption</h3>
                                <input
                                    className={cx('info-input')}
                                    name="description"
                                    onChange={formik.handleChange}
                                    required
                                />
                            </div>
                            <div className={cx('info-input-wrap')}>
                                <h3>Who can watch this video</h3>
                                <select
                                    className={cx('info-input', 'info-select')}
                                    onChange={formik.handleChange}
                                    value={formik.values.viewable}
                                    name="viewable"
                                >
                                    <option value="public">Public</option>
                                    <option value="friends">Friends</option>
                                    <option value="private">Private</option>
                                </select>
                            </div>
                            <div className={cx('info-input-wrap')}>
                                <h3>Allow user to:</h3>
                                <div className={cx('info-input-wrap-just-check-box')}>
                                    <div className={cx('info-input-wrap-select')}>
                                        <input
                                            type="checkbox"
                                            id="comment"
                                            name="comment"
                                            checked={formik.values.comment}
                                            onChange={formik.handleChange}
                                            className={cx('info-input-checkbox')}
                                        />
                                        <label className={cx('info-input-checkbox-label')} htmlFor="comment">
                                            Comment
                                        </label>
                                    </div>
                                    <div className={cx('info-input-wrap-select')}>
                                        <input
                                            type="checkbox"
                                            id="duet"
                                            name="duet"
                                            checked={formik.values.duet}
                                            onChange={formik.handleChange}
                                            className={cx('info-input-checkbox')}
                                        />
                                        <label className={cx('info-input-checkbox-label')} htmlFor="duet">
                                            Duet
                                        </label>
                                    </div>
                                    <div className={cx('info-input-wrap-select')}>
                                        <input
                                            type="checkbox"
                                            id="stitch"
                                            name="stitch"
                                            checked={formik.values.stitch}
                                            onChange={formik.handleChange}
                                            className={cx('info-input-checkbox')}
                                        />
                                        <label className={cx('info-input-checkbox-label')} htmlFor="stitch">
                                            Stitch
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('info-input-wrap')}>
                                <h3>Music</h3>
                                <input
                                    name="music"
                                    className={cx('info-input')}
                                    defaultValue="original sound"
                                    required
                                />
                            </div>
                            <div className={cx('info-input-wrap')}>
                                <h3>Thumbnail time</h3>
                                <input
                                    type="number"
                                    name="thumbnail_time"
                                    className={cx('info-input')}
                                    min="1"
                                    max="20"
                                    onChange={formik.handleChange}
                                    required
                                />
                            </div>
                            <div className={cx('info-input-wrap')}>
                                <Button primary large>
                                    Post
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
