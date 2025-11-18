import './RaceCard.css';
import {formatDutchRange} from '../../helpers/dateFormatter.js';
import {getRaceStatus} from '../../helpers/raceStatus.js';
import {useState} from 'react';


function RaceCard({raceName, countryFlag, startDate, endDate, positionOne, positionTwo, positionThree}) {
    const [isOpen, setOpen] = useState(false);
    const {start, end} = formatDutchRange(startDate, endDate);
    const status = getRaceStatus(startDate, endDate);
    const hasResults = positionOne && positionTwo && positionThree;

    return (
        <div className='race-card-wrapper'>
            <article className={`race-card ${isOpen ? 'open' : ''}`}>

            <span className={`race-label ${status}`}>
                {status === 'completed' ? 'Voltooid' :
                    status === 'ongoing' ? 'Bezig' : 'gepland'}
            </span>

                <i className={`fi fi-${countryFlag} flag-icon`}></i>
                <h2 className='race-card-name'>{raceName}</h2>
                <p>{start} - {end}</p>

                <img
                    src='/icons/Uitklappijl.svg'
                    alt=''
                    className='race-toggle-icon'
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(prev => !prev);
                    }}
                />

            </article>

            {isOpen && (
                <div className='results-panel'>
                    <h3 className='title'>Raceresultaten</h3>

                    {hasResults ? (
                        <ol className='positions-list'>
                            <li>{positionOne}</li>
                            <li>{positionTwo}</li>
                            <li>{positionThree}</li>
                        </ol>
                    ) : (
                        <p className='no-result'>Nog geen uitslag</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default RaceCard;