import React, { useState, useEffect } from 'react'
import { Grid, Paper, Avatar, Rating } from '@mui/material/'
import axios from 'axios'
import { useAuth } from '../../../utils/auth'

const VisitorReview = ({ profileId }) => {
    const [reviews, setReviews] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = useAuth();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/profile/${profileId}/review/`, {
            headers: {
                Authorization: `Bearer ${auth.access}`
            }
        }).then(response => {
            setReviews(response.data)
            setLoading(false)
        }).catch(error => {
            console.log(error)
            setLoading(true)
        })

    }, [auth.access, profileId])

    if (loading) return 'Loading............'


    return (
        <div className='review-section mt-[10px]'>
            {
                reviews.length < 1 ? <div className="nocomment flex flex-col items-center text-xl text-gray-500 ">
                    <h1>No Reviews till now</h1>
                </div> :
                    reviews.map((review, index) => (
                        <Paper key={index} style={{ backgroundColor: "#eee", padding: "40px 20px", marginTop: 10, width: 500 }}>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item>
                                    <Avatar alt="Remy Sharp" />
                                </Grid>
                                <Grid justifyContent="left" item xs zeroMinWidth>
                                    <Rating name="read-only" value={review.rating} readOnly />
                                    <h4 style={{ margin: 0, textAlign: "left" }} className="text-lg font-bold">{review.review_user}</h4>
                                    <p style={{ textAlign: "left" }}>
                                        {review.response}
                                    </p>
                                    <p style={{ textAlign: "left", color: "gray" }}>
                                        posted 1 minute ago
                                    </p>
                                </Grid>
                            </Grid>
                        </Paper>

                    ))
            }



        </div>
    )
}

export default VisitorReview