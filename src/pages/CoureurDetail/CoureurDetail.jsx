import './CoureurDetail.css';
import TeamCard from '../../components/TeamCard/TeamCard.jsx';
import driverStats from '../../constants/driver-stats.json';
import testdata from '/src/constants/test-api-data.json';
import teams from '../../constants/teams.js';
import RaceResults from '../../components/coureurdetailpage/RaceResults/RaceResults.jsx';
import PersonalInfo from '../../components/coureurdetailpage/PersonalInfo/PersonalInfo.jsx';
import TeamInfo from '../../components/coureurdetailpage/TeamInfo/TeamInfo.jsx';
import calculateAge from '../../helpers/calculateAge.js';
import {formatDutchDate} from '../../helpers/dateFormatter.js';
import {useParams} from 'react-router-dom';

function CoureurDetail() {
    const {id} = useParams();

    const driver = driverStats.find(s => s.id === Number(id));
    const data = testdata.drivers.find(d => d.id === Number(id));
    const team = teams.find(t => t.name === data.team);
    const races = testdata.races;

    const raceResultsForDriver = races.flatMap(race => {
        const driverName = data.name;

        const raceResult = race.results.race.find(r => r.driver === driverName);
        const qualiResult = race.results.qualifying.find(r => r.driver === driverName);
        const sprintResult = race.results.sprint.find(r => r.driver === driverName);

        const results = [];

        if (raceResult) {
            results.push({
                grandPrix: race.name,
                type: "Race",
                position: raceResult.position,
                date: race.endDate
            });
        }

        if (qualiResult) {
            results.push({
                grandPrix: race.name,
                type: "Qualificatie",
                position: qualiResult.position,
                date: race.endDate
            });
        }

        if (sprintResult) {
            results.push({
                grandPrix: race.name,
                type: "Sprint",
                position: sprintResult.position,
                date: race.endDate
            });
        }

        return results;
    })

    return (
        <main className='driver-detail-container'>

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
                    <img
                        src={driver.imageDetail}
                        alt={driver.name}
                        className='driver-detail-img'
                    />

                    <p className='driver-number number-detail'>{data.raceNumber}</p>

                    <TeamCard
                        teamName={team.name}
                        teamKey={team.key}
                        className='team-card-detail'
                    />
                </div>

            </header>

            <section className='race-results-panel'>
                <RaceResults
                    raceYear={testdata.season}
                    allResults={raceResultsForDriver}
                />
            </section>

            <section className='personal-panel'>
                <PersonalInfo
                    country={data.country}
                    countryCode={data.countryCode}
                    birthdate={formatDutchDate(data.birthdate)}
                    age={calculateAge(data.birthdate)}
                    firstSeason={data.firstSeason}
                />
            </section>

            <section className='team-panel'>
                <TeamInfo
                    teamName={team.name}
                    teamCountry={team.country}
                    countryCode={team.countryCode}
                />
            </section>
        </main>
    )
}

export default CoureurDetail;