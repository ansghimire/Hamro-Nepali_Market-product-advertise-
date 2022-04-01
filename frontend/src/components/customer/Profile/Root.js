import React, { useState, useEffect } from 'react'
import { Avatar, Divider, Paper, Stack, Grid, Typography } from '@mui/material'
import UserLayout from '../UserLayout'
import DialogUpload from './DialogUpload'
import { UserData } from './UserData'
import { useAuth } from '../../../utils/auth'
import axios from 'axios'
import { makeStyles } from '@mui/styles';
import Adpost from './Adpost'
import SavedList from './SavedList'
import { Review } from './Review'

const useSyles = makeStyles({

    makeSticky: {
        height: "10rem",
        width: "10rem",
        position: "sticky",
        top: "4rem",
    }
})

const Root = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const [current, setCurrent] = useState('ad-post')
    const classes = useSyles();




    useEffect(() => {
        if (auth.access) {
            axios.get('http://localhost:8000/api/profile/me/', {
                headers: {
                    Authorization: `Bearer ${auth.access}`
                }
            }).then(response => {
                setData(response.data)
                setLoading(false)
            }).catch(error => {
                console.log(error)
                setLoading(true)
            })
        }

    }, [auth.access])

    if (loading) return 'Loading .............'

    function filterVal(name) {
        setCurrent(name)
    }


    return (
        <>
            <UserLayout />
            <div className='container w-[90vw] flex flex-wrap justify-around md:ml-[30px] lg:ml-[80px]'>
                {/* 1st flex */}
                <div className='user-info w-[23rem]'>
                    <Paper elevation={15} sx={{ padding: "16px" }}>
                        <Stack direction="row" spacing={2} >
                            <Avatar alt="Profile" sx={{ width: 100, height: 100 }} src={data.photo ? `http://localhost:8000${data.photo}` : ''} />
                            <h1 style={{ marginTop: "5px" }}>Information about Profile</h1>
                        </Stack>
                        <div className='mt-4'>
                            <DialogUpload />
                        </div>

                        <div className='user-data mt-[30px]'>
                            <UserData data={data} />
                        </div>
                    </Paper>
                </div>

                {/* 2nd flex */}
                <div className="user-details w-[35rem]">
                    <Paper elevation={15} sx={{ padding: "16px" }}>
                        <div className="header flex justify-between m-[0.5rem] cursor-pointer">
                            <h1 onClick={() => filterVal('ad-post')}>Ad post</h1>
                            <h1 onClick={() => filterVal('saved-list')}>Saved List</h1>
                            <h1 onClick={() => filterVal('reviews')}>Reviews</h1>
                        </div>
                        <Divider />


                        {
                            current === 'ad-post' && <Grid container sx={{ mt: 2, mb: 2 }} spacing={3} direction="row">
                                <Adpost />
                            </Grid>

                        }
                        {
                            current === 'saved-list' && <Grid container sx={{ mt: 2, mb: 2 }} spacing={3} direction="row">
                                <SavedList />
                            </Grid>
                        }
                        {
                            current === 'reviews' && <Review/>
                        }


                    </Paper>
                </div>

                {/* 3rd flex */}
                <div className="footer w-[20rem]">
                    <Paper elevation={15} sx={{ height: "88vh", padding: "1rem 3rem", width: "auto" }} className={classes.makeSticky}>
                        <Typography sx={{ fontSize: "13px" }}>copyright@2022, Hamro Nepali Market</Typography>
                    </Paper>
                </div>


            </div>

        </>
    )
}

export default Root
