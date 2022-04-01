import React from 'react'
import MaterialInput from './MaterialInput'
import MaterialSelect from './MaterialSelect'
import FormikRadioBtn from './FormikRadioBtn'

const FormikControl = (props) => {
    const {control, ...rest} = props
    switch(control){
  
        case 'materialInput':
            return <MaterialInput {...rest}/>
    
        case 'materialSelect':
            return <MaterialSelect {...rest}/>
        
        case 'radioBtn':
            return <FormikRadioBtn {...rest}/>

        default:
            return null
    }
  
}

export default FormikControl
