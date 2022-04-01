import React from 'react'
import { Box, Card, CardContent, Container, CardHeader, CardMedia, Divider, Grid, IconButton, Paper, Typography } from '@mui/material'
import TopView from './TopView'
import images from '../../assets/images'
import UpdateIcon from '@mui/icons-material/Update';
// import MoreVertIcon from '@mui/icons-material/MoreVertIcon'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { makeStyles } from '@mui/styles';

const useSyles = makeStyles({
    root: {
        background: "red"

    },
    img: {
        height: "20rem",
        objectFit: 'cover'
    },
    makeSticky: {
        position: "sticky",
        top: "10rem",
        minWidth: "275"
    }
})

const HomePage = () => {
    const classes = useSyles();

    return (<>
        {/* <Container> */}
        <Box
            sx={{
                display: 'flex',
                justifyContent: "center",
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                    height: 450,
                },
            }}>
            <Paper style={{ backgroundColor: "#f4f4f478" }} >
                <Typography variant="h6" sx={{
                    color: 'black',
                    marginBottom: '8px',
                    borderRight: '2px solid black'
                }} >
                    Top Viewed
                </Typography>
                <Divider sx={{ backgroundColor: 'black', border: '2px solid black' }} />

                {/* TO showing top views components*/}
                <TopView />
            </Paper>
        </Box>
        {/* </Container> */}


        {/* <Container> */}
        <Grid container sx={{ mt: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
            <Grid item xs={8}>
                <Paper elevation={2}>
                    <Typography variant="h6" sx={{
                        color: 'black',
                        marginBottom: '8px',
                        borderRight: '2px solid black'
                    }} >
                        Recent
                    </Typography>
                    <Divider sx={{ backgroundColor: 'black', border: '2px solid black' }} />


                    <Grid container sx={{ mt: 2, mb: 2 }} spacing={3}
                    >
                        <Grid item xs={12} md={6} lg={4} >
                            <Card elevation={1} sx={{ maxWidth: 345, marginLeft: "9px", marginBottom:"10px" }}>

                                <CardMedia
                                    component="img"
                                    className={classes.img}
                                    image={images[0]}
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
                                    title="Pulsar"
                                    subheader="Brand New"
                                />
                                <Typography sx={{ ml: 2 }} variant="h6">Rs 16,500</Typography>


                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Card elevation={1} sx={{ maxWidth: 345 }}>

                                <CardMedia
                                    component="img"
                                    className={classes.img}
                                    image={images[1]}
                                    alt="pic" />

                                <CardHeader
                                    action={
                                        <>
                                            <IconButton>
                                            <MoreVertIcon />
                                            </IconButton>
                                        </>
                                    }
                                    title="Pulsar"
                                    subheader="Like New"
                                />
                                 <Typography sx={{ ml: 2 }} variant="h6">Rs 16,500</Typography>

                                <Divider />
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Card elevation={1} sx={{ maxWidth: 345 }}>

                                <CardMedia
                                    component="img"
                                    className={classes.img}
                                    image={images[1]}
                                    alt="pic" />

                                <CardHeader
                                    action={
                                        <>
                                            <IconButton>
                                            <MoreVertIcon />
                                            </IconButton>
                                        </>
                                    }
                                    title="Pulsar"
                                    subheader="Like New"
                                />
                                 <Typography sx={{ ml: 2 }} variant="h6">Rs 16,500</Typography>

                                <Divider />
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Card elevation={1} sx={{ maxWidth: 345 }}>

                                <CardMedia
                                    component="img"
                                    className={classes.img}
                                    image={images[1]}
                                    alt="pic" />

                                <CardHeader
                                    action={
                                        <>
                                            <IconButton>
                                            <MoreVertIcon />
                                            </IconButton>
                                        </>
                                    }
                                    title="Pulsar"
                                    subheader="Like New"
                                />
                                 <Typography sx={{ ml: 2 }} variant="h6">Rs 16,500</Typography>

                                <Divider />
                            </Card>
                        </Grid>
                    </Grid>



                </Paper>
            </Grid>
            <Grid item xs={4}> 
               {/* <div className="sticky top-[30rem]"> */}
                <Paper elevation={3} className={classes.makeSticky}>
                    This is second typography
                </Paper>
                {/* </div> */}
            </Grid>
        </Grid>
        {/* </Container> */}



    </>
    )
}

export default HomePage