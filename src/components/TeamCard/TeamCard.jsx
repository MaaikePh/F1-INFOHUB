import './TeamCard.css';

function TeamCard({teamName, teamKey}) {
    return (
        <article className={`team-card ${teamKey}`}>
            {teamName}
        </article>
    )
}

export default TeamCard;