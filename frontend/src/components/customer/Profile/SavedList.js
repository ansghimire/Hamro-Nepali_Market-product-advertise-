import React, { useState, useEffect } from 'react'
import { Card, CardMedia, Divider, Grid, CardHeader, IconButton, Typography } from '@mui/material'
import axios from 'axios'
import { useAuth } from '../../../utils/auth'
import { makeStyles } from '@mui/styles'
import images from '../../../assets/images'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete';


const useSyles = makeStyles({
    img: {
        height: "10rem",
        objectFit: 'cover',
        backgroundSize: "cover"
    },
})

const SavedList = () => {
    const [savedList, setSavedList] = useState(null)
    const [img, setImg] = useState([])
    const auth = useAuth();
    const classes = useSyles();
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
   

    useEffect(() => {
        // if (auth.access) {
        axios.get('http://localhost:8000/api/saved-list/', {
            headers: {
                Authorization: `Bearer ${auth.access}`
            }
        }).then(response => {
            setSavedList(response.data)

        }).catch(error => {
            console.log(error)
        })

        // }
    }, [auth.access, success])

    useEffect(() => {
        // if (auth.access) {
        axios.get('http://localhost:8000/api/media/', {
            headers: {
                Authorization: `Bearer ${auth.access}`
            }
        })
            .then(response => {
                console.log(response.data)
                setImg(response.data)

            }).catch(error => console.log(error))
        // }

    }, [auth.access, success])

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



    const funcDelete = (pr_id) => {
        axios.delete(`http://localhost:8000/api/saved-list/${pr_id}/`, {
            headers: {
                Authorization: `Bearer ${auth.access}`
            }
        }).then(response => {
            if (response.data) {
                setSuccess("Successfully deleted")
            }
        }).catch(err => {
            setError(err.response.data.detail)
        })
    }

    if (!savedList) return 'Loading............'



    return (
        <>
           
            {
                savedList.map((item, index) => (
                    <Grid item key={index}>
                        <Card elevation={1} sx={{ maxWidth: 200, marginLeft: "9px", marginBottom: "10px" }}>
                            <CardMedia
                                component="img"
                                className={classes.img}
                                image={showImg(item.product.product_id) === undefined ? images[0] : showImg(item.product.product_id)}
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
                                title={item.product.title}
                                subheader={item.product.condition}
                            />
                            <div className='flex justify-between items-between'>
                                <Typography sx={{ ml: 2 }} variant="h6">Rs {item.product.price}</Typography>
                                <IconButton onClick={() => funcDelete(item.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </Card>
                    </Grid>
                ))
            }
        </>
    )
}

export default SavedList