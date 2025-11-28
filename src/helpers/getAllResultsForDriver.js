import {hyperaceGet} from './hyperace.js';
import {getRaceStatus} from './raceStatus.js';

export async function getAllResultsForDriver(driverId, signal) {
    if (!driverId) return [];

    const data = await hyperaceGet(
        `/v2/grands-prix?seasonYear=2025&pageSize=25`,
        signal
    );

    const grandsPrix = data.items;
    const resultsForDriver = [];

    for (const gp of grandsPrix) {
        const status = getRaceStatus(gp.startDate, gp.endDate);
        if (status === 'upcoming') continue;

        const raceList = await hyperaceGet(
            `/v2/grands-prix/${gp.id}/races?pageSize=40`,
            signal
        );

        if (!raceList.items?.length) continue;

        const mainRace = raceList.items.find(r => r.type === 'MainRace');

        if (mainRace) {
            const fullResults = await hyperaceGet(
                `/v2/grands-prix/${gp.id}/races/${mainRace.id}/results`,
                signal
            );

            const list = fullResults.items || [];

            console.log(`ULL RESULTS (${gp.name}):`, list);
            console.log(
                'DRIVER UUID’s:',
                list.map(r => r.driverId)
            );

            const result = list.find(r => r.driverId === driverId);

            if (result) {
                resultsForDriver.push({
                    grandPrix: gp.name,
                    type: 'Race',
                    position: result.position,
                    date: gp.endDate,
                });
            }
        }

        const sprintRace =
            raceList.items.find(r =>
                r.type === 'SprintRace' ||
                r.type === 'Sprint'
            );

        if (sprintRace) {
            const sprintResults = await hyperaceGet(
                `/v2/grands-prix/${gp.id}/races/${sprintRace.id}/results`,
                signal
            );

            const list = sprintResults.items || [];
            const sprintResult = list.find(r => r.driverId === driverId);

            if (sprintResult) {
                resultsForDriver.push({
                    grandPrix: gp.name,
                    type: 'Sprint',
                    position: sprintResult.position,
                    date: gp.endDate,
                });
            }
        }

        const qualiRace =
            raceList.items.find(r => r.type === 'StandardQualifying');

        if (qualiRace) {
            const qualiResults = await hyperaceGet(
                `/v2/grands-prix/${gp.id}/races/${qualiRace.id}/results`,
                signal
            );

            const list = qualiResults.items || [];
            const qualiResult = list.find(q => q.driverId === driverId);

            if (qualiResult) {
                resultsForDriver.push({
                    grandPrix: gp.name,
                    type: 'Qualificatie',
                    position: qualiResult.position,
                    date: gp.endDate,
                });
            }
        }
    }

    resultsForDriver.sort((a, b) => new Date(b.date) - new Date(a.date));

    return resultsForDriver;
}