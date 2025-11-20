import './TeamCard.css';

function TeamCard({teamName, teamKey, className}) {
    return (
        <article className={`team-card ${teamKey} ${className || ''}`}>
            {teamName}
        </article>
    )
}

export default TeamCard;