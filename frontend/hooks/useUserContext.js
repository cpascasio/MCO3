import { UserContext } from "/public/usercontext"
import { useContext } from "react"

export const useUserContext = () => {
  const context = useContext(UserContext)

  if(!context) {
    throw Error('Context must be inside provider')
  }

  return context
}
