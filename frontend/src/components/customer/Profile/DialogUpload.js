import React, { useState } from 'react';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Stack, Alert } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../../utils/auth';

export default function FormDialog() {
    const [open, setOpen] = useState(false);
    const [photo, setPhoto] = useState('');
    const [successMssg, setSuccessMssg] = useState(null);
    const [error, setError] = useState(null);
    const auth = useAuth();


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpload = (e) => {
        e.preventDefault();

        if (photo) {

            let form_data = new FormData()
            form_data.append('photo', photo, photo.name)

            axios.put('http://localhost:8000/api/profile/me/', form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${auth.access}`

                }
            }).then(res => {
                if (res) {
                    setSuccessMssg('Successfully uploaded');
                }
            })
                .catch(err => {
                   
                    setError(err.response.data.photo)
                })


        } else {
            alert("please select image")
            return
        }
    }

    return (
        <div>


            <Button variant="outlined" onClick={handleClickOpen}>
                Upload photo
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleUpload}>
                    {
                        successMssg && <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert onClose={() => { setSuccessMssg('') }} onClick={handleClose}>{successMssg}</Alert>
                        </Stack>
                    }
                    {
                        error && <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error" onClose={() => { setError('') }} onClick={handleClose}>{error}</Alert>
                        </Stack>
                    }
                    <DialogTitle>Upload Photo</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Upload Your Profile</DialogContentText>

                        <TextField
                            autoFocus
                            type="file"
                            margin="dense"
                            id="name"
                            fullWidth

                            onChange={e => setPhoto(e.target.files[0])}
                            accept="image/png, image/jpeg"
                            required
                            variant="standard"
                        />


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Upload</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
