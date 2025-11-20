import './Select.css';

function Select({selectId, selectName, selectLabel, validationRules, selectOptions, register, errors, onChange, disabled}) {
    return (
        <div className='select-container'>
            <label htmlFor={selectId} className='select-label'>
                {selectLabel}
            </label>

            <select
                id={selectId}
                disabled={disabled}
                {...register(selectName, validationRules)}
                onChange={onChange}
                className='select-field'>
                <option value=''>Maak een keuze</option>
                {selectOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            {errors && <p className='error-message'>{errors}</p>}

        </div>
    )
}

export default Select;