import React, {useState, useEffect } from 'react'
import { useParams , useNavigate} from 'react-router-dom'
import UserLayout from '../UserLayout'
import { Paper, Typography, Stack, Avatar,Grid, Divider, Button, Rating, Dialog, DialogActions, DialogContent, TextField, DialogTitle } from '@mui/material'
import { makeStyles } from '@mui/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios'
import { useAuth } from '../../../utils/auth';
import VisitorReview from './VisitorReview';
import VisitorAdpost from './VisitorAdpost';

const useSyles = makeStyles({

    makeSticky: {
        height: "10rem",
        width: "10rem",
        position: "sticky",
        top: "4rem",
    }
})


function Visitor() {
    const { id } = useParams();
    const classes = useSyles();
    const [open, setOpen] = React.useState(false);
    const [rate, setRate] = React.useState(null);
    const [response, setResponse] = React.useState('');
    const auth = useAuth();
    const [profile, setProfile] = React.useState(null)
    const [current, setCurrent] = useState('ad-post')
    const navigate = useNavigate();
    

    useEffect(() => {
        if (auth.access) {
            axios.get(`http://localhost:8000/api/profile/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.access}`
                }
            }).then(response => {
                //   console.log(response.data)
                setProfile(response.data)
            }).catch(error => {
                if(error){
                    navigate('/profile')
                }
            })
        }

    }, [id, auth.access, navigate])


    useEffect(() => {
        if (auth.access) {
            axios.get(`http://localhost:8000/api/profile/${id}/review-by-me/`, {
                headers: {
                    Authorization: `Bearer ${auth.access}`
                }
            }).then(response => {
                console.log(response.data)
                setRate(response.data.rating)
                if (response.data.response === null) {
                    setResponse('')
                } else {
                    setResponse(response.data.response)
                }

            }).catch(error => {
                console.log(error)
            })
        }
    }, [auth.access, id,])



    if (profile === null) return "Loading..........."





    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);

    };

    const handleSubmit = (e) => {
        e.preventDefault()

        if (rate < 1) {
            alert('Rate should be selected')
            return
        }
        if (response === '') {
            alert("Response cannot be empty")
            return
        }
        axios.put(`http://localhost:8000/api/profile/${id}/review-by-me/`, { rating: rate, response: response }, {
            headers: {
                Authorization: `Bearer ${auth.access}`
            }
        }).then(response => {
            // console.log(response)
            setRate(response.data.rating)
            setResponse(response.data.response)

        }).catch(error => {
            console.log(error)
        })

    }

    function filterVal(name) {
        setCurrent(name)
    }

    return (
        <>
            <UserLayout />
            {/* visitor-{id} */}
            <div className='container w-[90vw] flex flex-wrap justify-around md:ml-
            [30px] lg:ml-[80px]'>

                {/* 1st flex */}
                <div className='user-info w-[23rem]'>
                    <Paper elevation={15} sx={{ padding: "16px" }}>
                        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                            <Avatar alt="profile" sx={{ width: 100, height: 100 }} />
                        </Stack>
                        <Divider />
                        <div className="p-[1rem]">
                            <div>
                                <h1 className='text-lg font-bold text-gray-500 mb-1'>{profile.name}</h1>
                                <h1 className='text-lg text-gray-500 mb-2'>{profile.mobile}</h1>
                            </div>
                            <Divider />

                            <div className='flex space-x-3 mt-3'>
                                <LocationOnIcon />
                                <h1 className='text-lg text-gray-500'>{profile.provience}|({profile.locality})</h1>
                            </div>
                            <Divider sx={{ marginTop: '3px' }} />
                        </div>
                        <div className='mt-1'>
                            <Button variant="outlined" onClick={handleClickOpen}>
                                Review User
                            </Button>
                            <Dialog open={open} onClose={handleClose}>
                                <form onSubmit={handleSubmit}>
                                    <DialogTitle>Review</DialogTitle>
                                    <DialogContent>

                                        {rate === null && (
                                            <Typography component="legend">No rating given</Typography>
                                        )}

                                        <Rating
                                            name="simple-controlled"
                                            value={rate}
                                            onChange={(event) => {
                                                setRate(parseInt(event.target.value));
                                            }}
                                        />


                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            name="response"
                                            value={response}
                                            onChange={e => setResponse(e.target.value)}
                                            label="Response"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                        />

                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button type="submit" onClick={handleClose}>Rate User</Button>
                                    </DialogActions>
                                </form>
                            </Dialog>
                        </div>

                    </Paper>
                </div>

                {/* 2nd flex */}
                <div className="user-details w-[35rem]">
                    <Paper elevation={15} sx={{ padding: "16px" }}>
                        <div className="header flex justify-between m-[0.5rem] cursor-pointer">
                            <h1 onClick={() => filterVal('ad-post')}>Ad post</h1>
                            <h1 onClick={() => filterVal('reviews')}>Reviews</h1>
                        </div>
                         <Divider/>
                         {current === 'ad-post' && <Grid container sx={{ mt: 2, mb: 2 }} spacing={3} direction="row">
                                <VisitorAdpost />
                            </Grid>
                            }

                         {current === 'reviews' && <VisitorReview profileId={id}/>} 
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

export default Visitor