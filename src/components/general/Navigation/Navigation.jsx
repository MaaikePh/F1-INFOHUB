import './Navigation.css';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../../../context/AuthContext.jsx';

function Navigation() {
    const {isAuthenticated, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/inloggen');
    }

    return (
        <header className='navigation-bar'>

            <Link to={'/'}  className='logo'>
                <h2>F1INFOHUB</h2>
            </Link>

            <nav>
                <ul className='navbar'>
                    <li>
                        <NavLink
                            className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                            to='/'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                            to='/racekalender'>
                            Racekalender
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                            to='/dashboard'>
                            Dashboard
                        </NavLink>
                    </li>
                    {!isAuthenticated && (
                        <li>
                            <NavLink
                                className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                to='/inloggen'>
                                Inloggen
                            </NavLink>
                        </li>
                    )}
                    {isAuthenticated && (
                        <li>
                            <span
                                className='logout-button'
                                onClick={handleLogout}
                            >
                                Uitloggen
                            </span>
                        </li>
                    )}

                </ul>
            </nav>
        </header>
    )
}

export default Navigation;