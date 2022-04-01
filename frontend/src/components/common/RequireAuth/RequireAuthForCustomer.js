import { useEffect } from "react"
import { useAuth } from "../../../utils/auth"


// this is for protected routes
function RequireAuthForCustomer({ children }) {
  const auth = useAuth();

  
 

  useEffect(() => {
    auth.protectedRouteForUser()
 
    
  }, [])


  useEffect(() => {
    const interval = setInterval(() => {
      auth.protectedRouteForUser()
    }, 30000)

    return () => clearInterval(interval)

  }, [])




  return children
}

export default RequireAuthForCustomer