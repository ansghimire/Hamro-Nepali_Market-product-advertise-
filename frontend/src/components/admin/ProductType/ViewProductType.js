import React, { useState, useEffect } from 'react'
import { TextField, Stack, Grid, Card, CardContent, Typography, Chip, Divider, CardHeader, IconButton } from '@mui/material'
import { DeleteOutlined } from '@mui/icons-material'
import UpdateIcon from '@mui/icons-material/Update';

import { Link } from 'react-router-dom'
import { useGetProductTypeQuery, useDeleteProductTypeMutation } from '../../../services/productTypeApi'
import { useAuth } from '../../../utils/auth';



const ViewProductType = () => {
    const auth = useAuth();
    const { data, isFetching } = useGetProductTypeQuery(auth.access);
    const [deleteProductType, delResponse] = useDeleteProductTypeMutation()
    const [searchData, setSearchData] = useState([])

    useEffect(() => {
        if(data){
            setSearchData(data)
        }
    }, [data])


    if (isFetching || delResponse.isFetching) return 'Loading ..........'
    console.log(data);


    const handleSearch = (query) => {
       const filteredType = data.filter(type=> {
           return type.type_name.includes(query) || type.category.category_name.includes(query)
       })
       setSearchData(filteredType)
    }

    return (
        <div>
            <Grid container direction="row"
                justifyContent="center"
                alignItems="center">
                <Grid item>
                    <Stack spacing={2} sx={{ width: 300 }}>
                        <TextField
                            placeholder="Search......"
                            onChange={e => handleSearch(e.target.value)}
                        />

                    </Stack>
                </Grid>
            </Grid>

            <Grid container direction="row" sx={{ mt: 8 }} spacing={2}>

                {
                    searchData.length > 0 ? searchData.map((result, index) => (
                        <Grid item key={index} xs={12} md={6} lg={4}>
                            <Card elevation={1}>
                                <CardHeader
                                    action={
                                        <>
                                            <IconButton>
                                                <Link to={`../edit-product-type/${result.type_id}`}>
                                                    <UpdateIcon />
                                                </Link>
                                            </IconButton>
                                            <IconButton onClick={() => deleteProductType({id:result.type_id, access:auth.access})}>
                                                <DeleteOutlined />
                                            </IconButton>
                                        </>
                                    }
                                    title={result.type_name}
                                    subheader={result.category.category_name}
                                />
                                <Divider />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        Attributes
                                    </Typography>

                                    <div>
                                        {
                                            result.attribute.map((attrib, ind) => (
                                                <Chip key={ind} label={attrib.attribute_name} />
                                            ))
                                        }
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>

                    )):<p>No item found</p>
                        
                      
                }
            </Grid>

        </div>
    )
}


export default ViewProductType

