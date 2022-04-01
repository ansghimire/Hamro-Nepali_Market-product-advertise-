import React from 'react';
import { Field } from 'formik'
import { FormControl, FormHelperText, FormLabel, MenuItem, Select } from '@mui/material';


const MaterialSelect = (props) => {
    const { label, name, options, ...rest } = props
   
    return <Field name={name}>
            {({field, form})=> (
                <>
                <FormControl xs={{width:400}} 
                error={(form.errors[name] && form.touched[name]) && true}
                >
                {/* <InputLabel>{label}</InputLabel> */}
                <FormLabel>{label}</FormLabel>
                
                <Select label={label} name={name} {...rest} {...field} >
                    {
                         options.map((option, index) => {
                            return (
                                <MenuItem key={index} value={option.value}>
                                    {option.key}
                                </MenuItem>
                            )
                        })
                    }

                </Select>
                <FormHelperText>{(form.errors[name] && form.touched[name]) && form.errors[name]}</FormHelperText>
                </FormControl> 
                <br/><br/>
                </>

            )}
            

        </Field>


};

export default MaterialSelect;
