import './RaceCard.css';
import { formatDutchRange } from '../../helpers/dateFormatter.js';

function RaceCard({raceName, countryFlag, startDate, endDate, label}) {
    const {start, end} = formatDutchRange(startDate, endDate);

    return (
        <article className='race-card'>
            <i className={`fi fi-${countryFlag} flag-icon`}></i>
            <h2 className='race-card-name'>{raceName}</h2>
            <p>{start} - {end}</p>
        </article>
    )
}

export default RaceCard;