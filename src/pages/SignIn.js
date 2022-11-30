import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function SignIn( {children }) {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // e.preventDefault zorgt ervoor dat pagina niet refresht
    async function handleSubmit(e){
        e.preventDefault()
        try{
            const result = await axios.post('http://localhost:3000/login',{
                email: email,
                password: password
                })
            console.log(result.data.accessToken)
            login(result.data.accessToken)

        }catch (e){
            console.error(e)
        }
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username-field">
                    E-mail:
                    <input
                        name="email"
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label htmlFor="password-field">
                    Wachtwoord:
                    <input
                        name="password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit"
                >Inloggen
                </button>

            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;