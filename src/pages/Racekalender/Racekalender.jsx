import './Racekalender.css';
import testdata from '/src/constants/test-api-data.json';
import RaceFilter from '../../components/RaceFilter/RaceFilter.jsx';
import RaceCard from '../../components/RaceCard/RaceCard.jsx';

function Racekalender() {
    return (
        <main>
            <h1 className='title'>Racekalender {testdata.season}</h1>

            <section className='race-filter-container'>
                <form>
                    <RaceFilter />
                </form>
            </section>

            <section className='all-races-container'>
                <RaceCard />
            </section>
        </main>
    )
}

export default Racekalender;