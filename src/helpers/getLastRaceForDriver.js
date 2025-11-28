import {hyperaceGet} from './hyperace.js';
import {getRaceStatus} from './raceStatus.js';

export async function getLastRaceForDriver(driverId, signal) {
    if (!driverId) return null;

    const data = await hyperaceGet(`/v2/grands-prix?seasonYear=2025&pageSize=25`, signal)
    const allGrandsPrix = data.items;

    const completed = allGrandsPrix.filter(
        gp => getRaceStatus(gp.startDate, gp.endDate) === 'completed'
    );

    if (completed.length === 0) return null;

    const results = [];

    for (const gp of completed) {

        const raceList = await hyperaceGet(
            `/v2/grands-prix/${gp.id}/races?pageSize=40`,
            signal
        );

        if (!raceList.items?.length) continue;

        const mainRace = raceList.items.find(r => r.type === 'MainRace');
        if (!mainRace) continue;

        const qualiRace =
            raceList.items.find(r => r.type === 'StandardQualifying');

        const fullResults = await hyperaceGet(
            `/v2/grands-prix/${gp.id}/races/${mainRace.id}/results`,
            signal
        );

        const mainList = fullResults.items || [];
        const raceResult = mainList.find(r => r.driverId === driverId);
        if (!raceResult) continue;

        let startPos = '?';

        if (qualiRace) {
            const qualiResults = await hyperaceGet(
                `/v2/grands-prix/${gp.id}/races/${qualiRace.id}/results`,
                signal
            );

            const qualiList = qualiResults.items || [];
            const qualiResult = qualiList.find(q => q.driverId === driverId);

            if (qualiResult) {
                startPos = qualiResult.position;
            }
        }

        results.push({
            grandPrix: gp.name,
            date: gp.endDate,
            start: startPos,
            finish: raceResult.position
        });
    }

    if (results.length === 0) return null;

    results.sort((a, b) => new Date(b.date) - new Date(a.date));

    return results[0];
}