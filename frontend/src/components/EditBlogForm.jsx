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
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import TextField from "@mui/material/TextField";
import { updateBlog } from '../services/blogService';
import toast from 'react-hot-toast'


export default function EditBlogForm({ update, data }) {

    const [open, setOpen] = React.useState(false);
    const [defaultData, setDefaultData] = React.useState(null);

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
            const loadingToastId = toast.loading("Updating blog, please wait...");

            await updateBlog(data?.id, {
                poster: base64Image,
                content: values.content,
                title: values.title
            });

            toast.dismiss(loadingToastId);
            toast.success("Blog updating successfully!");

            update();
        } catch (error) {
            toast.dismiss();
            if (error.response?.data?.errors) {
                toast.error(error.response.data.errors[0]?.msg);
            } else {
                toast.error(error.response?.data?.message || "Somthing went wrong please try again.");
            }
        }
        setSubmitting(false);
        handleClose();
    };

    React.useEffect(() => {
        setDefaultData(data)
    }, [])

    return (
        <React.Fragment>
            <Button
                variant="contained"
                sx={{ flex: 1 }}
                size="small"
                color="red"
                onClick={handleClickOpen}
            >
                Edit
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Edit Blog</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit your  blog content is here
                    </DialogContentText>
                    <Formik
                        enableReinitialize:true
                        initialValues={{
                            title: defaultData?.title,
                            content: defaultData?.content,
                            file: defaultData?.poster,
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
                                    defaultValue={defaultData.content}
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
