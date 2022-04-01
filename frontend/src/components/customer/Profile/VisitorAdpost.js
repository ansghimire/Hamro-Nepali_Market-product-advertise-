import React, { useState, useEffect } from 'react'
import { Card, Grid, CardMedia, Divider, CardHeader, IconButton, Typography } from '@mui/material'
import axios from 'axios'
import { useAuth } from '../../../utils/auth'
import images from '../../../assets/images'
import { makeStyles } from '@mui/styles'
import MoreVertIcon from '@mui/icons-material/MoreVert'



const useSyles = makeStyles({
    img: {
        height: "10rem",
        objectFit: 'cover',
        backgroundSize: "cover"
    },
})


const VisitorAdpost = () => {
    const [adsList, setAdsList] = useState(null)
    const [img, setImg] = useState([])
    const auth = useAuth();
    const classes = useSyles();
 

   

    useEffect(() => {
        if (auth.access) {
            axios.get('http://localhost:8000/api/profile/1/ads-listing-visitor/', {
                headers: {
                    Authorization: `Bearer ${auth.access}`
                }
            }).then(response => {
                // console.log(response.data)
                setAdsList(response.data)
            }).catch(error => {
                console.log(error)
            })
        }

    }, [auth.access])

    useEffect(() => {
        if (auth.access) {
            axios.get('http://localhost:8000/api/media/', {
                headers: {
                    Authorization: `Bearer ${auth.access}`
                }
            })
                .then(response => {
                    console.log(response.data)
                    setImg(response.data)

                }).catch(error => console.log(error))
        }

    }, [auth.access])



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

    if (!adsList) return 'Loading............'


    return (
        <>
            {
                adsList.map((item, index) => (
                    <Grid item key={index}>
                        <Card elevation={1} sx={{ maxWidth: 200, marginLeft: "9px", marginBottom: "10px" }}>
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
                            <Typography sx={{ ml: 2 }} variant="h6">Rs {item.price}</Typography>
                        </Card>

                    </Grid>
                ))
            }
        </>
    )
}

export default VisitorAdpost