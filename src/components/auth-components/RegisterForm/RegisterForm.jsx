import './RegisterForm.css';
import {useForm} from 'react-hook-form';
import Input from '../Input/Input.jsx';
import Select from '../Select/Select.jsx';
import teams from '../../../constants/teams.js'
import testdata from '../../../constants/test-api-data.json'
import Button from '../../general/Button/Button.jsx';

function RegisterForm() {
    const {register, handleSubmit, formState: {errors}} = useForm();

    function onSubmit(data) {
        console.log('Formulier verstuurd!', data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

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
                }}
                register={register}
                errors={errors}
            />

            <Select
                selectId='favorite-team'
                selectName='favoriteTeam'
                selectLabel='Favoriet Formule 1 team'
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
                selectOptions={testdata.drivers.map(driver => ({
                    value: driver.id,
                    label: driver.name,
                }))}
                register={register}
                errors={errors.favoriteDriver?.message}
            />

            <Button
                type="submit"
                buttonStyle='primary'
                showArrow={true}
            >
                Registreren
            </Button>

        </form>
    )
}

export default RegisterForm;