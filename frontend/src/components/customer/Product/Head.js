import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import UserLayout from '../UserLayout'
import { Container } from '@mui/material'
import axios from 'axios'
import Product from './Product'

const Head = () => {
    const { id } = useParams();
    const [result, setResult] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const navigate = useNavigate();

    React.useEffect(() => {
        axios.get(`http://localhost:8000/api/product-type/${id}`)
            .then(response => {
                setResult(response.data.attribute)
                setLoading(false)
            })
            .catch(error => {
               navigate('/')
            })
    }, [id])

    if (loading) return 'Loading ..........'

    const initialValues = {
        title: '',
        description: '',
        price: '',
        price_negotiable: '',
        condition: '',
        expire : '',
        used_for: '',
        owndership_document_provided: '',
        home_delivery: '',
        delivery_area: '',
        warranty_type: '',
        warranty_period: '',
        quantity : '',
    }

    result.forEach(element => {
        let key_data = element.attribute_name
        initialValues[key_data] = ''
    })

    return (
        <>
            <UserLayout />
            <Container>
                <Product initialValues={initialValues} result={result} />
            </Container>

        </>
    )
}

export default Head