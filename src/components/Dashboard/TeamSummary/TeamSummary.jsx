import './TeamSummary.css';
import TeamCard from '../../cards/TeamCard/TeamCard.jsx';
import teams from '../../../constants/teams.js';
import testdata from '../../../constants/test-api-data.json';
import StatsCircle from '../StatsCircle/StatsCircle.jsx';
import EditFavoriteButton from '../EditFavoriteButton/EditFavoriteButton.jsx';

function TeamSummary() {
    const favoriteTeam = localStorage.getItem('favoriteTeam');
    const teamData = teams.find((t) => t.key === favoriteTeam);
    const teamDrivers = testdata.drivers.filter(
        (driver) => favoriteTeam && driver.team.toLowerCase() === favoriteTeam.toLowerCase()
    );

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
                {/*<StatsCircle number={5}/>*/}
            </div>

            <div className='team-drivers'>
                {teamDrivers.map((driver) => (
                    <div className='driver-box' key={driver.id}>
                        <span className='driver-number'>{driver.raceNumber}</span>
                        <span>{driver.name}</span>
                    </div>
                ))}
            </div>

            {/*<EditFavoriteButton/>*/}

        </article>
    )
}

export default TeamSummary;