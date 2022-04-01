import * as React from 'react';
import { Routes, Route, Link } from "react-router-dom"
import Product from './Product/Product'
import AddProduct from './Product/AddProduct';
import AttributeTask from './ProductAttribute/AttributeTask'
import Category from './Category/Category'

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
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import AddIcon from '@mui/icons-material/Add';
import PreviewIcon from '@mui/icons-material/Preview';

import EditAttribute from './ProductAttribute/EditAttribute';
import EditAttributeValue from './ProductAttribute/EditAttributeValue';
import ProductType from './ProductType/ProductType';
import ViewProductType from './ProductType/ViewProductType'
import EditProductType from './ProductType/EditProductType';

import ProductImgUpload from './Product/ProductImgUpload';
import ViewProduct from './Product/ViewProduct';

// import RequireAuth from '../common/RequireAuth/RequireAuth'
import { useAuth } from '../../utils/auth';


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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
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

export default function Layout() {
  const auth = useAuth()



  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [openProduct, setOpenProduct] = React.useState(false);

  if(!auth.access){
    return 'Loading .........'
  }

  const handleClick = () => {
    setOpens(!opens);
  };

  const handleProductClick = () => {
    setOpenProduct(!openProduct)
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Hamro Nepali Market- Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

          <Link to="category" style={{ textDecoration: "none", color: "gray" }} >
            <ListItem button>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Category" />
            </ListItem>
          </Link>

          <Link to="attribute" color="secondary" style={{ textDecoration: "none", color: "black" }} >
            <ListItem button>
              <ListItemIcon>
                <Inventory2OutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Attribute/Values" />
            </ListItem>
          </Link>

          {/* <Link to="product-type" style={{ textDecoration: "none", color: "black" }} > */}
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <ProductionQuantityLimitsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Product Type" />
            {opens ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          {/* adding product type */}
          <Collapse in={opens} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="add-product-type" style={{ textDecoration: "none", color: "black" }} >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
          {/* view product type */}
          <Collapse in={opens} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="view-product-type" style={{ textDecoration: "none", color: "black" }} >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PreviewIcon />
                  </ListItemIcon>
                  <ListItemText primary="View" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
          {/* </Link> */}

          <ListItem button onClick={handleProductClick}>
            <ListItemIcon>
              <Inventory2OutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Product" />
            {openProduct ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          {/* add product */}
          <Collapse in={openProduct} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="add-product" style={{ textDecoration: "none", color: "black" }} >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Product" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>

          {/* view product */}
          <Collapse in={openProduct} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="view-product" style={{ textDecoration: "none", color: "black" }} >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PreviewIcon />
                  </ListItemIcon>
                  <ListItemText primary="View Product" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>

        </List>


      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/add-product" element={<Product />} />
          <Route path="/add-product-img/:id" element={<ProductImgUpload />} />
          <Route path="/add-product/:id" element={<AddProduct />} />
          <Route path="/view-product/" element={<ViewProduct />} />
          <Route path="/category" element={<Category />} />

          <Route path="/attribute" element={
            // <RequireAuth>
              <AttributeTask />
            // </RequireAuth>
          }/>
    
          <Route path="/attribute/edit-attribute/:id" element={<EditAttribute />} />
          <Route path="/attribute/edit-attribute-value/:id" element={<EditAttributeValue />} />
          <Route path="/add-product-type" element={<ProductType />} />
          <Route path="/view-product-type" element={<ViewProductType />} />
          <Route path="/edit-product-type/:id" element={<EditProductType />} />
        </Routes>
      </Box>
    </Box>
  );
}
