import './PersonalInfo.css';

function PersonalInfo({country, birthdate, age, firstSeason, countryCode}) {
    return (
        <div className='personal-info-section'>
            <h3 className='title'>Persoonlijke informatie</h3>

            <div className='info-row'>
                <p className='info-label'>Land:</p>
                <p className='info-value'>
                    {countryCode && (
                        <i className={`fi fi-${countryCode} flag-icon`}></i>
                    )}
                    {country}
                </p>
            </div>

            <div className='info-row'>
                <p className='info-label'>Geboortedatum:</p>
                <p className='info-value'>{birthdate}</p>
            </div>

            <div className='info-row'>
                <p className='info-label'>Leeftijd:</p>
                <p className='info-value'>{age}</p>
            </div>

            <div className='info-row'>
                <p className='info-label'>Eerste F1 seizoen:</p>
                <p className='info-value'>{firstSeason}</p>
            </div>

        </div>
    )
}

export default PersonalInfo;