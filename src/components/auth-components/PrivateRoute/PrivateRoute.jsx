import './PrivateRoute.css';
import {AuthContext} from '../../../context/AuthContext.jsx';
import {useContext, useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';

function PrivateRoute({children}) {
    const {isAuthenticated, loading} = useContext(AuthContext);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            const timer = setTimeout(() => setShouldRedirect(true), 1500);
            return () => clearTimeout(timer);
        }
    }, [isAuthenticated]);

    if (loading) {
        return <p className='loading-message'>Laden...</p>;
    }

    if (!isAuthenticated) {
        return (
            <div className='private-route-message'>
                <p>Je moet ingelogd zijn om deze pagina te bekijken.</p>
                {shouldRedirect && <Navigate to='/inloggen' replace/>}
            </div>
        )
    }

    return children;
}

export default PrivateRoute;