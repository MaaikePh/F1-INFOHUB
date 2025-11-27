import './RegisterForm.css';
import {useForm} from 'react-hook-form';
import Input from '../Input/Input.jsx';
import Select from '../Select/Select.jsx';
import Button from '../../general/Button/Button.jsx';
import {registerUser, emailExists, createPreferences, loginUser} from '../../../helpers/api.js';
import {useContext, useState} from 'react';
import {AuthContext} from '../../../context/AuthContext.jsx';
import { normalize } from '../../../helpers/normalizer.js';
import driverstats from '../../../constants/driver-stats.json';

function RegisterForm() {
    const {setFavoriteTeam, setFavoriteDriver} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const teams = [
        ...new Map(driverstats.map(d => [d.team.key, d.team]))
    ].map(([, team]) => team);

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

            const newUser = await registerUser({
                email: data.email,
                password: data.password,
                roles: ['member']
            });

            const userId = newUser.id;

            const loginResult = await loginUser({
                email: data.email,
                password: data.password,
                roles: ['member']
            });

            localStorage.setItem('token', loginResult.token);
            console.log("Token uit login:", loginResult.token);

            const prefs = await createPreferences({
                userId,
                favoriteTeam: data.favoriteTeam,
                favoriteDriver: data.favoriteDriver
            });

            setFavoriteTeam(prefs.favoriteTeam);
            setFavoriteDriver(prefs.favoriteDriver);
            localStorage.setItem('favoriteTeam', prefs.favoriteTeam);
            localStorage.setItem('favoriteDriver', prefs.favoriteDriver);

            setSuccessMessage('Je account is succesvol aangemaakt!');
            console.log('Succesvol geregistreerd:', prefs);

            reset();
            setSelectedTeam('');

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
                    inputId='register-email-field'
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
                    inputId='register-password-field'
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
                    onChange={(e) => setSelectedTeam(e.target.value)}
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
                    selectOptions={driverstats
                        .filter(driver => normalize(driver.team.key) === normalize(selectedTeam))
                        .map(driver => ({
                        value: driver.name,
                        label: driver.name,
                    }))}
                    register={register}
                    errors={errors.favoriteDriver?.message}
                    disabled={!selectedTeam}
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