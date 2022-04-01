import React from 'react';
import { Chip, Grid, Divider, TextField, Card, IconButton, CardContent, CardHeader, CardMedia, Typography, } from '@mui/material'
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';
import { DeleteOutlined } from '@mui/icons-material'
import UpdateIcon from '@mui/icons-material/Update';

const useStyles = makeStyles({
    chip: {
        fontSize: "20px",
        cursor: "pointer",
        '&:hover': {
            background: "#D3D3D3"
        }
    }
})

const ViewProduct = () => {
    const classes = useStyles();
    const [productType, setProductType] = useState([])
    const [product, setProduct] = useState([])
    // const [productId, setProductId] = useState([])
    const [img, setImg] = useState([])


    useEffect(() => {
        axios.get('http://localhost:8000/api/product-type/')
            .then(response => {
                // console.log(response.data)
                setProductType(response.data)

            }).catch(error => {
                console.log(error)
            })
    }, [])


    useEffect(() => {
        axios.get('http://localhost:8000/api/product/')
            .then(response => {
                setProduct(response.data) 
            })
            .catch(error => {
                console.log(error);
            })
    }, [])


    useEffect(()=> {
        axios.get('http://localhost:8000/api/media/')
        .then(response=> {
            setImg(response.data)

        }).catch(error=> console.log(error))
    }, [])


    function showImg(pr_id) {
        let src;
        img.filter(res=> {
            if(res.product === pr_id){
                src = res.image_url
            }
        })
        return src
        
    }


    return <>
        <Grid container>
            <Grid item>
                <Chip label="All" className={classes.chip} variant="outlined" size="medium" />
            </Grid>
            {
                productType.map((item, index) => (
                    <Grid item key={index} sx={{ ml: 1, mb: 1 }}>
                        <Chip label={item.type_name} className={classes.chip} variant="outlined" size="medium" />
                    </Grid>
                ))
            }

        </Grid>
        <Divider sx={{ mt: 1 }} />
        <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <Grid item >
                <TextField label="Search Product" />
            </Grid>
        </Grid>

        <Grid container direction="row" sx={{ mt: 8 }} spacing={2}>
            {
                product.length > 0 ?
                    product.map((result, index) => (
                        <Grid item key={index} xs={12} md={6} lg={4}>
                            <Card elevation={1}>
                                <CardHeader
                                    action={
                                        <>
                                            <IconButton>
                                                {/* <Link to={`../edit-product-type/${result.type_id}`}> */}
                                                <UpdateIcon />
                                                {/* </Link> */}
                                            </IconButton>
                                            <IconButton>
                                                <DeleteOutlined />
                                            </IconButton>
                                        </>
                                    }
                                    title={result.title}
                                    subheader={result.type.type_name}
                                />
                                
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image = {showImg(result.product_id) === undefined ? 'http://localhost:8000/media/uploads/2021-11-18_11_51_45-Cisco_Packet_Tracer_8vWHjtd.png':showImg(result.product_id) }
                                    alt="Paella dish"
                                />
                                <Divider />
                                <CardContent>
                                    <Typography>
                                        <b>Rs:{result.price}</b> <i>|</i> {result.condition}
                                    </Typography>
                                </CardContent>
                            </Card>

                        </Grid>


                    ))
                    : 'loading'
            }
        </Grid>
    </>;
};

export default ViewProduct;
