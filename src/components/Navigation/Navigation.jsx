import './Navigation.css';
import {NavLink} from 'react-router-dom';

function Navigation() {
    return (
        <div className='navigation-bar'>
            <h2 className='logo'>F1INFOHUB</h2>
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
                    <li>
                        <NavLink
                            className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                            to='/inloggen'>
                            Inloggen
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navigation;