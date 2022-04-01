import React from 'react'
import { Box, Container, Divider, Grid, Paper, Typography } from '@mui/material'
// import MoreVertIcon from '@mui/icons-material/MoreVert'
// import images from '../../assets/images'
import UserLayout from './UserLayout'

// import './HomePage.css'
import TopView from './TopView'
import { makeStyles } from '@mui/styles';
import  ProductList  from './ProductList'


const useSyles = makeStyles({
   
    makeSticky: {
        height: "10rem",
        width: "10rem",
        position: "sticky",
        top: "4rem",
    }
})


function HomePage() {
    const classes = useSyles();
    return (
        <React.Fragment>
             <UserLayout />
            {/* slider start  */}
            <Container fixed>
            <div className='lg:w-auto md:w-auto '>
            <Box
                sx={{
                    // marginTop: "7rem",
                    overflow: 'hidden',
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
                    {/* {End of Top views} */}
                </Paper>
            </Box>
            </div>
            </Container>
            {/* slider complete */}



            <Container fixed>
            <div className='lg:w-auto md:w-auto '>
            <Grid container sx={{ mt: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
            >
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
                            {/* showing all the productlist */}
                           <ProductList/>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={4} className={classes.makeSticky}>
                    <Paper elevation={15} sx={{height:"88vh", padding: "1rem 3rem"}}>
                        <Typography sx={{fontSize:"13px"}}>copyright@2022, Hamro Nepali Market</Typography>
                    </Paper>
                </Grid>

              

            </Grid>
            </div>
            </Container>

        </React.Fragment>
    )
}

export default HomePage