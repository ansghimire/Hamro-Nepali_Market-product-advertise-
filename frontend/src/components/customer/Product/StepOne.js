import React from 'react'
import { Formik, Form, } from "formik";
import * as Yup from "yup";
import FormikControl from '../../common/formik/FormikControl'
import { Button, Grid } from '@mui/material';

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

const expireOptions = [
  {
    key : '5 minutes',
    value : '5', 
  },
  {
    key : '10 minutes',
    value : '10', 
  },
  {
    key : '15 minutes',
    value : '15', 
  },
  {
    key : '20 minutes',
    value : '20', 
  },
]


const StepOne = (props) => {
  console.log(props)

  const oneValidationSchema = Yup.object({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    price: Yup.number().required("Required"),
    price_negotiable: Yup.string().required("Required"),
    condition: Yup.string().required("Required"),
    expire : Yup.string().required('Required'),
    quantity : Yup.string().required("Required"),
  });

  const handleSubmit = (values) => {
    // console.log('hello',values)
    props.next(values);
  };


  return (
    <Formik initialValues={props.data}
      validationSchema={oneValidationSchema}
      onSubmit = {handleSubmit}
    >
      {() => (
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
          <Grid item sx={{mt:4}}>
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
          <Grid item sx={{mt:4}}>
          <FormikControl
            name="price"
            control="materialInput"
            label="Price"
            type="number"
          /></Grid>

          <Grid item sx={{mt:4}}>
           <FormikControl
            name="quantity"
            control="materialInput"
            label="Quantity"
            type="number"
          /></Grid>
    

          <Grid item sx={{mt:4}}>
          <FormikControl
            name="price_negotiable"
            control="radioBtn"
            label="Price Negotiable"
            options={dualOptions}
          />
          </Grid>
          <Grid item sx={{mt:4}}>
          <FormikControl
            name="condition"
            control="materialSelect"
            label="Condition"
            type="text"
            options={conditionOptions}
            sx={{ width: 215 }}
          />
          </Grid>
          <Grid item sx={{mt:4}}>
          <FormikControl
            name="expire"
            control="materialSelect"
            label="Expire"
            type="text"
            options={expireOptions}
            sx={{ width: 215 }}
          />
          </Grid>
          <Button sx={{mb:5}} variant="contained" type="submit">Next</Button>
        </Form>
        </Grid>

      )}

    </Formik>
  )
}

export default StepOne