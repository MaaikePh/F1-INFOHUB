import './TeamCard.css';

function TeamCard({teamName, teamKey, className}) {
    return (
        <article className={`team-card ${teamKey} ${className || ''}`}>
            <h3>{teamName}</h3>
        </article>
    )
}

export default TeamCard;