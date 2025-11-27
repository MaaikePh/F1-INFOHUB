import './RaceResults.css';
import {useState} from 'react';
import ResultsFilter from '../../filters-and-sorting/ResultsFilter/ResultsFilter.jsx';
import ResultsSort from '../../filters-and-sorting/ResultsSort/ResultsSort.jsx';
import {formatDutchDate} from '../../../helpers/dateFormatter.js';

function RaceResults({raceYear, allResults, loading, error}) {
    const [filteredType, setFilteredType] = useState('all');
    const [sortType, setSortType] = useState('date-desc');

    if (loading) {
        return (
            <div className="race-results-section">
                <h3 className="title">Uitslagen {raceYear}</h3>
                <p className="race-status">Gegevens laden...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="race-results-section">
                <h3 className="title">Uitslagen {raceYear}</h3>
                <p className="race-status">{error}</p>
            </div>
        );
    }

    if (!allResults || allResults.length === 0) {
        return (
            <div className="race-results-section">
                <h3 className="title">Uitslagen {raceYear}</h3>
                <p className="race-status">Geen resultaten gevonden.</p>
            </div>
        );
    }

    const visibleResults = allResults.filter(result => {
        if (filteredType === 'all') return true;
        return result.type === filteredType;
    })

    let sortedResults = [...visibleResults];

    if (sortType === 'date-desc') {
        sortedResults.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    if (sortType === 'date-asc') {
        sortedResults.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return (
        <div className='race-results-section'>
            <header className='race-results-header'>
                <ResultsFilter onFilterChange={setFilteredType} />
                <ResultsSort onSortChange={setSortType} />
            </header>

            <h3 className='title'>Uitslagen {raceYear}</h3>

            <div className='race-results-header-row'>
                <p>Grand Prix</p>
                <p>Type Resultaat</p>
                <p>Resultaat</p>
                <p>Datum</p>
            </div>

            {sortedResults.map((result, index) => (
                <div className='race-results-row' key={index}>
                    <p>{result.grandPrix}</p>
                    <p>{result.type}</p>
                    <p>{result.position}</p>
                    <p>{formatDutchDate(result.date)}</p>
                </div>
            ))}

        </div>
    )
}

export default RaceResults;