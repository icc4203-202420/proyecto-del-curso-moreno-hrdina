import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Container, Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

// Validation schema with Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid Email').required('Email is Required'),
  password: Yup.string().required('Password is Required').min(6, 'Password must be 6 characters or longer'),
});

// Initial form values
const initialValues = {
  email: '',
  password: '',
};

// Configure axios
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const Login = ({ tokenHandler }) => {
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  // Define the axios hook for the POST request
  const [{ data, loading, error }, executePost] = useAxios(
    {
      url: 'http://localhost:3001/api/v1/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    },
    { manual: true }
  );

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await executePost({ data: qs.stringify({ user: values }) });
      console.log("Response: ", response);

      const receivedToken = response.headers.authorization.split(' ')[1];

      if (receivedToken) {
        tokenHandler(receivedToken);
        setServerError(''); // Clear the error message
        navigate('/'); // Redirect after successful login
      } else {
        setServerError('No token received. Please try again.');
      }
    } catch (err) {
      console.error('Full error: ', err);
      if (err.response && err.response.status === 401) {
        setServerError('Correo electrónico o contraseña incorrectos.');
      } else {
        setServerError('Error en el servidor. Intenta nuevamente más tarde.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mt: 8 }}>
        <Typography component="h1" variant="h5">Log In</Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, errors, touched }) => (
            <Form style={{ width: '100%' }}>
              <Box sx={{ mt: 2 }}>
                <Field as={TextField}
                  fullWidth
                  variant="outlined"
                  label="Email"
                  name="email"
                  type="email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  margin="normal"
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Field as={TextField}
                  fullWidth
                  variant="outlined"
                  label="Password"
                  name="password"
                  type="password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  margin="normal"
                />
              </Box>
              <Box sx={{ mt: 3 }}>
                <Button type="submit" fullWidth variant="contained" color="primary" disabled={isSubmitting || loading}>
                  {loading ? 'Starting...' : 'Log In'}
                </Button>
              </Box>
              {serverError && (
                <Typography color="error" variant="body2" align="center" sx={{ mt: 2 }}>
                  {serverError}
                </Typography>
              )}
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button variant="text" onClick={() => navigate('/signup')}>
                  Don't have an account? Sign Up here
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;
