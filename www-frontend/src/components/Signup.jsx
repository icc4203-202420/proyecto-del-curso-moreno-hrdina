import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Container, Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

// Validación del formulario con Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid e-mail').required('e-mail is Required'),
  password: Yup.string().required('LPassword is Required').min(6, 'Password has to be 6 characters or longer'),
  first_name: Yup.string().required('First Name is Required'),
  last_name: Yup.string().required('Last Name is Required'),
  handle: Yup.string().required('A Handle is Required'),
  password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must be the same').required('Repeat Password'),
});

const initialValues = {
  first_name: '',
  last_name: '',
  handle: '',
  email: '',
  password: '',
  password_confirmation: '',
};

// Configuración de axios con axios-hooks
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {
  const [serverError, setServerError] = useState(''); // Estado para manejar el error del servidor
  const navigate = useNavigate(); // Hook para manejar la navegación

  // Definir el hook para la petición POST
  const [{ data, loading, error }, executePost] = useAxios(
    {
      url: 'http://localhost:3001/api/v1/signup',
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    },
    { manual: true } // No ejecutar automáticamente, lo haremos manualmente al enviar el formulario
  );

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await executePost({ data: qs.stringify({user:values}) });
      setServerError(''); // Limpia el mensaje de error si el registro es exitoso
      navigate('/login'); // Redirige a la página de login después de un registro exitoso
    } catch (err) {
      setServerError('Server Error. Try again later');
      console.error('Error when sending the form:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          mt: 2,
        }}
      >
        <Typography component="h1" variant="h5">
          Create Account
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form style={{ width: '100%' }}>
              <Box sx={{ mt: 2 }}>
                <Field
                  as={TextField}
                  fullWidth
                  variant="outlined"
                  label="First Name"
                  name="first_name"
                  type="text"
                  error={touched.first_name && Boolean(errors.first_name)}
                  helperText={touched.first_name && errors.first_name}
                  margin="normal"
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Field
                  as={TextField}
                  fullWidth
                  variant="outlined"
                  label="Last Name"
                  name="last_name"
                  type="text"
                  error={touched.last_name && Boolean(errors.last_name)}
                  helperText={touched.last_name && errors.last_name}
                  margin="normal"
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Field
                  as={TextField}
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
                <Field
                  as={TextField}
                  fullWidth
                  variant="outlined"
                  label="Handle"
                  name="handle"
                  type="text"
                  error={touched.handle && Boolean(errors.handle)}
                  helperText={touched.handle && errors.handle}
                  margin="normal"
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Field
                  as={TextField}
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
              <Box sx={{ mt: 2 }}>
                <Field
                  as={TextField}
                  fullWidth
                  variant="outlined"
                  label="Confirm Password"
                  name="password_confirmation"
                  type="password"
                  error={touched.password_confirmation && Boolean(errors.password_confirmation)}
                  helperText={touched.password_confirmation && errors.password_confirmation}
                  margin="normal"
                />
              </Box>
              <Box sx={{ mt: 3 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || loading}
                >
                  {loading ? 'Sending...' : 'Create Account'}
                </Button>
              </Box>
              {serverError && (
                <Typography color="error" variant="body2" align="center" sx={{ mt: 2 }}>
                  {serverError}
                </Typography>
              )}
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};


export default Signup;
