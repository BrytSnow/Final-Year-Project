import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    onAuthStateChanged
} from "firebase/auth";

import {
    auth
} from "../firebase/firebase";


const AuthContext=createContext();


export function AuthProvider({children}){

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);


    useEffect(()=>{

        const unsubscribe=onAuthStateChanged(
            auth,
            async(currentUser)=>{

                if(currentUser){

                    await currentUser.reload();

                    setUser(
                        auth.currentUser
                    );

                }else{
                    setUser(null);
                }
                setLoading(false);

            }
        );


        return unsubscribe;

    },[]);



    const refreshUser=async()=>{

        if(auth.currentUser){

            await auth.currentUser.reload();

            setUser(
                auth.currentUser
            );

        }

    };


    return(

        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                refreshUser
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}



export function useAuth(){

    return useContext(AuthContext);

}