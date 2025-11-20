import './Select.css';

function Select({selectId, selectName, selectLabel, selectOptions, register, errors}) {
    return (
        <div className='select-container'>
            <label htmlFor={selectId} className='select-label'>
                {selectLabel}
            </label>

            <select
                id={selectId}
                {...register(selectName)}
            className='select-option'>
                <option value=''>Maak een keuze</option>
                {selectOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            {errors && <p>{errors}</p>}

        </div>
    )
}

export default Select;