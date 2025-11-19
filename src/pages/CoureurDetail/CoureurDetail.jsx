import './CoureurDetail.css';
import TeamCard from '../../components/TeamCard/TeamCard.jsx';
import driverStats from '../../constants/driver-stats.json';
import testdata from '/src/constants/test-api-data.json';
import teams from '../../constants/teams.js';
import RaceResults from '../../components/coureurdetailpage/RaceResults/RaceResults.jsx';
import PersonalInfo from '../../components/coureurdetailpage/PersonalInfo/PersonalInfo.jsx';
import TeamInfo from '../../components/coureurdetailpage/TeamInfo/TeamInfo.jsx';

function CoureurDetail() {
    const driver = driverStats[0];
    const data = testdata.drivers[0];
    const team = teams[0];

    const driverName = data.name;
    const race = testdata.races[0];
    const raceResult = race.results.race.find(r => r.driver === driverName);
    const qualiResult = race.results.qualifying.find(r => r.driver === driverName);
    const sprintResult = race.results.sprint.find(r => r.driver === driverName);

    const results = [];

    if (raceResult) {
        results.push({
            type: "Race",
            position: raceResult.position,
        });
    }

    if (qualiResult) {
        results.push({
            type: "Qualificatie",
            position: qualiResult.position,
        });
    }

    if (sprintResult) {
        results.push({
            type: "Sprint",
            position: sprintResult.position,
        });
    }

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
                    raceName={testdata.races[0].name}
                    results={results}
                    raceDate={testdata.races[0].endDate}
                />
            </section>

            <section className='personal-panel'>
                <PersonalInfo />
            </section>

            <section className='team-panel'>
                <TeamInfo />
            </section>
        </main>
    )
}

export default CoureurDetail;