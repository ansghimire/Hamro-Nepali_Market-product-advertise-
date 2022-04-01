import React from 'react';
import { Field } from 'formik';
import { FormControl, FormLabel, Radio, RadioGroup,FormHelperText, FormControlLabel } from '@mui/material';


const FormikRadioBtn = (props) => {
  const { label, name, options } = props

  return <div>
    <Field name={name}>

      {({field, form}) => (
        <FormControl
         error={form.errors[name] && true}
         >
           <FormLabel>{label}</FormLabel>
           <RadioGroup name={name} {...field}>

              {options.map((option, index)=> (
                <FormControlLabel key={index}
                 value={option.value}
              
                control={<Radio/>}
                 label={option.key}
                 />
              ))}
           </RadioGroup>

           <FormHelperText>{form.errors[name]}</FormHelperText>
          
        </FormControl>
      )}

    </Field>

  </div>


};

export default FormikRadioBtn;
