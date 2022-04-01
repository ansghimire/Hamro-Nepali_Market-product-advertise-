import React, { useEffect, useState } from 'react'
import images from '../../../assets/images'
import { Card, CardHeader, CardMedia, Divider, Grid, IconButton, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import { useAuth } from '../../../utils/auth'

const useSyles = makeStyles({
    img: {
        height: "10rem",
        objectFit: 'cover',
        backgroundSize: "cover"
    },
})



const SimilarProduct = () => {
    const [listProduct, setListProduct] = useState(null)
    const [img, setImg] = useState([])
    const classes = useSyles();
    const auth = useAuth()

    useEffect(() => {
        axios.get('http://localhost:8000/api/product/?category=laptop', {
            // headers: {
            //   Authorization: `Bearer ${auth.access}`
            // }
          })
            .then(response => {
                //   console.log(response.data);
                setListProduct(response.data)
            }).catch(err => console.log(err));

    }, [])

    useEffect(() => {
        axios.get('http://localhost:8000/api/media/',{
            headers: {
              Authorization: `Bearer ${auth.access}`
            }
          })
            .then(response => {
                console.log(response.data)
                setImg(response.data)

            }).catch(error => console.log(error))
    }, [])


    function showImg(pr_id) {
        let src;
        img.filter(res=> {
            if(res.product === pr_id){
                src = res.image_url
            }
            return null
        })
        return src
        
    }
    
    if (!listProduct) return 'Loading............'


    return (
        <>
              {
                listProduct.map((item, index) => (
                    // <Grid item xs={12} md={6} lg={2} key={index} style={{background:"red", height:"90vh"}} >
                        // <div className='flex mt-5 flex-wrap h-[80vh]'>
                       <Grid item key={index}> 
                       <Card elevation={1} sx={{ maxWidth: 200, marginLeft: "9px", marginBottom: "10px" }}>

                            <CardMedia
                                component="img"
                                className={classes.img}
                                image = {showImg(item.product_id) === undefined ? images[0]:showImg(item.product_id) }
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
                            <Typography sx={{ ml: 2 }} variant="h6">Rs {item.price}</Typography>
                        </Card>
                         {/* </div> */}
                    </Grid>
                ))
            }
        </>
    )
}

export default SimilarProduct