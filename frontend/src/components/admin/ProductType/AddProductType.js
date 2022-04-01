import React, { useState } from 'react'
import { useGetCategoryQuery } from '../../../services/categoryApi'
import { useGetAttributeQuery } from '../../../services/AttribApi';
import { Typography, TextField, Grid, FormControl, Select, MenuItem, InputLabel, OutlinedInput, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { useCreateProductTypeMutation } from '../../../services/productTypeApi';
import {useAuth} from '../../../utils/auth'



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




const AddProductType = () => {
    const auth = useAuth()
    const { data, isFetching } = useGetCategoryQuery(auth.access);
    const responseInfo = useGetAttributeQuery(auth.access);
    const [categoryId, setCategoryId] = useState('');
    const [typeName, setTypeName] = useState('')
    const theme = useTheme();
    const [createProductType, createRes] = useCreateProductTypeMutation()
    const [attributeList, setAttributeList] = React.useState([]);
    const [error, setError] = React.useState();

    const handleChange = (event) => {
        setAttributeList(event.target.value)
    };

    if (isFetching || responseInfo.isFetching) return "Loading ............"
    console.log(attributeList)


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
                type_name: typeName,
                category: categoryId,
                attribute: attributeList,
                access: auth.access

            }
            createProductType(data)
            setTypeName('')
            setCategoryId('')
            setAttributeList([])

        }

    }

    

    return (
        <>
            {createRes.isSuccess && <div>succesfully added</div>}
            <Typography variant='h3' color='#616161' gutterBottom >Add Product Type</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} direction="column" >
                    <Grid item>
                        <Typography variant='body1' >Type Name</Typography>
                    </Grid>
                    <Grid item>
                        <TextField variant="outlined" sx={{ width: 350 }} value={typeName} onChange={e => setTypeName(e.target.value)}></TextField>
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
                                {
                                    data.map((item, i) => (
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
                                value={attributeList}
                                onChange={handleChange}
                                input={<OutlinedInput label="Name" />}
                                MenuProps={MenuProps}
                                required

                            >
                                {responseInfo.data.map((name) => (
                                    <MenuItem
                                        key={name.attribute_id}
                                        value={name.attribute_id}
                                        style={getStyles(name, attributeList, theme)}
                                    >

                                        {name.attribute_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>

                <Grid container spacing={1} direction="column" sx={{ mt: 4, ml: 1, width: 200 }}>
                    <Button type="submit" variant="contained">Add</Button>
                </Grid>



            </form>
        </>
    )
}

export default AddProductType







