import './Select.css';

function Select({selectId, selectName, selectLabel, selectOptions, register, error}) {
    return (
        <>
            <label htmlFor={selectId}>
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

                {error && <p>{error}</p>}
                
            </label>
        </>
    )
}

export default Select;