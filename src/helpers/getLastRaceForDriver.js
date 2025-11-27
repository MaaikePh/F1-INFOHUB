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

    const racesWithDriver = [];

    for (const gp of completed) {

        const mainRace = gp.races?.find(r => r.type === 'MainRace');
        if (!mainRace) continue;

        const results = await hyperaceGet(`/v2/grands-prix/${gp.id}/races/${mainRace.id}/results`, signal)

        const raceResult = results.race?.find(r => r.driverId === driverId);
        if (!raceResult) continue;

        const quali = results.standardQualifying || results.qualifying || [];
        const qualiResult = quali.find(q => q.driverId === driverId);

        racesWithDriver.push({
            grandPrix: gp,
            raceResult,
            qualiResult
        });
    }

    if (racesWithDriver.length === 0) return null;

    racesWithDriver.sort((a, b) => new Date(b.grandPrix.endDate) - new Date(a.grandPrix.endDate));

    const last = racesWithDriver[0];

    return {
        name: last.grandPrix.name,
        date: last.grandPrix.endDate,
        start: last.qualiResult?.position ?? '?',
        finish: last.raceResult?.position ?? '?'
    };
}