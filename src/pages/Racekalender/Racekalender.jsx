import './Racekalender.css';
import testdata from '/src/constants/test-api-data.json';
import RaceFilter from '../../components/filters-and-sorting/RaceFilter/RaceFilter.jsx';
import RaceCard from '../../components/RaceCard/RaceCard.jsx';
import {useState} from 'react';
import {getMonthKey} from '../../helpers/getMonthKey.js';

function Racekalender() {
    const [monthFilter, setMonthFilter] = useState('all');

    return (
        <main className="Racekalender">
            <h1 className='title'>Racekalender {testdata.season}</h1>

            <section className='race-filter-container'>
                    <RaceFilter onFilterChange={setMonthFilter} />
            </section>

            <section className='all-races-container'>
                {testdata.races
                    .filter(race =>
                        monthFilter === 'all' ||
                        getMonthKey(race.beginDate) === monthFilter)
                    .map(race => (
                    <RaceCard
                    key={race.id}
                    raceName={race.name}
                    countryFlag={race.countryCode}
                    startDate={race.beginDate}
                    endDate={race.endDate}
                    label={race.status}
                    positionOne={race.results?.race?.[0]?.driver}
                    positionTwo={race.results?.race?.[1]?.driver}
                    positionThree={race.results?.race?.[2]?.driver}
                    />
                ))}
            </section>
        </main>
    )
}

export default Racekalender;