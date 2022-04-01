import React from 'react'
import { useGetAttributeQuery,useDeleteAttributeMutation } from '../../../services/AttribApi'
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import {Link} from 'react-router-dom'
import { useAuth } from '../../../utils/auth';



const ViewAttribute = () => {
  const auth = useAuth()
  const { data, isFetching } = useGetAttributeQuery(auth.access);
  const [deleteAttribute] = useDeleteAttributeMutation();
  // const auth = useAuth()

  if (isFetching) return 'Loading.....';


  return (
    <>
      <List>
        {
          data.map((attrib, id) => (
            <ListItem key={id}>             
              <ListItemButton  sx={{p:0}}>
                <ListItemText id={attrib.attribute_name} primary={attrib.attribute_name} />
              </ListItemButton>
              <Link to={`edit-attribute\\${attrib.attribute_id}`}>
                <ModeEditIcon sx={{mr:"10px"}}/>
                </Link>
              <DeleteIcon onClick={()=> deleteAttribute({id:attrib.attribute_id, access: auth.access})} style={{cursor:"pointer"}}/>
            </ListItem>

          ))
        }

      </List>
    </>
  )
}

export default ViewAttribute
