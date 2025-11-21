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
                <h2 className='title'>Favoriet team</h2>
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
        <article className='team-summary'>
            <h2 className='title'>Favoriet team</h2>

                <TeamCard
                    teamName={teamData?.name || 'Geen team gekozen'}
                    teamKey={teamData?.key}
                    className='team-name-box'
                />

            <div className='constructor-position'>
                <p>Constructeurskampioenschap positie:</p>
                <StatsCircle number={teamData.standingsPosition} color={teamColor}/>
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

            {/*<EditFavoriteButton/>*/}

        </article>
    )
}

export default TeamSummary;