import React from 'react'
import { Container, Box, Typography, Button, Divider } from '@mui/material'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import FormikControl from '../formik/FormikControl';
import axios from 'axios'
import { useState } from 'react'


const initialValues = {
  'new_password': '',
  're_new_password': '',
}

const validationSchema = Yup.object().shape({
  new_password: Yup.string().min(8, 'Too short!').required('Required'),
  re_new_password: Yup.string().oneOf([Yup.ref('new_password'), null], 'Passwords must match')

})


const ResetPasswordConfirm = () => {
  const { mid, muid } = useParams()
  const [message, setMessage] = useState('')

  return (
    <div>
      {message && message}
      <Formik initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          const data = values;
          data['uid']  = mid;
          data ['token'] = muid;
        
          console.log(data)
           axios.post('http://localhost:8000/auth/users/reset_password_confirm/',data)
           .then(response=> {
             if(response) {
               setMessage("Successfully you have updated password")
             }
           }).catch(error=> {
             setMessage('something went wrong may be your email is not registerd')
           })
          
        }}>
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
                    Confirm Password
                  </Typography>
                  <Divider />
                  <Typography sx={{ mt: 2, mb: 2 }}>
                    Please enter and re-eneter your password to reset Password
                  </Typography>

                  <Form>

                    <FormikControl
                      margin="normal"
                      control="materialInput"
                      type="password"
                      sx={{ width: 400 }}
                      id="password"
                      label="Password"
                      name="new_password"
                      autoComplete="new_password"
                      autoFocus
                    />
                    <FormikControl
                      margin="normal"
                      control="materialInput"
                      type="password"
                      sx={{ width: 400 }}
                      id="re-password"
                      label="Confirm Password"
                      name="re_new_password"
                      autoComplete="re_new_password"
                      // autoFocus
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

export default ResetPasswordConfirm