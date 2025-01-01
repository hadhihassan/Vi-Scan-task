import { AppProvider } from '@toolpad/core/AppProvider';
import { useTheme } from '@mui/material/styles';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/authService';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';


function LoginPage() {

  const theme = useTheme();
  const navigate = useNavigate()
  const { updateAuthenticity } = useContext(AuthContext);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required'),
  });

  const handleLoginin = async (values, { setSubmitting }) => {
    try {
      const res = await login(values)
      localStorage.setItem('token', res.token)
      console.log(res)
      updateAuthenticity()
      toast.success('Sign-in successful!');
      navigate("/")

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
          Sign in
        </Typography>
        <Typography variant="subtitle2" align="center" color="gray" gutterBottom>
          Welcome, please sign in to continue
        </Typography>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleLoginin}
        >
          {({ isSubmitting }) => (
            <Form>

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

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
              <Typography variant="subtitle2" align="center" margin={1} color="gray" gutterBottom>
                Don't have accound .
                <Link to={'/signup'}>
                  Sign Up?
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Box>
    </AppProvider>
  );
}

export default LoginPage;
