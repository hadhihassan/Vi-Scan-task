import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import TextField from "@mui/material/TextField";
import { createBlog } from '../services/blogService';
import toast from 'react-hot-toast'


export default function FormDialog({ update }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const validationSchema = yup.object({
        title: yup
            .string()
            .required('Title is required'),
        file: yup
            .mixed()
            .required('File is required')
            .test(
                "fileSize",
                "File size is too large. Maximum 2MB allowed.",
                (value) => value && value.size <= 2 * 1024 * 1024 // 2MB
            )
            .test(
                "fileType",
                "Unsupported file type. Only .jpg, .png",
                (value) =>
                    value &&
                    ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
            ),
    });

    const handleSubmit = async (values, { setSubmitting }) => {

        const file = values.file;
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            try {
                const base64Image = reader.result;
                const loadingToastId = toast.loading("Creating blog, please wait...");

                const response = await createBlog({
                    poster: base64Image,
                    content: values.content,
                    title: values.title
                });

                toast.dismiss(loadingToastId);
                toast.success("Blog created successfully!");

                update();
            } catch (error) {
                toast.dismiss();
                if (error.response?.data?.errors) {
                    toast.error(error.response.data.errors[0]?.msg);
                } else {
                    toast.error(error.response?.data?.message || "An error occurred");
                }
            }
        };

        setSubmitting(false);
        handleClose();
    };

    return (
        <React.Fragment>
            <Button
                variant="contained"
                sx={{ height: 40 }}
                onClick={handleClickOpen}
            >
                Open form dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter the required details. We
                        will send updates occasionally.
                    </DialogContentText>
                    <Formik
                        initialValues={{
                            title: '',
                            content: '',
                            file: null,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    label="Title"
                                    name="title"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    helperText={<ErrorMessage name="title" />}
                                />
                                <ReactQuill
                                    theme="snow"
                                    onChange={(content) => setFieldValue("content", content)}
                                    placeholder="Write your content here..."
                                    style={{ marginTop: '16px', marginBottom: '8px' }}
                                />
                                <ErrorMessage name="content" component="div" style={{ color: 'red', marginBottom: '8px' }} />
                                <input
                                    type="file"
                                    name="file"
                                    onChange={(event) =>
                                        setFieldValue("file", event.currentTarget.files[0])
                                    }
                                    style={{ marginTop: '16px', marginBottom: '8px' }}
                                />
                                <ErrorMessage name="file" component="div" style={{ color: 'red', marginBottom: '8px' }} />
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
    );
}
