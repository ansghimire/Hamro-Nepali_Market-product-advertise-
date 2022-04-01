import { Button, TextField, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom'
import React, { useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useEditAttributeMutation } from '../../../services/AttribApi';
import { useAuth } from '../../../utils/auth';

const EditAttribute = () => {
    const [EditAttribute, responseInfo] = useEditAttributeMutation();
    const [attribute , setAttribute] = React.useState('')
    const [errors, setErrors] = React.useState('')
    const [formErrors, setFormErrors] = React.useState('')
    let navigate = useNavigate();
    let { id } = useParams();
    const auth = useAuth()
    
    useEffect(() => {
       axios.get(`http://127.0.0.1:8000/api/product-attribute/${id}/`,{
           headers: {
               Authorization: `Bearer ${auth.access}`
           }
       })
       .then(response=>{
            setAttribute(response.data.attribute_name)
            setErrors('')
       })
       .catch(error=> {
           setErrors('something went wrong')
           setAttribute('')
       })

    }, [id])

    if(errors){
        navigate('/admin/attribute/');
    }

   
    
    const handleEdit = (e)=> {
        e.preventDefault();
        if (!attribute) {
            setFormErrors('Required')
       } else if (attribute.length < 3) {
           setFormErrors('Must be greater than 3 characters or more')
       } else if (attribute.length > 20) {
           setFormErrors("Must be less than 20 characters")
       }else{
        const data = {'id':id, 'attribute_name':attribute, access: auth.access }
        EditAttribute(data)
        navigate('/admin/attribute/', {replace:true});
       }

       
    }

    return (
        <>
           {!errors ? <form onSubmit={handleEdit}>
                <Grid container justify="center" direction="column" spacing="5" sx={{ mt: 3 }}>
                    <Grid item>
                        <TextField id="attributeValue" name="attributeValue" 
                        variant="outlined" size="small" label="Attribute"
                        value={attribute} onChange={(e)=> setAttribute(e.target.value)} />

                            {formErrors && <Typography color="error.main">{formErrors}
                                    </Typography>
                                    }
                    </Grid>
                    
                    <Grid item justify="center">
                        <Button variant="contained" type="submit"
                         color="success"
                            size="small" sx={{ mt: 1 }}>Edit Attribute</Button>
                    </Grid>

                </Grid>
            </form>:
            <Typography variant="h4" color="errors.main">Something went wrong</Typography>
           }
            


        </>
    )
}

export default EditAttribute
