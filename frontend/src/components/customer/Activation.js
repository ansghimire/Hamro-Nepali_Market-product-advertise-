import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Stack, Alert } from '@mui/material'



const Activation = () => {
    const { mid, muid } = useParams();
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        axios.post('http://localhost:8000/auth/users/activation/',
            {
                "uid": `${mid}`,
                "token": `${muid}`
            }
        ).then(res => {
                console.log(res.data)
                setSuccess('Successfully Registered')
            
        })
            .catch(error => {
                console.log(error.response)
                if (error.response.data.uid) {
                    setError("Activate Token doesn't match")
                } else if (error.response.data.token) {
                    setError("Activate Token doesn't match")
                } else {
                    setError("Activate Token doesn't match")
                }
            })


    }, [mid, muid])


    useEffect(() => {
        setInterval(() => {
            if (error) {
                setError(null)
                navigate('../register', { replace: true })
            }else if(success) {
                setSuccess(null)
                navigate('../login', {replace: true})
            }

        }, 5000);
    }, [error, navigate, success])



    return (
        <Container>
            {
                error &&
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error" onClose={() => {
                        setError(null)
                        navigate('../register', { replace: true })
                    }}>{error}</Alert>
                </Stack>
            }
            {
                success &&
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert onClose={() => {
                        setSuccess(null)
                        navigate('../login', { replace: true })
                    }}>{success}</Alert>
                </Stack>
            }


        </Container>
    )
}

export default Activation