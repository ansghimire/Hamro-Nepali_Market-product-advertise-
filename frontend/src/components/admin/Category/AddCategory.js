import React from 'react'
import { TextField, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
// import axios from 'axios'
import { useCreateCategoryMutation } from '../../../services/categoryApi'
import {useAuth} from '../../../utils/auth'


// custom validation
const validate = values => {
    const errors = {};
    if (!values.category) {
        errors.category = 'Required *'
    } else if (values.category.length <= 3) {
        errors.category = 'Must be greater than 3 characters or more'
    } else if (values.category.length >= 15) {
        errors.category = 'Must be less than 15 characters'
    }
    return errors;
};

const AddCategory = () => {
    const [createCategory, responseInfo] = useCreateCategoryMutation();
    const auth = useAuth()

    const formik = useFormik({
        initialValues: {
            category: '',
        },
        validate,
        onSubmit: values => {
            if(auth.access){
                createCategory({ category_name: values.category, access:auth.access })
            }
        }
    });



    if (responseInfo.isLoading) return 'Loading.....';
    return (
        <form onSubmit={formik.handleSubmit}  >
            {/* <label htmlFor="category">Category Name</label>  */}
            <TextField
                variant="filled"
                id="category"
                label="Category"
                name="category"
                color="success"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.category}
            />   <br />
            {
                formik.touched.category && formik.errors.category ? (
                    <div>
                        <Typography color="error.main">{formik.errors.category}
                        </Typography>
                    </div>
                ) : null
            }
            <Button sx={{ mt: 2 }} type="submit" color="success" variant="contained">Add Category</Button>
        </form>
    )
}

export default AddCategory
