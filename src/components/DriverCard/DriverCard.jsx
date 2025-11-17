import './DriverCard.css';

function DriverCard({
                        driverFirstName,
                        driverLastName,
                        driverTeam,
                        driverNumber,
                        driverFlag,
                        driverImage,
                        imageAlt,
                        teamKey
                    }) {
    return (
        <article className={`driver-card ${teamKey}`}>
            <div className='driver-info'>
                <div className='driver-name'>
                    <h3>{driverFirstName}</h3>
                    <h2>{driverLastName}</h2>
                    <h3>{driverTeam}</h3>
                </div>

                <div className='extra-info'>
                    <p className='driver-number'>{driverNumber}</p>
                    <i className={`fi fi-${driverFlag} flag-icon`}></i>
                </div>
            </div>

            <div className='driver-image'>
                <img src={driverImage} alt={imageAlt}/>
            </div>
        </article>
    )
}

export default DriverCard;