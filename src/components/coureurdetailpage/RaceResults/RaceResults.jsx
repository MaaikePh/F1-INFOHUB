import './RaceResults.css';

function RaceResults({raceYear, raceName, results, raceDate}) {
    return (
        <div className='race-results-section'>
            <header className='race-results-header'>
                {/*    hier komt straks de filterfunctie en de sorteerfunctie */}
                <p>Filteren op:</p>
                <p>Sorteren op:</p>
            </header>

            <h3 className='title'>Uitslagen {raceYear}</h3>

            <div className='race-results-header-row'>
                <p>Grand Prix</p>
                <p>Type Resultaat</p>
                <p>Resultaat</p>
                <p>Datum</p>
            </div>

            {results.map((race, index) => (
                <div className='race-results-row' key={index}>
                    <p>{raceName}</p>
                    <p>{race.type}</p>
                    <p>{race.position}</p>
                    <p>{raceDate}</p>
                </div>
            ))}

        </div>
    )
}

export default RaceResults;