import './TeamSummary.css';
import TeamCard from '../../cards/TeamCard/TeamCard.jsx';
import teams from '../../../constants/teams.js';
import testdata from '../../../constants/test-api-data.json';
import StatsCircle from '../StatsCircle/StatsCircle.jsx';
import EditFavoriteButton from '../EditFavoriteButton/EditFavoriteButton.jsx';
import DriverBadge from '../DriverBadge/DriverBadge.jsx';

function TeamSummary() {
    const favoriteTeam = localStorage.getItem('favoriteTeam');
    const teamData = teams.find((t) => t.key === favoriteTeam);

    if (!teamData) {
        return (
            <article className='team-summary'>
                <h2 className='title-card'>Favoriet team</h2>
                <p>Geen team gekozen.</p>
            </article>
        );
    }

    const teamDrivers = testdata.drivers.filter(
        (driver) => favoriteTeam && driver.team.toLowerCase() === favoriteTeam.toLowerCase()
    );
    const teamColor = teamData
        ? getComputedStyle(document.documentElement)
            .getPropertyValue(teamData.colorVar)
            .trim()
        : '#ccc';

    return (
        <article className='team-summary' style={{ '--team-color': teamColor }}>
            <h2 className='title-card'>Favoriet team</h2>

                <TeamCard
                    teamName={teamData?.name || 'Geen team gekozen'}
                    teamKey={teamData?.key}
                    className='team-name-box'
                />

            <div className='team-inner-container'>
                <div className='constructor-position'>
                    <p className='favorite-label'>Constructeurs- kampioenschap positie:</p>
                    <StatsCircle number={teamData.standingsPosition} color={teamColor} size={100}/>
                </div>

                <div className='team-drivers'>
                    {teamDrivers.map((driver) => (
                        <DriverBadge
                            key={driver.id}
                            number={driver.raceNumber}
                            color={teamColor}
                            name={driver.name}
                        />
                    ))}
                </div>

            </div>

        </article>
    )
}

export default TeamSummary;