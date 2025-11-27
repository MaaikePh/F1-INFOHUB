import './DriverSummary.css';
import driverStats from '../../../constants/driver-stats.json';
import StatsCircle from '../StatsCircle/StatsCircle.jsx';
import LastRaceBox from '../LastRaceBox/LastRaceBox.jsx';
import DriverPhotoCard from '../DriverPhotoCard/DriverPhotoCard.jsx';
import Button from '../../general/Button/Button.jsx';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../../context/AuthContext.jsx';
import {normalize} from '../../../helpers/normalizer.js';
import {Link} from 'react-router-dom';
import {getLastRaceForDriver} from '../../../helpers/getLastRaceForDriver.js';

function DriverSummary() {
    const [lastRace, setLastRace] = useState(null);
    const [raceLoading, setRaceLoading] = useState(true);
    const [raceError, setRaceError] = useState('');
    const {loading, favoriteDriver} = useContext(AuthContext);
    const driverData = driverStats.find(
        d => normalize(d.name) === normalize(favoriteDriver)
    );

    useEffect(() => {
        if (!driverData?.id) return;

        const controller = new AbortController();

        async function loadLastRace() {
            setRaceLoading(true);
            setRaceError('');

            try {
                const result = await getLastRaceForDriver(driverData.id, controller.signal);
                setLastRace(result);
            } catch (error) {
                if (error.name !== 'CanceledError') {
                    console.error(error);
                    setRaceError('Kan laatste race niet ophalen.');
                }
            } finally {
                setRaceLoading(false);
            }
        }

        loadLastRace();

        return () => controller.abort();
    }, [driverData?.id]);

    if (!driverData) {
        return (
            <article className='driver-summary'>
                <h2 className='title-card'>Favoriete Coureur</h2>
                <p className='favorite-label'>Geen coureur gekozen.</p>
            </article>
        )
    }

    const teamData = driverData.team;
    const teamColor = getComputedStyle(document.documentElement)
            .getPropertyValue(teamData.colorVar)
            .trim();

    return (
        <article className='driver-summary' style={{'--team-color': teamColor}}>
            <h2 className='title-card'>{driverData.name}</h2>

            <div className='driver-card-outer-container'>
                <div className='driver-stats'>
                    <div className='driver-position'>
                        <p className='favorite-label'>kampioenschapspositie:</p>
                        <StatsCircle
                            number={driverData.id}
                            color={teamColor}
                            size={100}
                        />
                    </div>

                    <div className='driver-last-race-box'>
                        <LastRaceBox
                            race={lastRace}
                            loading={raceLoading}
                            error={raceError}
                            color={teamColor}
                        />
                    </div>
                </div>

                <div className='driver-photo-container'>
                    <DriverPhotoCard
                        photoUrl={driverData.imageMain}
                        number={driverData.raceNumber}
                        teamColor={teamColor}
                    />
                </div>
            </div>

            <Link to={`/coureur/${driverData.id}`}>
                <Button
                    type='button'
                    buttonStyle='primary'
                    showArrow={!loading}
                    disabled={loading}
                >
                    {loading ? 'Bezig...' : 'Coureurdetails'}
                </Button>
            </Link>

        </article>
    )
}

export default DriverSummary;