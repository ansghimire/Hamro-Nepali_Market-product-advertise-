import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import * as Yup from 'yup'
import FormikControl from '../../common/formik/FormikControl'
import { Formik, Form } from 'formik'
import validationSchemaControl from '../../../validationSchema/ValidationSchemaControl';
import { useNavigate } from 'react-router-dom'
import { Grid, Button } from '@mui/material';
import { useAuth } from '../../../utils/auth';



const AddProduct = () => {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const auth = useAuth();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/product-type/${id}`)
            .then(response => {
                setProductDetails(response.data.attribute)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                navigate('../add-product')
            })

    }, [id])

    if (loading) return "Loading........."

    const initialValues = {
        title: '',
        description: '',
        price: '',
        price_negotiable: '',
        condition: '',
        used_for: '',
        owndership_document_provided: '',
        home_delivery: '',
        delivery_area: '',
        warranty_type: '',
        warranty_period: '',
    }

    // appending initial values which came from api
    productDetails.forEach(el => {
        let data = el.attribute_name
        initialValues[data] = ''
    })



    const schema = {}
    for (const key in initialValues) {
        schema[key] = validationSchemaControl(key)
    }


    const validationSchema = Yup.object().shape(schema)


    const conditionOptions = [
        {
            key: 'Brand New(not used)',
            value: "Brand New(not used)"
        },
        {
            key: "LIKE New(used few times)",
            value: "LIKE New(used few times)"
        },
        {
            key: "Excellent",
            value: "Excellent",
        },
        {
            key: "Not Working",
            value: "Not Working"
        }
    ]

    const dualOptions = [
        {
            key: 'Yes',
            value: true
        },
        {
            key: 'No',
            value: false
        },
    ]

    const Ownership_options = [
        {
            key: 'Original Purchase Bill',
            value: "Original Purchase Bill"
        },
        {
            key: "Stamped waranty card",
            value: "Stamped waranty card"
        },
        {
            key: "I do not have any document",
            value: "I do not have any document",
        },
    ]
    const delivery_options = [
        {
            key: 'within my area',
            value: "within my area"
        },
        {
            key: "within my city",
            value: "within my city"
        },
        {
            key: "almost anywhere in nepal",
            value: "almost anywhere in nepal",
        },
    ]

    const warranty_options = [
        {
            key: 'Dealer/Shop',
            value: "Dealer/Shop",
        },
        {
            key: "Manufacturer/Importer",
            value: "Manufacturer/Importer"
        },
        {
            key: "No Warranty",
            value: "No Warranty",
        },
    ]

    return <div>
        <Formik initialValues={initialValues}
            validationSchema={validationSchema}

            onSubmit={values => {
                console.log(values)


                let attribute_name = productDetails.map(element => {
                    return element.attribute_name
                })

                const new_values = { ...values }
                new_values.type = id
                const result = []


                for (let value in new_values) {
                    attribute_name.forEach(element => {
                        if (element === value) {
                            result.push(new_values[value])
                            delete new_values[value]
                        }
                    })
                }
                values.productattributevalues = result
                console.log(new_values)


                axios.post('http://127.0.0.1:8000/api/product/', new_values,{
                    headers: {
                      Authorization: `Bearer ${auth.access}`
                    }
                  })
                    .then(res => {
                        if(res.data){
                            navigate('add-product-img/'+res.data.product_id)
                        }
                    })
                    .catch(err => console.log(err))
            }
            }
        >
            {formik => {
                return (
                    <Grid container direction="column">
                        <Form>
                            <Grid item>
                                <FormikControl
                                    name="title"
                                    control="materialInput"
                                    label="Title"
                                    type="text"
                                />
                            </Grid>

                            <Grid item sx={{ mt: 4 }}>
                                <FormikControl
                                    name="description"
                                    control="materialInput"
                                    label="Description"
                                    type="textarea"
                                    multiline={true}
                                    minRows={6}
                                    maxRows={6}
                                    sx={{ width: 300 }}
                                />
                            </Grid>

                            <Grid item sx={{ mt: 4 }}>
                                <FormikControl
                                    name="price"
                                    control="materialInput"
                                    label="Price"
                                    type="number"
                                />
                            </Grid>

                            <Grid item sx={{ mt: 4 }}>
                                <FormikControl
                                    name="price_negotiable"
                                    control="radioBtn"
                                    label="Price Negotiable"
                                    options={dualOptions}
                                />
                            </Grid>

                            <Grid item sx={{ mt: 4 }}>
                                <FormikControl
                                    name="condition"
                                    control="materialSelect"
                                    label="Condition"
                                    type="text"
                                    options={conditionOptions}
                                    sx={{ width: 215 }}

                                />
                            </Grid>

                            <Grid item sx={{ mt: 4 }}>
                                <FormikControl
                                    name="used_for"
                                    control="materialInput"
                                    label="Used For"
                                    type="text"
                                />
                            </Grid>

                            <Grid item sx={{ mt: 4 }}>
                                <FormikControl
                                    name="owndership_document_provided"
                                    control="materialSelect"
                                    label="Ownership Document Provided"
                                    type="text"
                                    options={Ownership_options}
                                    sx={{ width: 215 }}
                                />
                            </Grid>

                            <Grid item sx={{ mt: 4 }}>
                                <FormikControl
                                    name="home_delivery"
                                    control="radioBtn"
                                    label="Home Delivery"
                                    options={dualOptions}
                                />
                            </Grid>

                            <Grid item sx={{mt:4}}>
                            <FormikControl
                                name="delivery_area"
                                control="materialSelect"
                                label="Delivery Area"
                                options={delivery_options}
                                sx={{width:215}}
                            />
                           </Grid>

                            <Grid item sx={{mt:4}}>
                            <FormikControl
                                name="warranty_type"
                                control="materialSelect"
                                label="Warranty Type"
                                options={warranty_options}
                                sx={{width:215}}
                            />
                            </Grid>

                            <Grid item sx={{mt:4}}>
                            <FormikControl
                                name="warranty_period"
                                control="materialInput"
                                label="Warranty Period"
                                type="text"
                            />
                          </Grid>


                            {

                                productDetails.map((element, index) => {
                                    let options = element.attribute_val.map((item) => {
                                        return { key: item.attribute_value, value: item.attribute_value_id }
                                    })

                                    return (
                                        <Grid item sx={{mt:4}} key={index}>

                                        <FormikControl 
                                            name={element.attribute_name}
                                            control="materialSelect"
                                            label={element.attribute_name}
                                            options={options}
                                            sx={{width:215}}
                                    
                                        />
                                         </Grid>
                                    )
                                })
                            }
                            <Button sx={{mt:2}} variant="contained" type="submit" disabled={!formik.isValid}>Add Product</Button>
                        </Form>
                    </Grid>
                )
            }
            }
        </Formik>
    </div>;
};

export default AddProduct;
