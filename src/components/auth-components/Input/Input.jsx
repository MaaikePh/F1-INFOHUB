import './Input.css';

function Input({inputId, inputName, inputType, inputLabel, validationRules, register, errors}) {
    return (
        <>
        <label htmlFor={inputId}>
            {inputLabel}
            <input
                id={inputId}
                type={inputType}
                {...register(inputName, validationRules)}
            />
        </label>
            {errors[inputName] && <p>{errors[inputName].message}</p>}
        </>
    )
}

export default Input;