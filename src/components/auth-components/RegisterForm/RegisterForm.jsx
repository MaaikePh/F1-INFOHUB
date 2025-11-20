import './RegisterForm.css';
import {useForm} from 'react-hook-form';
import Input from '../Input/Input.jsx';

function RegisterForm() {
    const {register, handleSubmit, formState: {errors}} = useForm();



    return (
        <form>

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

        </form>
    )
}

export default RegisterForm;