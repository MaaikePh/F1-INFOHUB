import './LastRaceBox.jsx.css';
import StatsCircle from '../StatsCircle/StatsCircle.jsx';

function LastRaceBox({race, color}) {
    if (!race) return null;

    return (
        <div className='last-race-box'>
            <h3 className='title'>Laatste Grand Prix</h3>

            <div>
                <div>
                    <span>Start positie</span>
                    <StatsCircle number={race.start} color={color} size={70}/>
                </div>

                <div>
                    <span>Eind positie</span>
                    <StatsCircle number={race.finish} color={color} size={70}/>
                </div>

            </div>
        </div>
    )
}

export default LastRaceBox;