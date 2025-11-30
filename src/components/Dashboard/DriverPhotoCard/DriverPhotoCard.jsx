import './DriverPhotoCard.css';

function DriverPhotoCard({photoUrl, number, teamColor}) {
    return (
        <div className='driver-photo-card'>
            <img src={photoUrl} alt='Favoriete coureur' className='driver-photo'/>
            <span className='driver-number-overlay' style={{'--team-color': teamColor}}>
                {number}
            </span>
        </div>
    )
}

export default DriverPhotoCard;