import React from 'react'
import { useGetAttributeQuery,useCreateAttributeValueMutation } from '../../../services/AttribApi'
import { Button, TextField, Grid, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {useAuth} from '../../../utils/auth'



const AttributeValueErrorMssgSchema = Yup.object().shape({
    attributeValue: Yup.string()
        .min(3, 'Too short!')
        .max(30, 'Too long')
        .required('Required'),
});




const AddAttributeValue = () => {
    const auth = useAuth()
    const { data, isFetching } = useGetAttributeQuery(auth.access);
    const [attributeID, setAttributeID] = React.useState('');
    const [createAttributeValue, responseInfo] = useCreateAttributeValueMutation()

    const formik = useFormik({
        initialValues: { attributeValue: '' },
        validationSchema: AttributeValueErrorMssgSchema,
        onSubmit: (values, {resetForm}) => {
            
            if(auth.access){
                createAttributeValue({'product_attribute':attributeID, 'attribute_value':values.attributeValue, access: auth.access})
            }
           
            resetForm(values);
        }
    })

    if (isFetching) return 'Loading .............'


    const handleAttributeChange = (event) => {
        console.log(event.target.value);
        setAttributeID(event.target.value)

    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container justify="center" direction="column" spacing="5" sx={{ mt: 3 }}>
                    <Grid item>

                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="attrib_id">Product Attribute</InputLabel>
                            <Select
                                labelId="demo"
                                label="ProductAttribute"
                                id="attribute_id"
                                value={attributeID}
                                onChange={handleAttributeChange}
                                required

                            >
                                {
                                    data.map((item, i) => (
                                        <MenuItem key={i} value={item.attribute_id}>{item.attribute_name}</MenuItem>
                                    ))
                                }

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField id="attributeValue" sx={{ width: 300 }} name="attributeValue" variant="outlined" size="small"
                            onChange={formik.handleChange}
                            value={formik.values.attributeValue} />

                        {formik.touched.attributeValue && formik.errors.attributeValue ? (
                             <Typography color="error.main">{formik.errors.attributeValue}
                             </Typography>
                        ) : null}
                    </Grid>
                    <Grid item justify="center">
                        <Button variant="contained" color="success" type="submit"
                            size="small" sx={{ mt: 1 }}>Add  Attribute Value</Button>
                    </Grid>

                </Grid>
            </form>
        </>
    )
}

export default AddAttributeValue
