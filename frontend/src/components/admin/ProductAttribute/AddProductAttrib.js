import React from 'react'
import { Typography, ButtonGroup, Button, TextField, Divider, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';
import ViewAttribute from './ViewAttribute';
import ViewAttributeValue from './ViewAttributeValue';
import { useFormik } from 'formik';
import { useCreateAttributeMutation } from '../../../services/AttribApi'
import AddAttributeValue from './AddAttributeValue'
import { useAuth } from '../../../utils/auth';

const useStyles = makeStyles({

    btnAttrib: {
        color: 'white',
        backgroundColor: 'gray',
        borderRadius: 25,
        marginRight: '7px',
        '&:hover': {
            background: '#a9a9a9',
        }
    },
    btnAttribVal: {
        color: 'white',
        backgroundColor: 'gray',
        borderRadius: 25,
        marginRight: '5px',
        '&:hover': {
            background: '#a9a9a9',
        }
    },
})

// custom validation
const validate = values => {
    const errors = {};
    if (!values.attribute_name) {
        errors.attribute_name = "Required *"
    } else if (values.attribute_name.length < 3) {
        errors.attribute_name = 'Must be greater than 3 characters or more'
    } else if (values.attribute_name.length > 20) {
        errors.attribute_name = "Must be less than 20 characters"
    }
    return errors;
}



const AddProductAttrib = () => {
    const [flag, setFlag] = React.useState(false);
    const [attribValueFlag, setAttribValueFlag] = React.useState(false);
    const [viewAttrib, setViewAttrib] = React.useState(false);
    const [viewAttribVal, setViewAttribVal] = React.useState(false);
    const [createAttribute, responseInfo] = useCreateAttributeMutation();
    const auth = useAuth()
   

    const formik = useFormik({
        initialValues: {
            attribute_name: '',
        },
        validate,
        onSubmit: (values, {resetForm}) => {
            // console.log(values)
            if (auth.access) {
            createAttribute({ 'attribute_name': values.attribute_name,access:auth.access  })
            }
            resetForm(values)

        }
    })

    const classes = useStyles();
    

    const openField = () => {
        setFlag(!flag);
        setAttribValueFlag(false)
    }
    const openAttriubteField = () => {
        setAttribValueFlag(!attribValueFlag);
        setFlag(false)
    }

    const changeViewAttrib = () => {
        setViewAttrib(!viewAttrib);
        setViewAttribVal(false);

    }
    const changeViewAttribVal = () => {
        setViewAttribVal(!viewAttribVal);
        setViewAttrib(false);
    }

  

    return (
        <>
            <Grid container spacing={4} >
                <Grid item xs={12} sm={12} md={5}>
                    <Button sx={{ mb: 3 }} size="small" variant="outlined" className={classes.btnAttrib}
                        onClick={() => openField()} >
                        <Typography variant="subtitle2" >Add  Attribute</Typography> <AddIcon style={{ color: 'white' }} />
                    </Button>

                    <Button sx={{ mb: 3 }} size="small" variant="outlined" className={classes.btnAttribVal}
                        onClick={() => openAttriubteField()} >
                        <Typography variant="body2">Add Attribute Value</Typography> <AddIcon style={{ color: 'white' }} />
                    </Button>
                    <Divider sx={{ mb: 4 }} />

                    {/* {
                        //responseInfo.isSuccess ? setInterval(() => {
                        <div> Successfully updated</div>
                    }, 5000): null} */}


                    {flag && <form onSubmit={formik.handleSubmit}>

                        <TextField id="attribute_name"
                            name="attribute_name" variant="outlined"
                            size="small"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.attribute_name}

                        /><br />
                        {
                            formik.touched.attribute_name && formik.errors.attribute_name ? (
                                <div>
                                    <Typography color="error.main">{formik.errors.attribute_name}
                                    </Typography>
                                </div>
                            ) : null
                        }
                        < Button variant="contained" color="success" type="submit"
                            size="small" sx={{ ml: 2, mt: 1 }}>Add Attribute</Button>
                    </form>
                    }

                    {attribValueFlag &&
                            <AddAttributeValue/>
                       
                    }

                </Grid>
                <Grid item xs={12} sm={12} md={7} style={{ backgroundColor: "#F3F3F3", minHeight:'90vh' }} >
                    <Grid container direction="column">
                        <Grid item>
                            <ButtonGroup size="large">
                                <Button color="secondary" variant="contained" onClick={() => changeViewAttrib()}>View All Attributes</Button>
                                <Button onClick={() => changeViewAttribVal()}>View All Attributes Values</Button>
                            </ButtonGroup>
                        </Grid>
                        {viewAttrib && <Grid item>
                            <ViewAttribute />
                        </Grid>}
                        {viewAttribVal && <Grid item>
                            <ViewAttributeValue />
                        </Grid>}
                    </Grid>
                </Grid>
            </Grid>

        </>
    )
}

export default AddProductAttrib
