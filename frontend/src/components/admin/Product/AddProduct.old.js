import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button, MenuItem, Select, TextField, Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState('')
    const [selectedList, setSelectedList] = useState({})
    const [product, setProduct] = useState({
        title: "", description: '', price: 0, price_negotiable: false, condition: '', used_for: '', owndership_document_provided: '', home_delivery: false, delivery_area: '', warranty_type: '', warranty_period: '', type: null, productattributevalues: []
    })

    const navigate = useNavigate()


    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/product-type/${id}`)
            .then(response => {
                setProductDetails(response.data)
            })
            .catch(error => {
                navigate('../add-product')
            })

    }, [id, navigate])


    const handleAttributeList = (event) => {
        const { name, value } = event.target
        setSelectedList({ ...selectedList, [name]: value })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        let selected = Object.values(selectedList)
        setProduct({ ...product, type:id, productattributevalues: selected })
        
        axios.post('http://127.0.0.1:8000/api/product/', product)
        .then(res=> console.log(res.data))
        .catch(err=> console.log(err))

    }


    return (
        <Grid container direction="column">
            <form onSubmit={handleSubmit}>
                <Grid item>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <TextField type="text" required value={product.title} onChange={e => setProduct({ ...product, title: e.target.value })}
                        />
                    </FormControl>
                </Grid>


                <Grid sx={{ mt: 4 }}>
                    <FormControl >
                        <FormLabel>Description</FormLabel>
                        <textarea rows="7" cols="50" value={product.description} onChange={e => setProduct({ ...product, description: e.target.value })}>
                        </textarea>
                    </FormControl>
                </Grid>


                <Grid item sx={{ mt: 4 }}>
                    <FormControl>
                        <FormLabel>Price</FormLabel>
                        <TextField type="number" required value={product.price} onChange={e => setProduct({ ...product, price: e.target.value })} />
                    </FormControl>

                </Grid>

                <Grid item sx={{ mt: 4 }}>
                    <FormControl style={{ display: "flex" }}>
                        <FormLabel>Price negotiable </FormLabel>
                        <RadioGroup
                            name="price_negotiable"
                            value={product.price_negotiable}
                            onChange={e => setProduct({ ...product, price_negotiable: e.target.value })}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Yes" />
                            <FormControlLabel value={false} control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item sx={{ mt: 4 }}>
                    <FormControl>
                        <FormLabel>Condition</FormLabel>
                        <Select sx={{ width: 300 }}
                            value={product.condition}
                            onChange={e => setProduct({ ...product, condition: e.target.value })}
                        >
                            <MenuItem value="Brand New(not used)">
                                Brand New(not used)
                            </MenuItem>
                            <MenuItem value="LIKE New(used few times)">
                                LIKE New(used few times)
                            </MenuItem>
                            <MenuItem value="Excellent">
                                Excellent
                            </MenuItem>
                            <MenuItem value="Not Working">
                                Not Working
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item sx={{ mt: 4 }}>
                    <FormControl>
                        <FormLabel>Used For</FormLabel>
                        <TextField type="text" value={product.used_for} onChange={e => setProduct({ ...product, used_for: e.target.value })} />
                    </FormControl>
                </Grid>

                <Grid item sx={{ mt: 4 }}>
                    <FormControl>
                        <FormLabel>Ownership document provided</FormLabel>
                        <Select sx={{ width: 300 }}
                            value={product.owndership_document_provided}
                            onChange={e => setProduct({ ...product, owndership_document_provided: e.target.value })}
                        >
                            <MenuItem value="Original Purchase Bill">
                                Original Purchase Bill
                            </MenuItem>
                            <MenuItem value="Stamped waranty card">
                                Stamped waranty card
                            </MenuItem>
                            <MenuItem value="I do not have any document">
                                I do not have any document
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>


                <Grid item sx={{ mt: 4 }} >
                    <FormControl>
                        <FormLabel>Home Delivery </FormLabel>
                        <RadioGroup
                            name="home_delivery" value={product.home_delivery}
                            onChange={e => setProduct({ ...product, home_delivery: e.target.value })}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Yes" />
                            <FormControlLabel value={false} control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item sx={{ mt: 4 }}>
                    <FormControl>
                        <FormLabel>Delivery area</FormLabel>
                        <Select sx={{ width: 300 }}
                            value={product.delivery_area}
                            onChange={e => setProduct({ ...product, delivery_area: e.target.value })}
                        >
                            <MenuItem value="within my area">
                                within my area
                            </MenuItem>
                            <MenuItem value="within my city">
                                within my city
                            </MenuItem>
                            <MenuItem value="almost anywhere in nepal">
                                almost anywhere in nepal
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item sx={{ mt: 4 }}>
                    <FormControl>
                        <FormLabel>Warranty Type</FormLabel>
                        <Select sx={{ width: 300 }}
                            value={product.warranty_type}
                            onChange={e => setProduct({ ...product, warranty_type: e.target.value })}
                        >
                            <MenuItem value="Dealer/Shop">
                                Dealer/Shop
                            </MenuItem>
                            <MenuItem value="Manufacturer/Importer">
                                Manufacturer/Importer
                            </MenuItem>
                            <MenuItem value="No Warranty">
                                No Warranty
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item sx={{ mt: 4 }}>
                    <FormControl>
                        <FormLabel>Warranty Period</FormLabel>
                        <TextField type="text" required value={product.warranty_period} onChange={e => setProduct({ ...product, warranty_period: e.target.value })} />
                    </FormControl>
                </Grid>


                {
                    productDetails ?
                        productDetails.attribute.map((attrib, index) => (
                            <Grid item sx={{ mt: 4 }} key={attrib.attribute_id}>
                                <label>{attrib.attribute_name}</label><br />
                                <Select
                                    sx={{ width: 300 }}
                                    name={attrib.attribute_name}
                                    defaultValue=''
                                    value={selectedList.attribute_name}
                                    onChange={handleAttributeList}
                                >
                                    {
                                        attrib.attribute_val.map((val, i) => (
                                            <MenuItem key={i} value={val.attribute_value_id}>
                                                {val.attribute_value}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </Grid>
                        ))

                        : null
                }

                <Button type="submit" sx={{ mt: 2 }} variant="contained">Add Product</Button>
            </form>

        </Grid>
    )
}

export default AddProduct
