import { AppProvider } from '@toolpad/core/AppProvider';
import { useTheme } from '@mui/material/styles';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';


function LoginPage() {

  const theme = useTheme();

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
    console.log('Sign-up data:', values);

    const promise = new Promise((resolve) => {
      setTimeout(() => {
        alert('Sign-up successful!');
        resolve();
        setSubmitting(false);
      }, 300);
    });

    await promise;
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
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
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
            </Form>
          )}
        </Formik>
      </Box>
    </AppProvider>
  );
}

export default LoginPage;
