import React, { useState, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';



const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

function ProductImgUpload() {
    const [files, setFiles] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate()
    // console.log(id)

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        // maxFiles: 3,
        multiple: false,
        accept: 'image/*',
        onDrop: acceptedFiles => setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))

    });

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/product/${id}`)
            .then(response => {
               console.log(response.data)
            })
            .catch(error => {
                console.log(error)
                navigate('../add-product')
            })

    }, [id, navigate])

    
    const [error, setError] = useState('')

    useEffect(() => {
        if (files.length > 0) {
            let form_data = new FormData()
            form_data.append('image_url', files[0], files[0].name)
            form_data.append('product', id)
            axios.post('http://localhost:8000/api/media/', form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => console.log(res.data))
                .catch(err => {
                    if(err.response){
                        console.log(err.response.data.detail)
                        setError(err.response.data.detail)
                    }
                })
        };

    }, [files, id]);


const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
        <div style={thumbInner}>
            <img
                src={file.preview}
                style={img}
                alt={img}
            />
        </div>
    </div>
));

useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
}, [files]);


const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
}), [
    isFocused,
    isDragAccept,
    isDragReject
]);

useEffect(()=> {
    if(error){
        navigate('../add-product')
    }

},[error, navigate])



return <div className="container">
    {error ? error
    :null
    }
    <Typography>Now upload the image for the product ads</Typography>
    <Typography>You can upload up to 3 image for the product</Typography>

    <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag Your list of png,jpg or jpeg of products</p>
    </div>
    <aside style={thumbsContainer}>
        {thumbs}
    </aside>
</div>
}

export default ProductImgUpload;
