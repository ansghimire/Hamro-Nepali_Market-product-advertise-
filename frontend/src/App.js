// import { Header, Footer, Category, ProductType, Product } from './components';
import { Layout } from './components/'
import { Routes, Route } from "react-router-dom"
import Login from './components/common/Login/Login';
import './App.css';
import React from 'react';

import { AuthProvider } from './utils/auth'
import RequireAuth from './components/common/RequireAuth/RequireAuth'
import RequireAuthForCustomer from './components/common/RequireAuth/RequireAuthForCustomer';
import ResetPassword from './components/common/Login/ResetPassword';
import ResetPasswordConfirm from './components/common/Login/ResetPasswordConfirm';
// import UserLayout from './components/customer/UserLayout';
import HomePage from './components/customer/HomePage';
import Description from './components/customer/Description/Description';
import Registration from './components/customer/Registration';
import Activation from './components/customer/Activation';
import ListProductType from './components/customer/Product/ListProductType'
import Head from './components/customer/Product/Head';
import ForAll from './components/common/RequireAuth/ForAll';
import ImageProductUpload from './components/customer/Product/ImageProductUpload';
import Profile from './components/customer/Profile/Root'
import Visitor from './components/customer/Profile/Visitor'
import Category from './components/customer/ShowCategory/Category';


function App() {

  return (
    <AuthProvider>
      <ForAll>
        <Routes>
          <Route path="/admin/*" element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
          />

          <Route path="/register/" element={<Registration />} />
          <Route path="/activate/:mid/:muid" element={< Activation />} />

          <Route path="/login/" element={<Login />} />
          <Route path="/password/reset/" element={<ResetPassword />} />
          <Route path="/password/reset/confirm/:mid/:muid" element={<ResetPasswordConfirm />} />
          {/* <Route path="/*" element={<UserLayout/>}/> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<Description />} />

          <Route path="/add-product" element={
            <RequireAuthForCustomer>
              <ListProductType />
            </RequireAuthForCustomer>

          } />

          <Route path="/add-product/:id" element={
           <RequireAuthForCustomer>
               <Head />
           </RequireAuthForCustomer> 
          } />

          <Route path="/add-product-img/:id" element={
            <ImageProductUpload/>
          }/>

          <Route path="/profile/" element = {
             <RequireAuthForCustomer>
               <Profile/>
             </RequireAuthForCustomer>
          }/>

          <Route path="/user/:id" element={
            <RequireAuthForCustomer>
              <Visitor/>
            </RequireAuthForCustomer>
          }/>

          <Route path="/category"  element={
            <RequireAuthForCustomer>
              <Category/>
            </RequireAuthForCustomer>

          }/>

        


        </Routes>
      </ForAll>
    </AuthProvider>
  );
}

export default App;
