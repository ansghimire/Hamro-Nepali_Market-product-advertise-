import React, { useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Button, CssBaseline, Box, Grid, Typography, Container, Stack, Alert } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom';
import FormikControl from '../common/formik/FormikControl';
import axios from 'axios';


const initialValues = {
  "full_name": "",
  "email": "",
  "password": "",
  "re_password": ""
}

const validationSchema = Yup.object().shape({
  full_name: Yup.string().required("Required"),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  re_password: Yup.string().required('Required')
})


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      Hamro Nepali Market
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


const Registration = () => {
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(null)


    


  return (
    <>
      <Formik initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          axios.post('http://localhost:8000/auth/users/', values)
            .then(response => {
              if (response.data) {
                setSuccess('Check Your email to activate your account')
              }
            }).catch(error => {
              console.log(error.response);
              if(error.response.data.email) {
                setMessage(error.response.data.email)   
              } else if (error.response.data.password) {
                setMessage(error.response.data.password)
              } else if (error.response.data.non_field_errors) {
                setMessage(error.response.data.non_field_errors)
              }else {
                setMessage('Something went wrong')
              }
            })
        }}
      >

        {
          formik => {
            return (

              <ThemeProvider theme={theme}>

                <Container component="main" maxWidth="xs">

                  <CssBaseline />

                  <Box
                    sx={{
                      marginTop: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {message &&
                      <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error" onClose={() => {setMessage(null) }}>{message}</Alert>
                      </Stack>
                    }
                    {success &&
                      <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert onClose={() => {setSuccess(null) }}>{success}</Alert>
                      </Stack>
                    }

                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Register
                    </Typography>
                    <Box noValidate sx={{ mt: 1 }} >
                      <Form>
                        <FormikControl
                          margin="normal"
                          control="materialInput"
                          sx={{ width: 400 }}
                          id="full_name"
                          label="Enter Full Name"
                          name="full_name"
                          autoComplete="full_name"
                          autoFocus
                        />
                       
                      
                       
                        
                        <FormikControl
                          margin="normal"
                          control="materialInput"
                          sx={{ width: 400 }}
                          id="email"
                          label="Enter email"
                          name="email"
                          autoComplete="email"
                        // autoFocus
                        />
                        <FormikControl
                          margin="normal"
                          control="materialInput"
                          sx={{ width: 400 }}
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                        />
                        <FormikControl
                          margin="normal"
                          control="materialInput"
                          sx={{ width: 400 }}
                          name="re_password"
                          label="Confirm Password"
                          type="password"
                          id="re_password"
                          autoComplete="re-password"
                        />

                        <Button
                          type="submit"
                          fullWidth
                          disabled={!formik.isValid}
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Login
                        </Button>
                      </Form>
                    </Box>
                  </Box>
                  <Grid container>
                    <Grid item>
                      <Link to="../login" variant="body2">
                        {"Already have a account? Login"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
              </ThemeProvider>
            )
          }
        }



      </Formik>
    </>
  )
}

export default Registration