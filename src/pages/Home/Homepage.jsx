import './Homepage.css';
import driverstats from '../../constants/driver-stats.json'
import TeamCard from '../../components/cards/TeamCard/TeamCard.jsx';
import DriverCard from '../../components/cards/DriverCard/DriverCard.jsx';

function Homepage() {

    const teams = [...new Map(driverstats.map(d => [d.team.key, d.team]))].map(([, team]) => team);

    const drivers = driverstats.map(d => {
        const [firstName, ...rest] = d.name.split(' ');
        const lastName = rest.join(' ');

        return {
            ...d,
            firstName,
            lastName,
        }
    })

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
                F1 coureurs 2025
            </h1>

            <section className='all-drivers-container'>
                {drivers
                    .sort((a, b) => a.id - b.id)
                    .map(driver => (
                        <DriverCard
                            key={driver.id}
                            teamKey={driver.team.key}
                            driverId={driver.id}
                            driverFirstName={driver.firstName}
                            driverLastName={driver.lastName}
                            driverTeam={driver.team.name}
                            driverNumber={driver.raceNumber}
                            driverFlag={driver.countryCode}
                            driverImage={driver.imageMain}
                            imageAlt={driver.name}
                        />
                    ))}
            </section>
        </>
    )
}

export default Homepage;