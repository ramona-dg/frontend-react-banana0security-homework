import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function SignIn( {children }) {
    const {logIn} = useContext(AuthContext)

    // e/ e.prefentDefault zorgt ervoor dat pagina niet refresht
    function handleSubmit(e) {
        e.preventDefault();
        logIn();
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>
                <p>*invoervelden*</p>
                <button type="submit"
                >Inloggen
                </button>

            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;