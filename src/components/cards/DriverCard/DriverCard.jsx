import './DriverCard.css';
import {Link} from 'react-router-dom';

function DriverCard({
                        driverFirstName,
                        driverLastName,
                        driverTeam,
                        driverNumber,
                        driverFlag,
                        driverImage,
                        imageAlt,
                        teamKey,
                        driverId,
                    }) {
    return (
        <Link to={`/coureur/${driverId}`} className='driver-card-link'>
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
        </Link>
    )
}

export default DriverCard;