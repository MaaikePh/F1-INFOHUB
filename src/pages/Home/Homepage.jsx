import './Homepage.css';
import testdata from '/src/constants/test-api-data.json';
import driverstats from '/src/constants/driver-stats.json';
import teams from '../../constants/teams.js';
    import TeamCard from '../../components/cards/TeamCard/TeamCard.jsx';
import DriverCard from '../../components/cards/DriverCard/DriverCard.jsx';

function Homepage() {
    return (
        <>
            <section className='all-teams-container'>
                {teams.map(team => (
                    <TeamCard
                    key={team.key}
                    teamName={team.name}
                    teamKey={team.key}
                    />
                ))}

            </section>

            <h1 className="title">
                F1 coureurs {testdata.season}
            </h1>

            <section className='all-drivers-container'>
                {testdata.drivers
                    .sort((a, b) => a.id - b.id)
                    .map(driver => {

                    const stats = driverstats.find(s => s.id === driver.id);
                    const team = teams.find(t => t.name === driver.team);

                    return (
                        <DriverCard
                            key={driver.id}
                            teamKey={team.key}
                            driverId={driver.id}
                            driverFirstName={driver.firstName}
                            driverLastName={driver.lastName}
                            driverTeam={driver.team}
                            driverNumber={driver.raceNumber}
                            driverFlag={driver.countryCode}
                            driverImage={stats.imageMain}
                            imageAlt={driver.name}
                        />
                    );
                })}
            </section>
        </>
    )
}

export default Homepage;