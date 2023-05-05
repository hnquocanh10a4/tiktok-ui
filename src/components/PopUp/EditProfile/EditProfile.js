import React, { useRef, useState } from 'react';
import styles from './EditProfile.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUserSelector } from '~/redux/selectors';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Image from '~/components/Image/Image';
import { toast } from 'react-toastify';
import authenticationSlice, { updateUserAction } from '~/redux/slice/authenticationSlice';

const cx = classNames.bind(styles);

export default function EditProfile() {
    const [selectedImage, setSelectedImage] = useState('');
    const [image, setImage] = useState(null);
    const inputFile = useRef();

    const dispatch = useDispatch();

    const currentUser = useSelector(getCurrentUserSelector);

    console.log(currentUser, 'currentUser in edit');

    const formik = useFormik({
        initialValues: {
            first_name: `${currentUser.first_name}`,
            last_name: `${currentUser.last_name}`,
            bio: `${currentUser.bio}`,
        },
        validationSchema: Yup.object({
            first_name: Yup.string().min(2, 'First name phải có ít nhất 2 kí tự').required('Không được để trống'),
            last_name: Yup.string().min(2, 'Last name phải có ít nhất 2 kí tự').required('Không được để trống'),
        }),
        onSubmit: async (values) => {
            dispatch(authenticationSlice.actions.closepopUpForm());
            dispatch(authenticationSlice.actions.closeEditProfileForm());
            if (selectedImage !== '') {
                await dispatch(
                    updateUserAction({
                        ...values,
                        avatar: selectedImage,
                    }),
                );
            } else {
                await dispatch(updateUserAction(values));
            }
        },
    });

    return (
        <div className={cx('container')}>
            <h2>Edit Profile</h2>
            <div className={cx('content')}>
                <div className={cx('content-wrap')}>
                    <span className={cx('content-wrap-title')}>Profile photo</span>
                    <div
                        className={cx('content-wrap-info')}
                        onClick={() => {
                            inputFile.current.click();
                        }}
                    >
                        {image ? (
                            <Image className={cx('content-avata')} src={image} alt="Preview" />
                        ) : (
                            <Image className={cx('content-avata')} src={currentUser.avatar} alt="avata" />
                        )}

                        <input
                            type="file"
                            ref={inputFile}
                            hidden
                            onChange={(event) => {
                                const file = event.target.files[0];
                                // Kiểm tra file có phải là video không
                                if (file.type && !file.type.startsWith('image/')) {
                                    toast.error('File không phải là hình ảnh');
                                    return;
                                } else {
                                    const imageUrl = URL.createObjectURL(file);
                                    setImage(imageUrl);
                                    setSelectedImage(file);
                                }
                            }}
                        />
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className={cx('content-wrap')}>
                        <span className={cx('content-wrap-title')}>Nickname</span>
                        <div className={cx('content-wrap-info')}>
                            <input
                                type="text"
                                className={cx('content-input')}
                                placeholder="Nickname"
                                disabled
                                value={currentUser.nickname}
                            />
                        </div>
                    </div>
                    <div className={cx('content-wrap')}>
                        <span className={cx('content-wrap-title')}>First Name</span>
                        <div className={cx('content-wrap-info')}>
                            <input
                                type="text"
                                className={cx('content-input')}
                                placeholder="First Name"
                                // defaultValue={currentUser.first_name}
                                onChange={formik.handleChange}
                                value={formik.values.first_name}
                                name="first_name"
                            />
                            {formik.errors.first_name && formik.touched.first_name && (
                                <p className={cx('error-title')}>{formik.errors.first_name}</p>
                            )}
                        </div>
                    </div>

                    <div className={cx('content-wrap')}>
                        <span className={cx('content-wrap-title')}>Last Name</span>
                        <div className={cx('content-wrap-info')}>
                            <input
                                type="text"
                                className={cx('content-input')}
                                placeholder="Last Name"
                                // defaultValue={currentUser.last_name}
                                onChange={formik.handleChange}
                                value={formik.values.last_name}
                                name="last_name"
                            />
                            {formik.errors.last_name && formik.touched.last_name && (
                                <p className={cx('error-title')}>{formik.errors.last_name}</p>
                            )}
                        </div>
                    </div>

                    <div className={cx('content-wrap')}>
                        <span className={cx('content-wrap-title')}>Bio</span>
                        <div className={cx('content-wrap-info')}>
                            <textarea
                                type="text"
                                className={cx('content-input', 'content-area')}
                                placeholder="Bio"
                                // defaultValue={currentUser.bio}
                                onChange={formik.handleChange}
                                value={formik.values.bio}
                                name="bio"
                            />
                        </div>
                    </div>
                    <div className={cx('button-wrap')}>
                        <Button rounded className={cx('button-submit')}>
                            Cancel
                        </Button>
                        <Button type="submit" rounded primary className={cx('button-submit')}>
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
