import './DriverSummary.css';
import teams from '../../../constants/teams.js';
import testdata from '../../../constants/test-api-data.json';
import driverStats from '/src/constants/driver-stats.json';
import {normalize} from '../../../helpers/normalizer.js';
import StatsCircle from '../StatsCircle/StatsCircle.jsx';
import LastRaceBox from '../LastRaceBox/LastRaceBox.jsx';
import DriverPhotoCard from '../DriverPhotoCard/DriverPhotoCard.jsx';
import Button from '../../general/Button/Button.jsx';
import {useContext} from 'react';
import {AuthContext} from '../../../context/AuthContext.jsx';


function DriverSummary() {
    const {loading, favoriteDriver} = useContext(AuthContext);
    const driverData = testdata.drivers.find((d) => String(d.id) === favoriteDriver);

    if (!driverData) {
        return (
            <article className='driver-summary'>
                <h2 className='title-card'>Favoriete Coureur</h2>
                <p className='favorite-label'>Geen coureur gekozen.</p>
            </article>
        )
    }

    const teamData = teams.find(t => normalize(t.key) === normalize(driverData.team));
    const teamColor = teamData ?
        getComputedStyle(document.documentElement)
            .getPropertyValue(teamData.colorVar)
            .trim()
        : '#ccc';

    const driverPhoto = driverStats.find(s => String(s.id) === favoriteDriver);

    return (
        <article className='driver-summary' style={{'--team-color': teamColor}}>
            <h2 className='title-card'>{driverData.name}</h2>

            <div className='driver-card-outer-container'>
                <div className='driver-stats'>
                    <div className='driver-position'>
                        <p className='favorite-label'>kampioenschapspositie:</p>
                        <StatsCircle number={driverData.id} color={teamColor} size={100}/>
                    </div>

                    <div className='driver-last-race-box'>
                        <LastRaceBox/>
                    </div>
                </div>

                <div className='driver-photo-container'>
                    <DriverPhotoCard
                        photoUrl={driverPhoto.imageMain}
                        number={driverData.raceNumber}
                        color={teamColor}
                    />
                </div>
            </div>

            <div>
                <Button
                    type='button'
                    buttonStyle='primary'
                    showArrow={!loading}
                    disabled={loading}
                >
                    {loading ? 'Bezig...' : 'Coureurdetails'}
                </Button>
            </div>

        </article>
    )
}

export default DriverSummary;