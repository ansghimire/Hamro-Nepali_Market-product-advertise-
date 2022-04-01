import React from 'react'
import {Dialog, DialogActions,
    DialogTitle, DialogContentText, DialogContent, FormControl, InputLabel, Select, Menu, MenuItem, Button} from '@mui/material'
import axios from 'axios'

import { useAuth } from '../../../utils/auth'

const DeductDialog = ({openDeduct, handleSoldClose, quantity,pr_id}) => {
 
    const [qty, setQty] = React.useState(quantity);
    const auth = useAuth();
    

    const handleChange = (event) => {
        setQty(event.target.value);
    };

    const qtyArray = [];
    for(let i=1; i<=quantity; i++){
        qtyArray.push(i)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        let reduceqty = quantity - qty

        let data = {quantity : reduceqty}

        axios.patch(`http://localhost:8000/api/product/${pr_id}/`, data, {
            headers: {
                Authorization: `Bearer ${auth.access}`
              }
        }).then(res=> {
            console.log(res);
        }).catch(error=> {
            console.log(error);
        })
        handleSoldClose()
    }
    
    return (
        <div>
            {/* dialog open */}
            <Dialog open={openDeduct} onClose={handleSoldClose}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Deduct Sold Quantity</DialogTitle>
                <DialogContentText>Total Quantity Available - {quantity}</DialogContentText>
                <DialogContent>
                  
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Deduct Quantity</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={qty}
                            label="Quantity"
                            onChange={handleChange}
                        >
                         

                            {
                                qtyArray.map((item,index)=> (
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                ))
                               
                            }


                        </Select>
                    </FormControl>
                  
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSoldClose}>Cancel</Button>
                    <Button type="submit">Deduct</Button>
                </DialogActions>
                </form>
            </Dialog>

            {/* dialog close */}
        </div>
    )
}

export default DeductDialog