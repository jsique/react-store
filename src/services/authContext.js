/**
 * authContext component is created to handle the user session
 */
import { createContext, useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged,signOut } from "firebase/auth";
import {auth} from "../services/firebase";

export const authContext = createContext();

/**
 * I export use auth to get what would be the user data in session, this at the same time is a kind of custom hook
 * @returns user context 
 */
export const useAuth = () => {
    const context = useContext(authContext)
    if(!context) throw new Error("There is not auth provider")
    return context
}


/**
 * I export the authProvider so that the rest of the components know when the user is in session
 * @param children 
 * @returns component authProvider
 */
export function AuthProvider({children}){
    //session state
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    //let [gListShop, setgListShop] = useState([]);

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => signOut(auth);

    useEffect(() => {
        const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
            //console.log({ currentUser });
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubuscribe();
    }, []);

    //const fnListShopCar = (gListShop) =>{        return setgListShop(gListShop);    }

    return (
        <authContext.Provider value={{login, loading, user, logout}}>
            {children}
        </authContext.Provider>
    )   
}