import React, { useEffect, useState } from 'react'
import images from '../../assets/images'
import { Card, CardHeader, CardMedia, Divider, Grid, IconButton, Typography,Snackbar,Alert } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useAuth } from '../../utils/auth'
import {Link} from 'react-router-dom'

const useSyles = makeStyles({
    img: {
        height: "20rem",
        objectFit: 'cover',
        backgroundSize: "cover"
    },
})




function ProductList() {
    const [listProduct, setListProduct] = useState(null)
    const [img, setImg] = useState([])
    const classes = useSyles();
    const auth = useAuth()
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    useEffect(() => {
        axios.get('http://localhost:8000/api/product/')
            .then(response => {
                //   console.log(response.data);
                setListProduct(response.data)
            }).catch(err => console.log(err));

    }, [])


    useEffect(() => {
        axios.get('http://localhost:8000/api/media/')
            .then(response => {
                console.log(response.data)
                setImg(response.data)

            }).catch(error => console.log(error))
    }, [])


    function showImg(pr_id) {
        let src;
        img.filter(res => {
            if (res.product === pr_id) {
                src = res.image_url
            }
            return null
        })
        return src

    }




    if (!listProduct) return 'Loading............'

    const funcSave = (id) => {
        axios.post('http://localhost:8000/api/saved-list/', { product: `${id}` }, {
            headers: {
                Authorization: `Bearer ${auth.access}`
            },

        }).then(res => {
            // console.log(res.data)
            setOpen(true);
            setSuccess('Succesfully Saved to the Saved list')
        }).catch(err => {
            console.log(err)
            setOpen(true);
            setError(err.response.data.detail)
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
        setError(null);
        setSuccess(null);
      };



    return (
        <> { error &&
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
            }
            {
            success &&
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {success}
                </Alert>
            </Snackbar>
            }   

            {
                listProduct.map((item, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <Card elevation={1} sx={{ maxWidth: 345, marginLeft: "9px", marginBottom: "10px" }}>
                            <Link to ={`/${item.product_id}`}>
                            <CardMedia
                                component="img"
                                className={classes.img}
                                image={showImg(item.product_id) === undefined ? images[0] : showImg(item.product_id)}
                                alt="pic" />
                            <Divider />
                            <CardHeader
                                action={
                                    <>
                                        <IconButton>
                                            <MoreVertIcon />
                                        </IconButton>
                                    </>
                                }
                                title={item.title}
                                subheader={item.condition}
                            />
                            <div className='flex justify-between items-between'>
                                <Typography sx={{ ml: 2 }} variant="h6">Rs {item.price}</Typography>
                                {
                                    auth.access && <IconButton onClick={() => funcSave(item.product_id)}>
                                        <BookmarkBorderIcon />
                                    </IconButton>
                                }

                            </div>

                            </Link>
                        </Card>
                        
                    </Grid>
                ))
            }
        </>
    )
}

export default ProductList