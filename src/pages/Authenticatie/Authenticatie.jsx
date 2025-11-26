import './Authenticatie.css';
import RegisterForm from '../../components/auth-components/RegisterForm/RegisterForm.jsx';
import LoginForm from '../../components/auth-components/LoginForm/LoginForm.jsx';
import {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext.jsx';

function Authenticatie() {
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated]);


    return (
        <div className='authentication-page'>
            <LoginForm />

            <img
                src='/icons/lijn-inlogpagina.svg'
                alt=''
                className='auth-divider'
            />

            <RegisterForm/>
        </div>
    )
}

export default Authenticatie;