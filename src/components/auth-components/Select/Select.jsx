import './Select.css';

function Select({selectId, selectName, selectLabel, selectOptions, register, errors}) {
    return (
        <>
            <label htmlFor={selectId} className='label'>
                {selectLabel}
                
                <select
                    id={selectId}
                    {...register(selectName)}>
                    <option value=''>Maak een keuze</option>
                    {selectOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                {errors && <p>{errors}</p>}
                
            </label>
        </>
    )
}

export default Select;