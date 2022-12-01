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

    useEffect(() => {
        // Check of er een JWT in de Local Storage aanwezig is
        // Als dat zo is, decodeer je de token. We namelijk hebben de id van de gebruiker nodig!
        const token = localStorage.getItem(token);
        if (token) {
            async function getUserData() {
                const decodedToken = jwtDecode(token);
                try {
                    const response = await axios.get(`http://localhost:3000/600/users/${decodedToken.sub}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    setAuth({
                        isAuth: true,
                        user: {
                            username: data.data.username,
                            email: data.data.email,
                            id: data.data.id,
                        },
                        status: 'pending',
                    })
                } catch (e) {
                    setAuth({
                        ...auth,
                        status: 'error',
                    });
                    localStorage.clear();
                    console.error(e);
                }
            }
            getUserData();
        }else{
            setAuth({
                ...auth,
                status: 'done',
            });
        }
    }, [])


    //jwt komt uit SignIn onder result.data.accessToken
    function login(jwt) {
        console.log("De gebruiker is ingelogd");
        // token wordt opgeslagen in localStorage>app in webbrowser
        localStorage.setItem('token', jwt);
        const decode = jwtDecode(jwt)
        // decode om overige gegevens uit de token te halen, BEHALVE password
        console.log(decode);
        setAuth(true);
        history.push('/profile');
        //hieronder vul je de gegevens voor de getData functie beneden in de pagina
        getData(decode.sub, jwt);
    }


    function logout() {
        console.log("De gebruiker is uitgelogd");
        localStorage.clear();
        setAuth({
            isAuth: false,
            user: null
        });
        console.log(auth);
        history.push('/');
    }

    async function getData(id, token) {
        try {
            const data = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            setAuth({
                isAuth: true,
                user: {
                    username: data.data.username,
                    email: data.data.email,
                    id: data.data.id,
                },
            });
            // console.log(isAuth);
            history.push('/profile');
        } catch (e) {
            console.error(e);
        }
    }

// dit is de data van context die gebruikt kan worden op andere pagina's
    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        login: login,
        logout: logout

    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;