import {hyperaceGet} from './hyperace.js';

export async function getAllResultsForDriver(driverId, signal) {
    if (!driverId) {
        console.warn('Geen driverId aan getAllResultsForDriver');
        return [];
    }

    console.log('🚀 Ophalen Race/Sprint resultaten voor driver:', driverId);

    // 1. Alle GP’s voor 2025 ophalen
    const gpData = await hyperaceGet(
        `/v2/grands-prix?seasonYear=2025&pageSize=25`,
        signal
    );

    const allGPs = gpData.items || [];

    if (allGPs.length === 0) {
        console.warn('Geen GP’s voor 2025 gevonden');
        return [];
    }

    const results = [];

    // 2. Loop door elke GP
    for (const gp of allGPs) {
        const gpId = gp.id;

        // Haal races voor deze GP op
        const raceList = await hyperaceGet(
            `/v2/grands-prix/${gpId}/races`,
            signal
        );

        const races = raceList.items || [];

        // We willen ALLEEN MainRace + Sprint
        const relevantRaces = races.filter(
            r => r.type === 'MainRace' || r.type === 'Sprint'
        );

        for (const race of relevantRaces) {
            const raceId = race.id;

            const resultData = await hyperaceGet(
                `/v2/grands-prix/${gpId}/races/${raceId}/results`,
                signal
            );

            const participations = resultData.participations || [];

            const driverEntry = participations.find(p => p.driverId === driverId);

            if (!driverEntry) continue;

            results.push({
                grandPrix: gp.name,
                type: race.type === 'MainRace' ? 'Race' : 'Sprint',
                date: race.endDate || race.date,
                position: driverEntry.result?.position ?? null,
                grid: driverEntry.result?.grid ?? null
            });
        }
    }

    console.log('📦 Resultaten gevonden:', results);
    return results;
}