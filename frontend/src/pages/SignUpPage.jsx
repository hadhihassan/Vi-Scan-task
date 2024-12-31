import { AppProvider } from '@toolpad/core/AppProvider';
import { useTheme } from '@mui/material/styles';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { siginUp } from '../services/authService';


function SignUpPage() {

    const theme = useTheme();
    const navigate = useNavigate()

    const validationSchema = yup.object({
        name: yup.string().required('Name is required'),
        email: yup
            .string()
            .email('Invalid email format')
            .required('Email is required'),
        password: yup
            .string()
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleSignup = async (values, { setSubmitting }) => {
        try {

            delete values.confirmPassword;

            await siginUp(values)

            toast.success('Sign-up successful!');
            navigate("/login")
        } catch (error) {
            if (error.response.data.errors) {
                toast.error(error?.response?.data?.errors[0]?.msg)
            } else {
                toast.error(error?.response?.data?.message)
            }
        }
        setSubmitting(false);
    };

    return (
        <AppProvider theme={theme}>
            <Box
                sx={{
                    maxWidth: 400,
                    mx: 'auto',
                    mt: 10,
                    p: 3,
                    border: '1px solid #ccc',
                    borderRadius: 1,
                    boxShadow: 2,
                    backgroundColor: '#fff',
                }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    Sign Up
                </Typography>
                <Typography variant="subtitle2" align="center" color="gray" gutterBottom>
                    Welcome, please sign up to continue
                </Typography>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSignup}
                >
                    {({ isSubmitting }) => (
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
                                type="email"
                                fullWidth
                                margin="normal"
                                size="small"
                                helperText={<ErrorMessage name="email" />}
                            />
                            <Field
                                as={TextField}
                                label="Password"
                                name="password"
                                type="password"
                                fullWidth
                                margin="normal"
                                size="small"
                                helperText={<ErrorMessage name="password" />}
                            />
                            <Field
                                as={TextField}
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                fullWidth
                                margin="normal"
                                size="small"
                                helperText={<ErrorMessage name="confirmPassword" />}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </AppProvider>
    );
}

export default SignUpPage;
