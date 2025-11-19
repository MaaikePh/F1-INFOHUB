import './RaceResults.css';
import {useState} from 'react';
import ResultsFilter from '../../filters-and-sorting/ResultsFilter/ResultsFilter.jsx';

function RaceResults({raceYear, allResults}) {
    const [filteredType, setFilteredType] = useState('all');
    const visibleResults = allResults.filter(result => {
        if (filteredType === 'all') return true;
        return result.type === filteredType;
    })

    return (
        <div className='race-results-section'>
            <header className='race-results-header'>
                {/*    hier komt straks de filterfunctie en de sorteerfunctie */}
                <ResultsFilter onFilterChange={setFilteredType} />
                <p>Sorteren op:</p>
            </header>

            <h3 className='title'>Uitslagen {raceYear}</h3>

            <div className='race-results-header-row'>
                <p>Grand Prix</p>
                <p>Type Resultaat</p>
                <p>Resultaat</p>
                <p>Datum</p>
            </div>

            {visibleResults.map((result, index) => (
                <div className='race-results-row' key={index}>
                    <p>{result.grandPrix}</p>
                    <p>{result.type}</p>
                    <p>{result.position}</p>
                    <p>{result.date}</p>
                </div>
            ))}

        </div>
    )
}

export default RaceResults;