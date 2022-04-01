import { useEffect } from "react"
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../utils/auth"


// this is for protected routes
function RequireAuth({ children }) {
  const auth = useAuth();
  

  useEffect(() => {
    auth.protectedRoute()
  }, [])


  useEffect(() => {
    const interval = setInterval(() => {
      auth.protectedRoute()
    }, 30000)

    return () => clearInterval(interval)

  }, [])




  return children
}

export default RequireAuth