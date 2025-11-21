import './StatsCircle.css';

function StatsCircle({number, size = 70, color}) {
    return (
        <div className={`stats-circle size-${size}`}
        style={{
            '--team-color': color
        }}>
            <span className='number'>{number}</span>
        </div>
    )
}

export default StatsCircle;