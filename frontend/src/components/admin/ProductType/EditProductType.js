import React, { useState, useEffect } from 'react'
import { Typography, Grid, TextField, Select, FormControl, InputLabel, OutlinedInput, Button, MenuItem } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';

import { useGetDetailsProductTypeQuery, useUpdateProductTypeMutation } from '../../../services/productTypeApi'
import { useGetCategoryQuery } from '../../../services/categoryApi'
import { useGetAttributeQuery } from '../../../services/AttribApi';

import { useAuth } from '../../../utils/auth';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, attributeList, theme) {
    return {
        fontWeight:
            attributeList.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const EditProductType = () => {
    const auth = useAuth()
    const { id } = useParams()
    let navigate = useNavigate();
    const theme = useTheme();
    const [typeName, setTypeName] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [attributeLists, setAttributeLists] = useState([])
    const [error, setError] = useState('')

    const { data: typeDetails, isFetching } = useGetDetailsProductTypeQuery(id)
    const { data: category, isFetching: fetchCategory } = useGetCategoryQuery(auth.access);
    const {data: allAttrib, isFetching: FetchAttrib} = useGetAttributeQuery(auth.access);
    const [updateProductType] = useUpdateProductTypeMutation()
    

    useEffect(() => {
        if (typeDetails) {
            setTypeName(typeDetails.type_name)
            setCategoryId(typeDetails.category.category_id)
            setCategoryName(typeDetails.category.category_name)
            setAttributeLists(typeDetails.attribute.map(list => list.attribute_id))
        }

    }, [typeDetails])



    if (isFetching || fetchCategory || FetchAttrib) return 'Loading ..........'
 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!typeName) {
            setError('Required')
        } else if (typeName.length <= 3) {
            setError("Must be greater than 3")
        } else if (typeName.length > 25) {
            setError("Must be less than 25")
        } else {
            let data = {
                type_id : id,
                type_name: typeName,
                category: categoryId,
                attribute: attributeLists,
                access : auth.access

            }
            updateProductType(data)
            setTypeName('')
            setCategoryId('')
            setAttributeLists([])
            navigate('../view-product-type')

        }

    }

    return (
        <>
            <Typography variant='h3' color='#616161' gutterBottom >Edit Product Type</Typography>
            <form onSubmit={handleSubmit}>
        
                <Grid container spacing={2} direction="column" >
                    <Grid item>
                        <Typography variant='body1' >Type Name</Typography>
                    </Grid>
                    <Grid item>
                        <TextField variant="outlined" sx={{ width: 350 }} value={typeName}
                            onChange={e => setTypeName(e.target.value)}
                        />
                        {error && <Typography color="error.main">{error}
                        </Typography>
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={1} direction="column" sx={{ mt: 1 }}>
                    <Grid item>
                        <Typography variant='body1'>Category:</Typography>
                    </Grid>
                    <Grid item>
                        <FormControl sx={{ width: 350 }}>
                            <Select
                                labelId='category'
                                id="category_id"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                required
                            >
                                <MenuItem value={categoryId}>{categoryName}</MenuItem>
                                {
                                    category.map((item, i) => (
                                        item.category_name === categoryName ? null :
                                            <MenuItem key={i} value={item.category_id}>
                                                {item.category_name}
                                            </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={1} direction="column" sx={{ mt: 1 }}>
                    <Grid item>
                        <Typography variant='body1'>Add Attributes:</Typography>
                    </Grid>
                    <Grid item>
                        <FormControl sx={{ width: 350 }}>
                            <InputLabel id="demo-multiple-name-label">Attributes</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={attributeLists}
                                onChange={(e) => setAttributeLists(e.target.value)}
                                input={<OutlinedInput label="Name" />}
                                MenuProps={MenuProps}
                                required>


                                {allAttrib.map((name) => (
                                    <MenuItem
                                        key={name.attribute_id}
                                        value={name.attribute_id}
                                        style={getStyles(name, attributeLists, theme)}
                                    >

                                        {name.attribute_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>

                <Grid container spacing={1} direction="column" sx={{ mt: 4, ml: 1, width: 200 }}>
                    <Button type="submit" variant="contained">Edit</Button>
                </Grid>

            </form>
        </>
    )
}

export default EditProductType
