import './LastRaceBox.css';
import StatsCircle from '../StatsCircle/StatsCircle.jsx';

function LastRaceBox({race, loading, error, color}) {
    if (loading) {
        return (
            <div className="last-race-box" style={{ '--team-color': color }}>
                <h3 className="title-race">Laatste Grand Prix</h3>
                <p className="position-label">Bezig met laden...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="last-race-box" style={{ '--team-color': color }}>
                <h3 className="title-race">Laatste Grand Prix</h3>
                <p className="position-label">{error}</p>
            </div>
        );
    }


    if (!race) return (
        <div className="last-race-box" style={{ '--team-color': color }}>
            <h3 className="title-race">Laatste Grand Prix</h3>
            <p className="position-label">Nog geen races gereden.</p>
        </div>
    );

    return (
        <div className='last-race-box' style={{
            '--team-color': color
        }}>
            <h3 className='title-race'>Laatste Grand Prix</h3>

            <div className='positions'>
                <div className='position-block'>
                    <span className='position-label'>Start positie</span>
                    <StatsCircle number={race.start} color={color} size={70}/>
                </div>

                <div className='position-block'>
                    <span className='position-label'>Eind positie</span>
                    <StatsCircle number={race.finish} color={color} size={70}/>
                </div>

            </div>
        </div>
    )
}

export default LastRaceBox;