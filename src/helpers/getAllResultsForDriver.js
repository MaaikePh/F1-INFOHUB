import {hyperaceGet} from './hyperace.js';

export async function getAllResultsForDriver(driverId, signal) {
    if (!driverId) {
        return [];
    }

    const gpData = await hyperaceGet(`/v2/grands-prix?seasonYear=2025&pageSize=25`, signal);
    const allGPs = gpData.items || [];

    const finishedGPs = allGPs.filter(gp => gp.status === 'Finished');

    const results = [];

    for (const gp of finishedGPs) {

        const raceList = await hyperaceGet(`/v2/grands-prix/${gp.id}/races`, signal);
        const races = raceList.items || [];

        const mainRace = races.find(r => r.type === 'MainRace');
        const sprintRace = races.find(
            r => r.type === 'SprintRace' || r.type === 'Sprint'
        );

        if (mainRace) {

            const mainData = await hyperaceGet(
                `/v2/grands-prix/${gp.id}/races/${mainRace.id}/results`,
                signal
            );

            const list = mainData.participations || [];

            const entry = list.find(p => p.driverId === driverId);
            if (entry) {

                results.push({
                    grandPrix: gp.name,
                    type: 'Race',
                    position: entry.result?.position ?? null,
                    date: mainRace.endDate || gp.endDate,
                });
            }
        }

        if (sprintRace) {

            const sprintData = await hyperaceGet(
                `/v2/grands-prix/${gp.id}/races/${sprintRace.id}/results`,
                signal
            );

            const list = sprintData.participations || [];

            const entry = list.find(p => p.driverId === driverId);
            if (entry) {

                results.push({
                    grandPrix: gp.name,
                    type: 'Sprint',
                    position: entry.result?.position ?? null,
                    date: sprintRace.endDate || gp.endDate,
                });
            }
        }
    }

    results.sort((a, b) => new Date(b.date) - new Date(a.date));

    return results;
}