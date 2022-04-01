import { useEffect } from "react"
import { useAuth } from "../../../utils/auth"


function ForAll({ children }) {
  const auth = useAuth();
  

  useEffect(() => {
    auth.everyRoute()
  }, [])


  useEffect(() => {
    const interval = setInterval(() => {
      auth.everyRoute()
    }, 30000)

    return () => clearInterval(interval)

  }, [])




  return children
}

export default ForAll