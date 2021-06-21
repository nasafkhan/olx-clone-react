import { createContext, useState } from 'react'



export const FirebaseContext = createContext(null)
export const AuthContext = createContext(null)


//Creating context component for checking user signed in or not
export default function Context({children}) {
    const [user,setUser] = useState('')

    return(
        <AuthContext.Provider value={{user, setUser}} >
            {children}
        </AuthContext.Provider >
    )

}