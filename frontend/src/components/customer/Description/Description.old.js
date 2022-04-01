import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import UserLayout from '../UserLayout'
import { Grid, Divider, Paper, Typography } from '@mui/material'
import images from '../../../assets/images'
import SimilarProduct from './SimilarProduct'
import { useAuth } from '../../../utils/auth'



const Description = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState([])
    const [imageList, setImageList] = useState([])
    const [specification, setSpecification] = useState([])
    const [Loading, setLoading] = useState(true)
    const auth = useAuth()
    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/${id}/`)
            .then(response => {
                setLoading(false)
                setDetails(response.data)
                setSpecification(response.data.productattributevalues)

            }).catch(error => {
                if (error) {
                    // navigate('/')
                    setLoading(true)
                }
            })


    }, [id, navigate])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/media/?product=${id}`, {
            headers: {
              Authorization: `Bearer ${auth.access}`
            }
          })
            .then(res => {
                setImageList(res.data);
                setLoading(false)
                console.log(res.data)
            })
            .catch(error => {
                if (error) {
                    setLoading(true)
                    // navigate('/')
                }
            })
    }, [id, navigate])


    function showImg() {
        let src;
        imageList.filter(res => {
            src = res.image_url
            return null
        })
        return src

    }


    return (
        <>
            <UserLayout />
            {Loading ? 'loading' :
                <div className='ml-[77px] flex flex-wrap space-x-4 justify-around'>
                    <div className="product-info">
                        <div className="product-info-main-img w-[350px] h-[300px] ">
                            <img className="cursor-pointer w-full h-full border border-gray-300  rounded-lg" src={showImg() === undefined ? images[0] : showImg()} alt="hello" />
                        </div>
                        <div className="main-img-price mt-3 flex justify-between items-center">
                            <div className="img-container flex space-x-2  justify-between">
                                {imageList.map((item, index) => (
                                    <div key={index} className='h-10 w-10 cursor-pointer border border-gray-400 '>
                                        <img className='w-full h-auto rounded-lg' src={item.image_url} alt="hello" />
                                    </div>
                                ))}
                            </div>
                            <div className='price text-2xl'>Rs: {details.price}</div>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <h1>30 views</h1>
                            <h3>{details.condition}</h3>
                        </div>
                    </div>
                    <div className="product-description flex-grow ">
                        <Paper elevation={15} sx={{ padding: "16px" }}>
                            <div className="info" >
                                <Typography variant="h4" gutterBottom>{details.title}</Typography>
                                <Typography variant="h5" gutterBottom>Description</Typography>
                                <Divider sx={{ marginBottom: "10px" }} />
                                <Typography variant="body">{details.description}</Typography>
                            </div>

                            <div className="general mt-5">
                                <Typography variant="h5" sx={{ marginBottom: "10px" }}>General</Typography>
                                <Paper elevation={15} sx={{ background: "#eee", marginBottom: "10px", padding: "10px" }}>
                                    <Typography variant="body" gutterBottom>Delivery:  {details.home_delivery ? 'Available' : 'Not Available'}</Typography>
                                    <Typography varaint="body" gutterBottom>Negotiable: {details.price_negotiable ? 'Negotiable' : "Not Negotiable"}</Typography>
                                </Paper>

                            </div>
                            <div className="specification mt-7 ">
                                <Typography variant="h5" sx={{ marginBottom: "10px" }}>Specification</Typography>
                                <Paper elevation={15} sx={{ background: "#eee", marginBottom: "10px", padding: "10px" }}>
                                    {
                                        specification.map((data, index) => (
                                            <h1 key={index}>{data.product_attribute.attribute_name}: {data.attribute_value}</h1>
                                        ))
                                    }
                                </Paper>
                            </div>
                        </Paper>

                    </div>
                    <div className="similar-product flex-grow-[2]">
                        <Paper>
                            <Typography variant="h5" gutterBottom>Similar Product</Typography>
                            <Divider />
                            {/* <Grid container sc={{mt:2, mb:2}} spacing={3}> */}
                            <div className="flex">
                                    <SimilarProduct/>
                            </div>
                            {/* </Grid> */}
                        </Paper>

                    </div>
                </div>
            }
        </>
    )
}

export default Description