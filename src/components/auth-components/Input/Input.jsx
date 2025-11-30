import './Input.css';

function Input({inputId, inputName, inputType, inputLabel, validationRules, register, errors}) {
    return (
        <div className='input-container'>
            <label htmlFor={inputId} className='input-label'>
                {inputLabel}
            </label>

            <input
                id={inputId}
                type={inputType}
                {...register(inputName, validationRules)}
                className='input-field'
            />

            {errors && errors[inputName] && (
                <p className='error-message'>{errors[inputName].message}</p>
            )}

        </div>
    )
}

export default Input;