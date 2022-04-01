import React from 'react'
import { Field } from 'formik'
import { TextField, FormControl, FormLabel } from '@mui/material';

const MaterialInput = (props) => {
    const { label, name, ...rest } = props

    const configTextField = ({
        variant: "outlined",
        // fullWidth: true,
        // label: label,
        ...rest
    })

    return (
        <Field name={name}>
            {({ field, form }) => (
                <FormControl error={(form.errors[name] && form.touched[name]) && true}>
                    <FormLabel>{label}</FormLabel>
                    <TextField
                        variant="outlined"
                        {...field}
                        {...configTextField}
                        error={(form.errors[name] && form.touched[name]) && true}
                        helperText={(form.errors[name] && form.touched[name]) && form.errors[name]}
                    />
                </FormControl>

            )}
        </Field>
    )
}

export default MaterialInput
