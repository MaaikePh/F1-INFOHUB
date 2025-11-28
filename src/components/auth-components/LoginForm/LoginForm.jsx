import './LoginForm.css';
import Input from '../Input/Input.jsx';
import Button from '../../general/Button/Button.jsx';
import {useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {AuthContext} from '../../../context/AuthContext.jsx';
import {useNavigate} from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const {login, loading, authError} = useContext(AuthContext);
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    async function onSubmit(data) {
        setSuccessMessage('');

        const success = await login(data.email, data.password);

        if (success) {
            setSuccessMessage('Je bent succesvol ingelogd!');
            reset();

            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        }
    }

    return (
        <div className='login-form-container'>
            <h2 className='title'>Log in bij je account</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='login-form'
            >

                <Input
                    inputId='login-email-field'
                    inputName='email'
                    inputType='email'
                    inputLabel='E-mailadres'
                    validationRules={{
                        required: {
                            value: true,
                            message: 'E-mailadres is verplicht.'
                        },
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Voer een geldig e-mailadres in.',
                        }
                    }}
                    register={register}
                    errors={errors}
                />

                <Input
                    inputId='login-password-field'
                    inputName='password'
                    inputType='password'
                    inputLabel='Wachtwoord'
                    validationRules={{
                        required: {
                            value: true,
                            message: 'Wachtwoord is verplicht.'
                        },
                        minLength: {
                            value: 6,
                            message: 'Wachtwoord moet minimaal 6 tekens bevatten.',
                        }
                    }}
                    register={register}
                    errors={errors}
                />

                <Button
                    type='submit'
                    buttonStyle='primary'
                    showArrow={!loading}
                    disabled={loading}
                >
                    {loading ? 'Bezig...' : 'Inloggen'}
                </Button>

                {authError && <p className='error-message' role='alert'>{authError}</p>}
                {successMessage && <p className='success-message' role='alert'>{successMessage}</p>}

            </form>
        </div>
    )
}

export default LoginForm;