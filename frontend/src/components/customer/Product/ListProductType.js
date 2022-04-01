import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Grid, Typography, Container, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { styled } from '@mui/material/styles';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

import UserLayout from '../UserLayout'


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const ListProductType = () => {
    const [category, setCategory] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/category-list/')
            .then(response => {
                console.log(response.data)
                setCategory(response.data)
            })
            .catch(err => console.log(err))
    }, [])

    const setTitle = (title) => {
        let a = title.substr(0, 1)
        let b = title.substr(1,)
        return (a.toUpperCase() + b.toLowerCase())
    }


    return (
        <>
            <UserLayout />
            <Container fixed>
            <Grid container >
                <Grid item>
                    <Typography gutterBottom variant="h2">List of all available Categories</Typography>

                </Grid>
            </Grid>
            <Grid container spacing={1}>
                {
                    category.map((cat, index) => {
                        return (
                            <Grid item key={index} xs={12} md={6} lg={4}>
                                {/* <Typography variant="h4" key={index}>{setTitle(cat.category_name)}</Typography> */}
                                <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
                                    {setTitle(cat.category_name)}
                                </Typography>
                                <Demo>
                                    <List>
                                        {
                                            cat.product_type.length > 0 ? cat.product_type.map((type, index) => (
                                                <ListItem key={index} >
                                                    <Link to={`/add-product/${type.type_id}`}>
                                                        <ListItemIcon>

                                                            <AddCircleOutlineRoundedIcon style={{ fontSize: "2.4rem" }} />

                                                        </ListItemIcon>
                                                    </Link>
                                                    <Link to={`/add-product/${type.type_id}`}>
                                                        <ListItemText
                                                            primary={type.type_name}
                                                        />
                                                    </Link>


                                                </ListItem>
                                            )) : <ListItemText primary="No Product Type" />
                                        }
                                    </List>
                                </Demo>


                            </Grid>


                        )
                    })
                }
            </Grid>
            </Container>

        </>
    )
}

export default ListProductType