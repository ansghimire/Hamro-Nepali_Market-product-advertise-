import { Paper, Typography, Divider, Grid, Card, CardHeader, CardMedia, Select, IconButton, FormControl, MenuItem, Button, InputLabel, FilledInput, InputAdornment } from '@mui/material'
import React, { useState, useEffect } from 'react'

import UserLayout from '../UserLayout'
import { makeStyles } from '@mui/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FilterListIcon from '@mui/icons-material/FilterList';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios'
import images from '../../../assets/images';


const useSyles = makeStyles({
  makeSticky: {
    height: "10rem",
    width: "10rem",
    position: "sticky",
    top: "4rem",
  }
})

const Category = () => {
  const classes = useSyles();
  const [img, setImg] = useState([])
  const [searchParams] = useSearchParams();
  const category = searchParams.get('cat')
  const type = searchParams.get('type')
  const [listProduct, setListProduct] = useState(null);
  const [condition, setCondition] = React.useState('');
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');

  const [negotiable, setNegotiable] = React.useState(false);


  useEffect(() => {
    axios.post('http://localhost:8000/api/search/', {
      category: category ? category : null,
      type: type ? type : null,
      condition : condition ? condition : null,
      min_price : minPrice ? parseInt(minPrice) : null,
      max_price: (maxPrice && minPrice) ? parseInt(maxPrice) : null,
      negotiable : negotiable,

    }).then(response => {
      console.log(response.data)
      setListProduct(response.data)
    }).catch(error => {
      console.log(error)
    })

  }, [category, type,condition, minPrice,maxPrice,negotiable])

  useEffect(() => {
    axios.get('http://localhost:8000/api/media/')
      .then(response => {
        console.log(response.data)
        setImg(response.data)

      }).catch(error => console.log(error))
  }, [])

  if (!listProduct) return 'Loading............'

  function showImg(pr_id) {
    let src;
    img.filter(res => {
      if (res.product === pr_id) {
        src = res.image_url
      }
      return null
    })
    return src

  }

  const handleChange = (event) => {
    setCondition(event.target.value);
  };



  return (
    <div>
      <UserLayout />
      <div className='container w-[90vw] flex flex-wrap justify-around md:ml-[30px] lg:ml-[80px]'>
        {/* 1st flex */}
        <div className='lg:w-[50rem] md:w-[30rem] w-[25rem]'>
          <Paper elevation={2} sx={{ padding: "16px" }}>
            <Typography variant="h6" sx={{
              color: 'black',
              marginBottom: '8px',
              borderRight: '2px solid black'
            }} >
              Category: {category}
            </Typography>
            <Divider sx={{ backgroundColor: 'black', border: '2px solid black' }} />

            <Grid container sx={{ mt: 2, mb: 2 }} spacing={3} direction="row">
              {
                listProduct.length < 1 ? <Grid item xs={12} md={6} lg={4}>
                  No Data Found
                </Grid> :
                  listProduct.map((item, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                      <Card elevation={1} sx={{ maxWidth: 345, marginLeft: "9px", marginBottom: "10px" }}>
                        <Link to={`/${item.product_id}`}>
                          <CardMedia
                            component="img"
                            className={classes.img}
                            image={showImg(item.product_id) === undefined ? images[0] : showImg(item.product_id)}
                            alt="pic" />
                          <Divider />
                          <CardHeader
                            action={
                              <>
                                <IconButton>
                                  <MoreVertIcon />
                                </IconButton>
                              </>
                            }
                            title={item.title}
                            subheader={item.condition}
                          />
                          <div className='flex justify-between items-between'>
                            <Typography sx={{ ml: 2 }} variant="h6">Rs {item.price}</Typography>
                            {
                              // auth.access && <IconButton onClick={() => funcSave(item.product_id)}>
                              //     <BookmarkBorderIcon />
                              // </IconButton>
                            }

                          </div>

                        </Link>
                      </Card>

                    </Grid>


                  ))
              }

            </Grid>


          </Paper>

        </div>

        {/* 2nd flex */}
        <div className="footer w-[20rem] lg:w-[25rem]">
          <Paper elevation={15} sx={{ height: "88vh", padding: "1rem 1rem", width: "auto" }} className={classes.makeSticky}>
            <Typography variant="h5" sx={{ cursor: "pointer" }}> Add filter
              <FilterListIcon sx={{ marginLeft: "3px" }} />
            </Typography>
            <Divider />
            <div className='filter'>
              {/* <form onSubmit={handleSubmit}> */}
              <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="demo-simple-select-filled-label">Condition</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={condition}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='Brand New(not used)'>Brand New(not used)</MenuItem>
                  <MenuItem value='LIKE New(used few times)'>LIKE New(used few times)</MenuItem>
                  <MenuItem value='Excellent'>Excellent</MenuItem>
                  <MenuItem value='Not Working'>Not Working</MenuItem>
                </Select>
              </FormControl>

              <Typography>Price Range</Typography>
              <FormControl sx={{ m: 1, minWidth: 300 }} variant="filled">
                <InputLabel htmlFor="filled-adornment-amount">Min Price</InputLabel>
                <FilledInput
                  id="filled-adornment-amount"
                  value={minPrice}
                  onChange={(e)=> {setMinPrice(e.target.value)}}
                  startAdornment={<InputAdornment position="start">RS</InputAdornment>}
                />

              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 300 }} variant="filled">
                <InputLabel htmlFor="filled-adornment-max-amount">Max Price</InputLabel>
                <FilledInput
                  id="filled-adornment-max-amount"
                  value={maxPrice}
                  onChange={(e)=> {setMaxPrice(e.target.value)}}
                  startAdornment={<InputAdornment position="start">RS</InputAdornment>}
                />
              </FormControl>

              <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="price-select-filled-label">Price Negotiable</InputLabel>
                <Select
                  labelId="price-simple-select-filled-label"
                  id="price-simple-select-filled"
                  value={negotiable}
                  onChange={(e)=> {setNegotiable(e.target.value)}}
                >
                 
                  <MenuItem value={true}>Yes</MenuItem> 
                  <MenuItem value={false}>No</MenuItem>
                  
                </Select>
              </FormControl>

              
              {/* </form> */}


            </div>

            <Typography sx={{ fontSize: "13px", marginTop:"30px" }}>copyright@2022, Hamro Nepali Market</Typography>
          </Paper>
        </div>


      </div>
    </div>
  )
}

export default Category