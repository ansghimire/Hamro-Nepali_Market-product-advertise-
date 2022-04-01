// import React from 'react'
import { TextareaAutosize } from '@mui/base'
import { Button, Paper, Grid, Avatar,Stack, Alert } from '@mui/material/'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../../utils/auth'

const Comment = (props) => {
    const [comments, setComments] = useState([]);
    const [postComment, setPostComment] = useState()
    const [message, setMessage] = useState();
    const auth = useAuth();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/${props.productId}/comment/`, {
            headers: {
                Authorization: `Bearer ${auth.access}`
            }
        })
            .then(response => {
                //  console.log(response.data)
                setComments(response.data)

            })
            .catch(error => {
                console.log(error)
            })


    }, [postComment])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (postComment.length < 1) {
            alert("emtpy comment cannot be submitted")
        }

        axios.post(`http://localhost:8000/api/product/${props.productId}/comment/`,{ comment: postComment},
         {
            headers: {
                Authorization: `Bearer ${auth.access}`
            }
        })
            .then(response => {
                 console.log(response.data)
                setPostComment(response.data)
                setMessage("Successfully comment is added")

            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <div>
            {
                 
                message && <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert onClose={() => { setMessage('') }}>{message}</Alert>
                </Stack>
                
            }
            {comments.length < 1 &&
                <div className="nocomment flex flex-col items-center text-xl text-gray-500 ">
                    <h1>No comments till now</h1>
                    <h1>Be the First one to comment</h1>
                </div>
                }
            <div className="comment-box  mt-5">
                <h1 className="mb-2">Your Comment</h1>
                <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col justify-center">
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={3}
                        // value={postComment}
                        onChange={(event) => setPostComment(event.target.value)}
                        placeholder="Comment"
                        style={{ width: 500, resize: "none" }}
                        className="outline-gray-500 border border-solid border-gray-800 rounded-lg p-[5px] mb-3"
                    />
                    <Button type="submit" variant="contained" className="self-start">Post Comment</Button>
                </form>
            </div>

            <div className='comment-section mt-[50px]'>
                {
                    comments.map((comment, index) => (
                        <Paper key={index} style={{ padding: "40px 20px", marginTop: 10, width: 500 }}>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item>
                                    <Avatar alt="Remy Sharp" />
                                </Grid>
                                <Grid justifyContent="left" item xs zeroMinWidth>
                                    <h4 style={{ margin: 0, textAlign: "left" }}>{comment.user}</h4>
                                    <p style={{ textAlign: "left" }}>
                                        {comment.comment}.{" "}
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

        </div>
    )
}

export default Comment