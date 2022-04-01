import { createContext, useState, useContext } from "react";
import axios from 'axios'
import {useNavigate } from "react-router-dom";
import jwt from 'jwt-decode'


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [access, setAccess] = useState(null)
    const [admin, setAdmin] = useState(null)
    const navigate = useNavigate()
  

    const login = (access, admin) => {
        setAccess(access)
        setAdmin(admin)
        // console.log('perfectly working')
    }



    const protectedRoute = () => {
        axios.post('http://localhost:8000/auth/jwt/refresh/',
            axios.defaults.withCredentials = true)
            .then(response => {

                let token = response.data.access;
                const { is_admin } = jwt(token);
                setAccess(token);
                setAdmin(is_admin);

                if (is_admin !== true) {
                    navigate('/', { replace: true })
                }
              

            }).catch(error => {
                console.log(error)
                if (error.response.status === 401) {
                    setAccess(null)
                    setAdmin(null)
                    if (error.response.status === 401) {
                        // console.log('hello')
                        console.log(error.response.status)
                        navigate('/login')
                    }
                }
            })

    }

    const protectedRouteForUser = () => {
        axios.post('http://localhost:8000/auth/jwt/refresh/',
            axios.defaults.withCredentials = true)
            .then(response => {

                let token = response.data.access;
                const { is_admin } = jwt(token);
                setAccess(token);
                setAdmin(is_admin);

                // if (admi) {
                //     navigate('/', { replace: true })
                // }
              

            }).catch(error => {
                console.log(error)
                if (error.response.status === 401) {
                    setAccess(null)
                    setAdmin(null)
                    if (error.response.status === 401) {
                        // console.log('hello')
                        console.log(error.response.status)
                        navigate('/login')
                    }
                }
            })

    }


    const everyRoute = () => {
        axios.post('http://localhost:8000/auth/jwt/refresh/',
            axios.defaults.withCredentials = true)
            .then(response => {

                let token = response.data.access;
                const { is_admin } = jwt(token);
                setAccess(token);
                setAdmin(is_admin);


            }).catch(error => {
                console.log(error)
                
            })

    }




    return (<AuthContext.Provider value={{
        access, admin, login, protectedRoute, protectedRouteForUser, everyRoute

    }}>
        {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}