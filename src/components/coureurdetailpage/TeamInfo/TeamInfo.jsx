import './TeamInfo.css';

function TeamInfo({teamName, teamCountry, countryCode}) {
    return (
        <div className='team-info-section'>

            <h3 className='title'>Team informatie</h3>

            <div className='info-row'>
                <p className='info-label'>Naam:</p>
                <p className='info-value'>{teamName}</p>
            </div>

            <div className='info-row'>
                <p className='info-label'>Land:</p>
                <p className='info-value'>
                    {countryCode && (
                        <i className={`fi fi-${countryCode} flag-icon`}></i>
                    )}
                    {teamCountry}
                </p>
            </div>

        </div>
    )
}

export default TeamInfo;