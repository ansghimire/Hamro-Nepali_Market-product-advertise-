import React, {useState} from 'react'
import { Container, Box, Typography, Button, Divider } from '@mui/material'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import FormikControl from '../formik/FormikControl';
import axios from 'axios'



const initialValues = {
    'email': ''
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required')
})


const ResetPassword = () => {
    const [message, setMessage] = useState(null)
    return (<div>
        {message && message}
        <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => {
                console.log(values)
                axios.post('http://localhost:8000/auth/users/reset_password/', values)
                .then(response=> {
                   if(response.status === 204){
                       setMessage('Check your mail')
                   }

                })
                .catch(error=> {
                    console.log(error)
                })
            }}
        >
            {
                formik => {
                    return (
                        <Container component="main" maxWidth="xs">
                            <Box sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItem: 'center'
                            }}>
                                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                                    Reset Password
                                </Typography>
                                <Divider />
                                <Typography sx={{ mt: 2, mb: 2 }}>
                                    Please enter your email address to reset pasword.
                                </Typography>
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
                                    <Divider sx={{ mt: 2 }} />
                                    <Button type="submit"
                                        disabled={!formik.isValid}
                                        variant="contained">
                                        Enter
                                    </Button>
                                </Form>

                            </Box>

                        </Container>
                    )
                }
            }

        </Formik>
        </div>
    )
}

export default ResetPassword