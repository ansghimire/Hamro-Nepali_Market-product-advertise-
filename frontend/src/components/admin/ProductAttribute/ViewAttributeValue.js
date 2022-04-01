import React from 'react'
import { useGetAttributeValueQuery, useDeleteAttributeValueMutation  } from '../../../services/AttribApi'
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {Link} from 'react-router-dom'
import { useAuth } from '../../../utils/auth';

const ViewAttributeValue = () => {
    const auth = useAuth()
    const { data, isFetching } = useGetAttributeValueQuery(auth.access)
    const [deleteAttribVal] = useDeleteAttributeValueMutation();


    if (isFetching) return 'Loading..............'
    if(data.length === 0) return "No Data to show"

    return (
        <>

            <List>
                {
                    data.map((attrib, id) => (
                        <ListItem key={id}>
                            <ListItemButton sx={{p:0}}>
                                <ListItemText id={id} primary={attrib.attribute_value} />
                            </ListItemButton>
                            <Link to={`edit-attribute-value\\${attrib.attribute_value_id}`}>
                            <ModeEditIcon  sx={{mr:"10px"}}  style={{cursor:"pointer"}}/>
                            </Link>
                            
                            <DeleteIcon style={{cursor:"pointer"}} onClick={()=> deleteAttribVal({id:attrib.attribute_value_id, access:auth.access})}/>
                        </ListItem>

                    ))
                }

            </List>
        </>
    )
}

export default ViewAttributeValue
