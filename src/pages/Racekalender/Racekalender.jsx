import './Racekalender.css';
import RaceCard from '../../components/cards/RaceCard/RaceCard.jsx';
import RaceFilter from '../../components/filters-and-sorting/RaceFilter/RaceFilter.jsx';
import { useEffect, useState } from 'react';
import { hyperaceGet } from '../../helpers/hyperace.js';

function Racekalender() {
    const [allRaces, setAllRaces] = useState([]);
    const [filteredMonth, setFilteredMonth] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        async function loadRaces() {
            setLoading(true);
            setError('');

            try {
                const data = await hyperaceGet(
                    `/v2/grands-prix?seasonYear=2025&pageSize=25`,
                    controller.signal
                );

                const sorted = data.items.sort(
                    (a, b) => new Date(a.startDate) - new Date(b.startDate)
                );

                setAllRaces(sorted);

            } catch (err) {
                if (err.name !== 'CanceledError') {
                    console.error(err);
                    setError('Kon racekalender niet laden.');
                }
            } finally {
                setLoading(false);
            }
        }

        loadRaces();
        return () => controller.abort();

    }, []);

    const visibleRaces = allRaces.filter(gp => {
        if (filteredMonth === 'all') return true;

        const month = new Date(gp.startDate).toLocaleString('en-US', { month: 'long' }).toLowerCase();
        return month === filteredMonth;
    });

    if (loading) {
        return <p className="racekalender-status">Kalender wordt geladen...</p>;
    }

    if (error) {
        return <p className="racekalender-status">{error}</p>;
    }

    return (
        <div className="racekalender-container">
            <h1 className="title">Racekalender {new Date().getFullYear()}</h1>

            <RaceFilter onFilterChange={setFilteredMonth} />

            <div className="race-list">
                {visibleRaces.map(gp => (
                    <RaceCard
                        key={gp.id}
                        raceName={gp.name}
                        countryFlag={gp.countryCode?.toLowerCase()}
                        startDate={gp.startDate}
                        endDate={gp.endDate}
                        positionOne={gp.podium?.[0]?.driverName}
                        positionTwo={gp.podium?.[1]?.driverName}
                        positionThree={gp.podium?.[2]?.driverName}
                    />
                ))}
            </div>
        </div>
    );
}

export default Racekalender;