import './Homepage.css';
import testdata from '/src/constants/test-api-data.json';
import driverstats from '/src/constants/driver-stats';
import teams from '../../constants/teams.js';
import TeamCard from '../../components/TeamCard/TeamCard.jsx';
import DriverCard from '../../components/DriverCard/DriverCard.jsx';

function Homepage() {
    return (
        <main>
            <section className='all-teams-container'>
                {teams.map(team => (
                    <TeamCard
                    teamName={team.name}
                    teamKey={team.key}
                    />
                ))}

            </section>

            <h1 className="title">
                F1 coureurs {testdata.season}
            </h1>

            <section className='all-drivers-container'>
                <DriverCard
                    teamKey={teams[0].key}
                    driverFirstName={testdata.drivers[4].firstName}
                    driverLastName={testdata.drivers[4].lastName}
                    driverTeam={testdata.drivers[4].team}
                    driverNumber={testdata.drivers[4].raceNumber}
                    driverFlag={testdata.drivers[4].countryCode}
                    driverImage={driverstats[0].imageMain}
                    imageAlt={driverstats[0].name}
                />
                <DriverCard
                    teamKey={teams[3].key}
                    driverFirstName={testdata.drivers[0].firstName}
                    driverLastName={testdata.drivers[0].lastName}
                    driverTeam={testdata.drivers[0].team}
                    driverNumber={testdata.drivers[0].raceNumber}
                    driverFlag={testdata.drivers[0].countryCode}
                    driverImage={driverstats[2].imageMain}
                    imageAlt={driverstats[2].name}
                />
                <DriverCard
                    teamKey={teams[1].key}
                    driverFirstName={testdata.drivers[2].firstName}
                    driverLastName={testdata.drivers[2].lastName}
                    driverTeam={testdata.drivers[2].team}
                    driverNumber={testdata.drivers[2].raceNumber}
                    driverFlag={testdata.drivers[2].countryCode}
                    driverImage={driverstats[4].imageMain}
                    imageAlt={driverstats[4].name}
                />
                <DriverCard
                    teamKey={teams[2].key}
                    driverFirstName={testdata.drivers[7].firstName}
                    driverLastName={testdata.drivers[7].lastName}
                    driverTeam={testdata.drivers[7].team}
                    driverNumber={testdata.drivers[7].raceNumber}
                    driverFlag={testdata.drivers[7].countryCode}
                    driverImage={driverstats[3].imageMain}
                    imageAlt={driverstats[3].name}
                />
            </section>
        </main>
    )
}

export default Homepage;