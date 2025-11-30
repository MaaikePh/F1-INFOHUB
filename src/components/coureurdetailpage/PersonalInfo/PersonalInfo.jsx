import './PersonalInfo.css';

function PersonalInfo({country, birthdate, age, firstSeason, countryCode}) {
    return (
        <div className='personal-info-section'>
            <h3 className='title'>Persoonlijke informatie</h3>

            <dl>

                <div className='info-row'>
                    <dt className='info-label'>Land:</dt>
                    <dd className='info-value'>
                        {countryCode && (
                            <i className={`fi fi-${countryCode} flag-icon`}></i>
                        )}
                        {country}
                    </dd>
                </div>

                <div className='info-row'>
                    <dt className='info-label'>Geboortedatum:</dt>
                    <dd className='info-value'>{birthdate}</dd>
                </div>

                <div className='info-row'>
                    <dt className='info-label'>Leeftijd:</dt>
                    <dd className='info-value'>{age}</dd>
                </div>

                <div className='info-row'>
                    <dt className='info-label'>Eerste F1 seizoen:</dt>
                    <dd className='info-value'>{firstSeason}</dd>
                </div>

            </dl>

        </div>
    )
}

export default PersonalInfo;