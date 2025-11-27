import './CoureurDetail.css';
import TeamCard from '../../components/cards/TeamCard/TeamCard.jsx';
import driverStats from '../../constants/driver-stats.json';
import RaceResults from '../../components/coureurdetailpage/RaceResults/RaceResults.jsx';
import PersonalInfo from '../../components/coureurdetailpage/PersonalInfo/PersonalInfo.jsx';
import TeamInfo from '../../components/coureurdetailpage/TeamInfo/TeamInfo.jsx';
import calculateAge from '../../helpers/calculateAge.js';
import {formatDutchDate} from '../../helpers/dateFormatter.js';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {getAllResultsForDriver} from '../../helpers/getAllResultsForDriver.js';

function CoureurDetail() {
    const [raceResultsForDriver, setRaceResultsForDriver] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const {id} = useParams();

    const driver = driverStats.find(s => s.id === Number(id));
    const team = driver?.team;

    useEffect(() => {
        if (!driver?.id) return;

        const controller = new AbortController();

        async function loadResults() {
            setLoading(true);
            setError('');

            try {
                const results = await getAllResultsForDriver(driver.id, controller.signal);
                setRaceResultsForDriver(results);
            } catch (err) {
                if (err.name !== 'CanceledError') {
                    console.error(err);
                    setError('Kan racegegevens niet ophalen.');
                }
            } finally {
                setLoading(false);
            }
        }

        loadResults();
        return () => controller.abort();

    }, [driver?.id]);

    if (!driver) {
        return (
            <div className="driver-detail-container">
                <h1 className="title">Coureur niet gevonden</h1>
            </div>
        );
    }

    return (
        <div className='driver-detail-container'>

            <header className='driver-header'>

                <div className='driver-header-info'>
                    <h1 className='title'>{driver.name}</h1>

                    <div className='stats'>
                        <div className='stat'>
                            <p className='stat-label'>Overwinningen</p>
                            <p className='driver-number'>{driver.wins ?? '--'}</p>
                        </div>

                        <div className='stat'>
                            <p className='stat-label'>Poles</p>
                            <p className='driver-number'>{driver.poles ?? '--'}</p>
                        </div>

                        <div className='stat'>
                            <p className='stat-label'>Podiums</p>
                            <p className='driver-number'>{driver.podiums ?? '--'}</p>
                        </div>
                    </div>
                </div>

                <div className='driver-header-photo'>
                    <div className='driver-photo-wrapper'>
                        <img
                            src={driver.imageDetail}
                            alt={driver.name}
                            className='driver-detail-img'
                        />

                        <p className='driver-number number-detail'>{driver.raceNumber}</p>
                    </div>

                    <TeamCard
                        teamName={team.name}
                        teamKey={team.key}
                        className='team-card-detail'
                    />

                </div>

            </header>

            <section className='race-results-panel'>
                <RaceResults
                    raceYear={2025}
                    allResults={raceResultsForDriver}
                    loading={loading}
                    error={error}
                />
            </section>

            <section className='personal-panel'>
                <PersonalInfo
                    country={driver.country}
                    countryCode={driver.countryCode}
                    birthdate={formatDutchDate(driver.birthdate)}
                    age={calculateAge(driver.birthdate)}
                    firstSeason={driver.firstSeason}
                />
            </section>

            <section className='team-panel'>
                <TeamInfo
                    teamName={team.name}
                    teamCountry={team.country}
                    countryCode={team.countryCode}
                />
            </section>
        </div>
    )
}

export default CoureurDetail;