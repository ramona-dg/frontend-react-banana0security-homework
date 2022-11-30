import React, {createContext, useState} from "react";
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({});


function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
    });
    const history = useHistory();

    function logIn() {
        console.log("De gebruiker is ingelogd");
        setAuth(true);
        history.push('/profile');
    }

    function logOut() {
        console.log("De gebruiker is uitgelogd");
        setAuth(false);
        history.push('/');
    }

    const contextData = {
        isAuth: auth,
        logIn: logIn,
        logOut: logOut,
        user: null
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;