import './TeamSummary.css';
import TeamCard from '../../cards/TeamCard/TeamCard.jsx';
import StatsCircle from '../StatsCircle/StatsCircle.jsx';
import DriverBadge from '../DriverBadge/DriverBadge.jsx';
import {normalize} from '../../../helpers/normalizer.js';
import {useContext} from 'react';
import {AuthContext} from '../../../context/AuthContext.jsx';
import driverstats from '../../../constants/driver-stats.json'

function TeamSummary() {
    const {favoriteTeam} = useContext(AuthContext);

    const teams = [
        ...new Map(driverstats.map((d) => [d.team.key, d.team]))
    ].map(([, team]) => team);

    const teamData = teams.find((t) => normalize(t.key) === normalize(favoriteTeam));

    if (!teamData) {
        return (
            <article className='team-summary'>
                <h2 className='title-card'>Favoriet team</h2>
                <p className='favorite-label'>Geen team gekozen.</p>
            </article>
        );
    }

    const teamDrivers = driverstats.filter(
        (d) => normalize(d.team.key) === normalize(favoriteTeam)
    );


    const teamColor = getComputedStyle(document.documentElement)
            .getPropertyValue(teamData.colorVar)
            .trim();

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