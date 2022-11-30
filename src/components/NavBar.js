import React, {useContext} from 'react';
import logo from '../assets/banana-01.png';
import {useHistory, Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function NavBar() {
    const history = useHistory();
    const {isAuth, logOut, logIn, user} = useContext(AuthContext);

    console.log(isAuth);


    return (
        <nav>
            <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
            <h3>
              Banana Security
            </h3>
          </span>
            </Link>
            {isAuth ?
                <button
                    type="button"
                    onClick={ logOut }
                >
                    Log out
                </button>
                :
                <div>
                    <button
                        type="button"
                        onClick={ logIn }
                    >
                        Log in
                    </button>

                    <button
                        type="button"
                        onClick={logIn}
                    >
                        Registreren
                    </button>
                </div>}

        </nav>
    );
}

export default NavBar;