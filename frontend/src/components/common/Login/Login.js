import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Button, CssBaseline, Box, Grid, Typography, Container } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import FormikControl from '../formik/FormikControl';
import { useAuth } from '../../../utils/auth'

import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';
import jwt from 'jwt-decode'


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

const initialValues = {
    'email': '',
    'password': '',
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
})


const Login = () => {
    const navigate = useNavigate()
    const auth = useAuth();



    // Redirection to Home Page if login
    useEffect(() => {
        axios.post('http://localhost:8000/auth/jwt/refresh/',
            axios.defaults.withCredentials = true)
            .then(response => {
                console.log('login', response.data)
                let token = response.data.access;
                const { is_admin } = jwt(token);
                auth.login(token, is_admin)


                if (is_admin === false) {
                    navigate('/', { replace: true })
                } else if (is_admin === true) {
                    navigate('/admin', { replace: true })
                }

            }).catch(error => {
                console.log(error)
            })

    }, [])




    return (<div>
        <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => {
                axios.post('http://localhost:8000/auth/jwt/create/', values,  axios.defaults.withCredentials = true)
                    .then(response => {
                        // console.log(response.data.access)
                        let token = response.data.access;
                        const { is_admin } = jwt(token);
                        console.log(token,is_admin)
                        auth.login(token, is_admin)

                        if (is_admin === false) {
                            navigate('/', { replace: true })
                        } else if (is_admin === true) {
                            navigate('/admin', { replace: true })
                        }

                    })
                    .catch(error => {
                        console.log(error)
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
                                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Login
                                    </Typography>
                                    <Box noValidate sx={{ mt: 1 }} >
                                        <Form>

                                            <FormikControl
                                                margin="normal"
                                                control="materialInput"
                                                sx={{ width: 400 }}
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                autoFocus
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
                                        <Grid container>
                                            <Grid item xs>
                                                <Link to="#" variant="body2">
                                                    Forgot password?
                                                </Link>
                                            </Grid>
                                            <Grid item>
                                                <Link to="../register" variant="body2">
                                                    {"Don't have an account? Sign Up"}
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                                <Copyright sx={{ mt: 8, mb: 4 }} />
                            </Container>
                        </ThemeProvider>
                    )
                }
            }

        </Formik>
    </div>
    )
}

export default Login