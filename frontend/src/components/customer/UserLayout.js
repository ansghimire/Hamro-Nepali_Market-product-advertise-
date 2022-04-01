import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Navbar from './Navbar';
import ListItemButton from '@mui/material/ListItemButton';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';
// import HomePage from './HomePage';

import axios from 'axios';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse } from '@mui/material';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [category, setCategory] = React.useState(null)

  React.useEffect(() => {
    axios.get('http://localhost:8000/api/category-list/')
      .then(response => {
        // console.log(response.data);
        setCategory(response.data)
      }).catch(error => {
        console.log(error)
      })

  }, [])

  if (category === null) return 'Loading..........'


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleClick = () => {
    setOpens(!opens);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

          {
            category.map((text, index) => (
              <div key={index}>
                <Link to={`/category?cat=${text.category_name}`}>
                <ListItem button onClick={handleClick}>
             
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                 
                  <ListItemText primary={text.category_name} />
                  
                  {opens ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                </Link>




                <Collapse in={opens} timeout="auto" unmountOnExit >
                  {text.product_type?.map((type, index) => (
                    <List component="div" disablePadding key={index}>
                      <Link to={`/category?type=${type.type_name}`} style={{ textDecoration: "none", color: "black" }} >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary={type.type_name} />
                      </ListItemButton>
                      </Link>
                    </List>
                  ))
                  }
                </Collapse>


              </div>


            ))
          }
        </List>


        <Divider />

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "hidden" }}>
        <DrawerHeader />
        {/* others */}
        {/* <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes> */}

      </Box>
    </Box>
  );
}
