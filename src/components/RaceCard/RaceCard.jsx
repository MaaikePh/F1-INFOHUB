import './RaceCard.css';
import { formatDutchRange } from '../../helpers/dateFormatter.js';
import {getRaceStatus} from '../../helpers/raceStatus.js';

function RaceCard({raceName, countryFlag, startDate, endDate}) {
    const {start, end} = formatDutchRange(startDate, endDate);
    const status = getRaceStatus(startDate, endDate);

    return (
        <article className='race-card'>
            <span className={`race-label ${status}`}>
                {status === 'completed' ? 'Voltooid' :
                 status === 'ongoing' ? 'Bezig' : 'gepland'}
            </span>

            <i className={`fi fi-${countryFlag} flag-icon`}></i>
            <h2 className='race-card-name'>{raceName}</h2>
            <p>{start} - {end}</p>
        </article>
    )
}

export default RaceCard;