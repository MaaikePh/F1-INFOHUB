import './LastRaceBox.css';
import StatsCircle from '../StatsCircle/StatsCircle.jsx';

function LastRaceBox({race, teamColor}) {
    if (!race) return null;

    return (
        <div className='last-race-box' style={{
            '--team-color': teamColor
        }}>
            <h3 className='title-race'>Laatste Grand Prix</h3>

            <div className='positions'>
                <div className='position-block'>
                    <span className='position-label'>Start positie</span>
                    <StatsCircle number={race.start} color={teamColor} size={70}/>
                </div>

                <div className='position-block'>
                    <span className='position-label'>Eind positie</span>
                    <StatsCircle number={race.finish} color={teamColor} size={70}/>
                </div>

            </div>
        </div>
    )
}

export default LastRaceBox;