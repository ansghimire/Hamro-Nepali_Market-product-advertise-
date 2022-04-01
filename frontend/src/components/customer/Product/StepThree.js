import React from 'react'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from '../../common/formik/FormikControl'
import { Button, Grid } from '@mui/material'

const threeValidationSchema = Yup.object({
    RAM: Yup.string().required(),
    screen_size: Yup.string().required(),
    processor: Yup.string().required()
});

const StepThree = (props) => {
    const handleSubmit = (values) => {
        console.log('luv', values)
        props.next(values, true)
    }

    return (
        <Formik
            initialValues={props.data}
            // validationSchema={threeValidationSchema}
            onSubmit={handleSubmit}
        >
            {({ values }) => (
                <Form>
                    {
                        props.result.map((element, index) => {
                            let options = element.attribute_val.map((item) => {
                                return { key: item.attribute_value, value: item.attribute_value_id }
                            })
                            return (
                                <FormikControl
                                    key={index}
                                    name={element.attribute_name}
                                    control="materialSelect"
                                    label={element.attribute_name}
                                    options={options}
                                    sx={{ width: 215 }}

                                />
                            )
                        })
                    }
                    <Grid container spacing={2} sx={{mt:2, mb:6}}>
                        <Grid item>
                            <Button variant="outlined" type="button" onClick={() => props.prev(values)}>
                                Back
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button variant="contained" type="submit">Submit</Button>
                        </Grid>
                    </Grid>
                </Form>
            )}

        </Formik>
    )
}

export default StepThree