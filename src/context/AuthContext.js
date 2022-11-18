import React, {createContext, useState} from "react";
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({});


function AuthContextProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const history = useHistory();

    function logIn(){
        console.log("De gebruiker is ingelogd");
       setIsAuth(true);
       history.push('/profile');
    }
    function logOut(){
        console.log("De gebruiker is uitgelogd");
        setIsAuth(false);
        history.push('/');
    }

    const contextData = {
        isAuth: isAuth,
        logIn: logIn,
        logOut: logOut
    }

    return(
        <AuthContext.Provider value={contextData}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;