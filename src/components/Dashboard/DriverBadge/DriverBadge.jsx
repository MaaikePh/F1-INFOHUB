import './DriverBadge.css';

function DriverBadge({number, name, color}) {
    return (
        <div className='driver-badge' style={{'--team-color': color}}>
            <span className='driver-number'>{number}</span>
            <span className='driver-name'>{name}</span>
        </div>
    )
}

export default DriverBadge;