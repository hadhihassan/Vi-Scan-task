/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import TextField from "@mui/material/TextField";
import { updateProfile } from '../services/profileService';
import toast from 'react-hot-toast'
import {AuthContext} from '../Context/AuthContext'


const UpdateProfileForm = ({ userData }) => {

    const [open, setOpen] = React.useState(false);
    const [preview, setPreview] = React.useState(null);
    const { updateAuthenticity } = React.useContext(AuthContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const validationSchema = yup.object({
        name: yup
            .string()
            .required('Name is required'),
        file: yup
            .mixed()
            .required('File is required')
            .test(
                "fileType",
                "Unsupported file type. Only .jpg, .png allowed.",
                (value) => {
                    if (typeof value === "string") {
                        // If the value is a string, assume it's valid and skip further checks
                        return true;
                    }
                    // If it's a file, check its type
                    return value && ["image/jpeg", "image/png"].includes(value.type);
                }
            )
            .test(
                "fileSize",
                "File size is too large. Maximum 2MB allowed.",
                (value) => {
                    if (typeof value === "string") {
                        // Skip size validation if the value is a string
                        return true;
                    }
                    // If it's a file, validate the size
                    return value && value.size <= 2 * 1024 * 1024; // 2MB
                }
            ),
        email: yup
            .string()
            .email('Invalid email format')
            .required('Email is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {

        let base64Image
        if (typeof values.file !== "string") {
            base64Image = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(values.file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        }
        try {
            const loadingToastId = toast.loading("Updating profile, please wait...");

            await updateProfile({
                name: values.name,
                email: values.email,
                profilePic: base64Image || values.file
            });

            toast.dismiss(loadingToastId);
            toast.success("Profile updating successfully!");

        } catch (error) {
            toast.dismiss();
            if (error.response?.data?.errors) {
                toast.error(` ${error.response.data.errors[0]?.msg}`);
            } else {
                toast.error(error.response?.data?.message || "Somthing went wrong please try again.");
            }
        }
        updateAuthenticity()
        setSubmitting(false);
        handleClose();
    };


    return (
        <React.Fragment>
            <Button
                variant="contained"
                fullWidth
                onClick={handleClickOpen}
            >
                Edit
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Edit Your Profile</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To Edit your profile details, please enter the required details. We
                        will updates your profile.
                    </DialogContentText>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            name: userData.name,
                            email: userData.email,
                            file: userData.profilePic,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    label="Name"
                                    name="name"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    helperText={<ErrorMessage name="name" />}
                                />
                                <Field
                                    as={TextField}
                                    label="Email"
                                    name="email"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    helperText={<ErrorMessage name="email" />}
                                />
                                <input
                                    type="file"
                                    name="file"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(event) => {
                                        const file = event.currentTarget.files[0];
                                        setFieldValue("file", file);
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setPreview(reader.result);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}

                                    style={{ marginTop: '16px', marginBottom: '8px' }}
                                />
                                <ErrorMessage name="file" component="p" style={{ color: 'gray', marginBottom: '1px' }} />

                                {preview && <img src={preview} alt="Preview" style={{ marginTop: '16px', width: '200px', height: '200px' }} />}
                                <DialogActions>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

export default UpdateProfileForm
