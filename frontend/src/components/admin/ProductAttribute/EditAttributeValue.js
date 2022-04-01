import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Grid, TextField, Button, InputLabel, Select, FormControl, MenuItem, Typography } from '@mui/material';
import { useGetAttributeQuery, useEditAttributeValueMutation } from '../../../services/AttribApi'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {useAuth} from '../../../utils/auth'

const EditAttributeValue = () => {
    const auth = useAuth()
    const { id } = useParams();
    const[attributeId, setAttributeID] = useState('')
    const [attributeValue, setAttributeValue] = useState('')
    const [attributeName, setAttributeName] = useState('')
    const [errors, setErrors] = useState('')
    let navigate = useNavigate();

    const responseInfo = useGetAttributeQuery(auth.access);
    const [editAttributeValue] = useEditAttributeValueMutation();

    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/product-attribute-value/${id}/`,
      {
        headers: {
            Authorization: `Bearer ${auth.access}`
        }
      })
      .then(response=> {
          setAttributeValue(response.data.attribute_value)
          setAttributeID(response.data.product_attribute.attribute_id)
          setAttributeName(response.data.product_attribute.attribute_name)
      })
      .catch(err=>console.log(err))
        
    }, [id])


    if (responseInfo.isFetching) return 'loading..........'
    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!attributeValue) {
             setErrors('Required')
        } else if (attributeValue.length < 3) {
            setErrors('Must be greater than 3 characters or more')
        } else if (attributeValue.length > 20) {
            setErrors("Must be less than 20 characters")
        }
        else{
            setErrors('')
            if(auth.access){
                editAttributeValue({'id':id, 'product_attribute':attributeId, 'attribute_value':attributeValue, access: auth.access })
                navigate('/admin/attribute/');
            }   
            
        }
        

    }

    const handleAttributeChange = (event) => {
        setAttributeID(event.target.value)

    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid container justify="center" direction="column" spacing="5" sx={{ mt: 3 }}>
                    <Grid item>

                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="attrib_id">Product Attribute</InputLabel>
                            <Select
                                labelId="demo"
                                label="ProductAttribute"
                                id="attribute_id"
                                value={attributeId}
                                onChange={handleAttributeChange}
                                required>

                                <MenuItem value={attributeId}>{attributeName}</MenuItem>

                                {
                                    responseInfo.data.map((item, i) => (
                                         attributeName === item.attribute_name ? null :
                                        <MenuItem key={i} value={item.attribute_id}>{item.attribute_name}</MenuItem> 
                                    ))
                                }


                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField id="attributeValue" sx={{ width: 300 }} name="attributeValue"
                            value={attributeValue} onChange={(e)=> setAttributeValue(e.target.value) } variant="outlined" size="small" />

                        {errors && <Typography color="error.main">{errors}
                                    </Typography>
                                    }
                    </Grid>
                    <Grid item justify="center">
                        <Button variant="contained" color="success" type="submit"
                            size="small" sx={{ mt: 1 }}>Edit Attribute Value</Button>
                    </Grid>

                </Grid>
            </form>
        </>
    )
}

export default EditAttributeValue
