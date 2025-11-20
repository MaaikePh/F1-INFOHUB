import './RegisterForm.css';
import {useForm} from 'react-hook-form';
import Input from '../Input/Input.jsx';
import Select from '../Select/Select.jsx';
import teams from '../../../constants/teams.js'
import testdata from '../../../constants/test-api-data.json'
import Button from '../../general/Button/Button.jsx';
import {registerUser, emailExists} from '../../../helpers/api.js';
import {useState} from 'react';

function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    async function onSubmit(data) {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const exists = await emailExists(data.email);

            if (exists) {
                setErrorMessage('Dit e-mailadres is al in gebruik.');
                setLoading(false);
                return;
            }

            const payload = {
                email: data.email,
                password: data.password,
                favoriteTeam: data.favoriteTeam,
                favoriteDriver: data.favoriteDriver,
            }

            const result = await registerUser(payload);

            setSuccessMessage('Je account is succesvol aangemaakt!');
            console.log('Succesvol geregistreerd:', result);

            localStorage.setItem('favoriteTeam', data.favoriteTeam);
            localStorage.setItem('favoriteDriver', data.favoriteDriver);

            reset();

        } catch (error) {
            console.error('Registreren mislukt:', error);

            setErrorMessage(
                error.response?.data?.message || 'Registreren is mislukt. Probeer het opnieuw.'
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='register-form-container'>
            <h2 className='title'>Maak hier je account aan</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='register-form'
            >

                <Input
                    inputId='email-field'
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
                    inputId='password-field'
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

                <Select
                    selectId='favorite-team'
                    selectName='favoriteTeam'
                    selectLabel='Favoriet Formule 1 team'
                    validationRules={{
                        required: {
                            value: true,
                            message: 'Selecteer een team.'
                        },
                    }}
                    selectOptions={teams.map(t => ({
                        value: t.key,
                        label: t.name,
                    }))}
                    register={register}
                    errors={errors.favoriteTeam?.message}
                />

                <Select
                    selectId='favorite-driver'
                    selectName='favoriteDriver'
                    selectLabel='Favoriete coureur'
                    validationRules={{
                        required: {
                            value: true,
                            message: 'Selecteer een coureur.'
                        },
                    }}
                    selectOptions={testdata.drivers.map(driver => ({
                        value: driver.id,
                        label: driver.name,
                    }))}
                    register={register}
                    errors={errors.favoriteDriver?.message}
                />

                <Button
                    type='submit'
                    buttonStyle='primary'
                    showArrow={!loading}
                    disabled={loading}
                >
                    {loading ? 'Bezig...' : 'Registreren'}
                </Button>

                {errorMessage && <p className='error-message'>{errorMessage}</p>}
                {successMessage && <p className='success-message'>{successMessage}</p>}

            </form>
        </div>
    )
}

export default RegisterForm;