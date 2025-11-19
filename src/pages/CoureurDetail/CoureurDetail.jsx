import './CoureurDetail.css';
import TeamCard from '../../components/TeamCard/TeamCard.jsx';
import driverStats from '../../constants/driver-stats.json';
import testdata from '/src/constants/test-api-data.json';
import teams from '../../constants/teams.js';

function CoureurDetail() {
    const driver = driverStats[0];
    const data = testdata.drivers[0];
    const team = teams[0];

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
                        className='team-card'
                    />
                </div>

            </header>

            <section className='race-results-panel'>

            </section>

            <section className='personal-panel'>

            </section>

            <section className='team-panel'>

            </section>
        </main>
    )
}

export default CoureurDetail;