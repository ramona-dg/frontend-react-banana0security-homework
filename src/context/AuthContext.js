import React, {createContext, useState} from "react";
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({});


function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
    });
    const history = useHistory();

    //jwt komt uit SignIn onder result.data.accessToken
    function login(jwt) {
        console.log("De gebruiker is ingelogd");
        // token wordt opgeslagen in localStorage>app in webbrowser
        localStorage.setItem('token', jwt);
        setAuth(true);
        history.push('/profile');
    }

    function logout() {
        console.log("De gebruiker is uitgelogd");
        setAuth(false);
        history.push('/');
    }

    const contextData = {
        isAuth: auth,
        login: login,
        logout: logout,
        user: null
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;