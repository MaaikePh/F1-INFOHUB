import './TeamInfo.css';

function TeamInfo({teamName, teamCountry, countryCode}) {
    return (
        <div className='team-info-section'>

            <h3 className='title'>Team informatie</h3>

            <dl>

                <div className='info-row'>
                    <dt className='info-label'>Naam:</dt>
                    <dd className='info-value'>{teamName}</dd>
                </div>

                <div className='info-row'>
                    <dt className='info-label'>Land:</dt>
                    <dd className='info-value'>
                        {countryCode && (
                            <i className={`fi fi-${countryCode} flag-icon`}></i>
                        )}
                        {teamCountry}
                    </dd>
                </div>

            </dl>

        </div>
    )
}

export default TeamInfo;