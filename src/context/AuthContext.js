import React, {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";


export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const history = useHistory();

    // MOUNTING EFFECT, om gebruiker " ingelogd te laten" na refreh
    useEffect(() => {
        const token = localStorage.getItem('token'); // token uit localStorage halen
        if (token) { // als token aanwezig is doe het volgende:
            const decoded = jwtDecode(token);
            getData(decoded.sub, token);  //getData functie aanroepen om id (onder decoded.sub) en token mee te geven voor authorization
        } else { // anders zet de state op de volgende waardes
            setAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);


    function login(jwt) {
        console.log("De gebruiker is ingelogd"); // console laten weten ingelogd.
        localStorage.setItem('token', jwt);     // token wordt opgeslagen in localStorage>app in webbrowser
        const decode = jwtDecode(jwt) // de jwt (token uit komt uit SignIn onder result.data.accessToken)
        getData(decode.sub, jwt, '/profile');   //vul je de gegevens voor de getData functie beneden in de pagina
    }


    function logout() {
        localStorage.clear();
        setAuth({
            isAuth: false,
            user: null,
            status: 'done'
        });
        console.log(auth);
        console.log("De gebruiker is uitgelogd");
        history.push('/');
    }

// async functie op data op te halen voor login en useEffect om gegevens van de jwt token uit localStorage te halen
    async function getData(id, token, redirectUrl) {
        try {
            const data = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            setAuth({
                isAuth: true,
                user: {
                    username: data.data.username,
                    email: data.data.email,
                    id: data.data.id,
                },
                status:'done',
            });

            if (redirectUrl) {
                history.push(redirectUrl);
            }
        } catch (e) {
            console.error(e);
            setAuth({
                isAuth: false,
                user: null,
                status: 'error',
            });
        }
    }

// dit is de data van context die gebruikt kan worden op andere pagina's met hieronder de key's en function/waarde
    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        login: login,
        logout: logout

    }
// in de return status check doen vanwege renderen en controle van valid token in localStorage
    return (
        <AuthContext.Provider value={contextData}>
            {/*{auth.status === 'done' ? children : <p>Loading...</p>}*/}
            {auth.status === 'done' && children}
            {auth.status === 'pending' && <p>Loading...</p>}
            {auth.status === 'error' && <p>Error! Refresh de pagina!</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;