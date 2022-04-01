import React from 'react'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from '../../common/formik/FormikControl'
import { Grid, Button } from '@mui/material';

const twoValidationSchema = Yup.object({
    used_for: Yup.string().required(),
    owndership_document_provided: Yup.string().required("Required"),
    home_delivery: Yup.string().required("Required"),
    delivery_area: Yup.string().required("Required"),
    warranty_type: Yup.string().required("Required"),
    warranty_period: Yup.string().required("Required")
});

const Ownership_options = [
    {
        key: 'Original Purchase Bill',
        value: "Original Purchase Bill"
    },
    {
        key: "Stamped waranty card",
        value: "Stamped waranty card"
    },
    {
        key: "I do not have any document",
        value: "I do not have any document",
    },
]
const delivery_options = [
    {
        key: 'within my area',
        value: "within my area"
    },
    {
        key: "within my city",
        value: "within my city"
    },
    {
        key: "almost anywhere in nepal",
        value: "almost anywhere in nepal",
    },
]

const warranty_options = [
    {
        key: 'Dealer/Shop',
        value: "Dealer/Shop",
    },
    {
        key: "Manufacturer/Importer",
        value: "Manufacturer/Importer"
    },
    {
        key: "No Warranty",
        value: "No Warranty",
    },
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




const StepTwo = (props) => {

    const handleSubmit = (values) => {
        props.next(values)
    }


    return (
        <Formik
            initialValues={props.data}
            validationSchema={twoValidationSchema}
            onSubmit={handleSubmit}
        >
            {({ values }) => (
                <Grid container direction="column">
                    <Form>
                        <Grid item>
                            <FormikControl
                                name="used_for"
                                control="materialInput"
                                label="Used For"
                                type="text"
                            />
                        </Grid>
                        <Grid item sx={{ mt: 4 }}>
                            <FormikControl
                                name="owndership_document_provided"
                                control="materialSelect"
                                label="Ownership Document Provided"
                                type="text"
                                options={Ownership_options}
                                sx={{ width: 215 }}
                            />
                        </Grid>
                        <Grid item sx={{ mt: 4 }}>
                            <FormikControl
                                name="home_delivery"
                                control="radioBtn"
                                label="Home Delivery"
                                options={dualOptions}
                            />
                        </Grid>
                        <Grid item sx={{ mt: 4 }}>
                            <FormikControl
                                name="delivery_area"
                                control="materialSelect"
                                label="Delivery Area"
                                options={delivery_options}
                                sx={{ width: 215 }}
                            />
                        </Grid>

                        <Grid item sx={{ mt: 4 }}>
                            <FormikControl
                                name="warranty_type"
                                control="materialSelect"
                                label="Warranty Type"
                                options={warranty_options}
                                sx={{ width: 215 }}
                            />
                        </Grid>

                        <Grid item sx={{ mt: 4 }}>
                            <FormikControl
                                name="warranty_period"
                                control="materialInput"
                                label="Warranty Period"
                                type="text"
                            />
                        </Grid>

                        <Grid container spacing={2} sx={{mt:2, mb:6}}>
                            <Grid item>
                                <Button variant="outlined" type="button" onClick={() => props.prev(values)}>
                                    Back
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" type="submit">Next</Button>
                            </Grid>
                        </Grid>
                    </Form>
                </Grid>
            )}

        </Formik>
    )
}

export default StepTwo