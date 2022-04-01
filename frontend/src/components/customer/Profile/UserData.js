import React, { useState, useEffect } from 'react'
import { TextField, Divider, Button } from '@mui/material'
import axios from 'axios';
import { useAuth } from '../../../utils/auth'
import { Formik, Form, } from "formik";
import FormikControl from '../../common/formik/FormikControl'
import * as Yup from "yup";

const provienceOption = [
    {
        key: 'Provience No.1',
        value: 'Provience No.1'
    },
    {
        key: 'Provience No.2',
        value: 'Provience No.2'
    },
    {
        key: 'Provience No.3',
        value: 'Provience No.3',
    },
    {
        key: 'Gandaki Pradesh',
        value: 'Gandaki Pradesh',
    },
    {
        key: 'PROVIENCE_NO_5',
        value: 'PROVIENCE_NO_5'
    },
    {
        key: 'Karnali Pradesh',
        value: 'Karnali Pradesh'
    },
    {
        key: 'Sudurpashchim Pradesh',
        value: 'Sudurpashchim Pradesh'
    },
]




export const UserData = (props) => {

    // const [data, setData] = useState(null);
    // const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const data = props.data



    // useEffect(() => {
    //     if (auth.access) {
    //         axios.get('http://localhost:8000/api/profile/me/', {
    //             headers: {
    //                 Authorization: `Bearer ${auth.access}`
    //             }
    //         }).then(response => {
    //             setData(response.data)
    //             setLoading(false)
    //         }).catch(error => {
    //             console.log(error)
    //             setLoading(true)
    //         })
    //     }

    // }, [auth.access])

    // if (loading) return 'Loading .............'

    const initialValues = {
        provience: data.provience,
        locality: data.locality ? data.locality : '',
        mobile: data.mobile ? data.mobile : ''
    }
    // const initialValues = {
    //     provience: '',
    //     locality:  '',
    //     mobile: ''
    // }

    const ValidationSchema = Yup.object({
        provience: Yup.string().required("Required"),
        locality: Yup.string().required("Required"),
        mobile: Yup.number().min(6000000000, "invalid mobile number").max(9999999999, "invalid mobile number")
            .required('mobile number is required'),

    });

    const handleSubmit = (values) => {
        axios.put('http://localhost:8000/api/profile/me/', values, {
            headers: {
                Authorization: `Bearer ${auth.access}`
            }
        } )
        .then(response=> {
            console.log(response.data)
        })
        .catch(error=> {
            console.log(error)
        })
    }

    return (
        <Formik initialValues={initialValues}
            validationSchema={ValidationSchema}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form>
                    <TextField sx={{ mt: 1, width: "250px" }} variant='outlined' label="Full Name" value={data.name} disabled />
                    <TextField sx={{ mt: 3, width: "250px" }} variant="outlined" label="Email" value={data.email} disabled />

                    {/* <TextField sx={{ mt: 3, width: "250px" }} variant="outlined" label="Provience" value={data.provience} /> */}

                    <FormikControl
                        name="provience"
                        control="materialSelect"
                        sx={{ mt: 2, width: "250px" }}
                        options={provienceOption}
                        type="text"
                    />
                    
                    <FormikControl
                        name="locality"
                        control="materialInput"
                        label="locality"
                        sx={{ width: "250px" }}
                    />

                    <FormikControl
                        name="mobile"
                        control="materialInput"
                        label="Mobile Number"
                        sx={{ width: "250px" }}
                    />

                    {/* <TextField sx={{ mt: 3, width: "250px" }} variant="outlined" label="Locality" value={data.locality ? data.locality : ''} /> */}
                    {/* <TextField sx={{ mt: 3, width: "250px" }} variant="outlined" label="Phone Number" value={data.mobile ? data.mobile : ''} /> */}
                    <Divider sx={{ mt: 3, mb: 2 }} />
                    <Button type="submit" variant="contained">Update Profile</Button>
                </Form>
            )}
        </Formik>
    )
}
