import React, {useContext} from 'react';
import logo from '../assets/banana-01.png';
import {useHistory, Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function NavBar() {
    const history = useHistory();
    const {isAuth, logout, login, user} = useContext(AuthContext);

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
                    onClick={ logout }
                >
                    Log out
                </button>
                :
                <div>
                    <button
                        type="button"
                        onClick={ login }
                    >
                        Log in
                    </button>

                    <button
                        type="button"
                        onClick={ login }
                    >
                        Registreren
                    </button>
                </div>}

        </nav>
    );
}

export default NavBar;