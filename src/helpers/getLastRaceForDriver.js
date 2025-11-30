import {hyperaceGet} from './hyperace.js';

export async function getLastRaceForDriver(driverId, signal) {

    if (!driverId) return null;

    const gpData = await hyperaceGet(`/v2/grands-prix?seasonYear=2025&pageSize=25`, signal);

    const allGPs = gpData.items || [];

    if (allGPs.length === 0) return null;

    const finishedGPs = allGPs.filter(gp => gp.status === 'Finished');

    if (finishedGPs.length === 0) return null;

    const sorted = finishedGPs.sort((a, b) => {
        const endA = a.schedule?.find(s => s.type === 'MainRace')?.endDate;
        const endB = b.schedule?.find(s => s.type === 'MainRace')?.endDate;
        return new Date(endB) - new Date(endA);
    });

    const lastGP = sorted[0];

    const grandPrixId = lastGP.id;

    const raceList = await hyperaceGet(`/v2/grands-prix/${grandPrixId}/races`, signal);

    const races = raceList.items || [];

    const mainRace = races.find(r => r.type === 'MainRace');

    if (!mainRace) return null;

    const raceId = mainRace.id;

    const resultData = await hyperaceGet(
        `/v2/grands-prix/${grandPrixId}/races/${raceId}/results`,
        signal
    );

    const results = resultData.participations || [];

    const resultEntry = results.find(
        r => r.driverId === driverId
    );

    return {
        grandPrix: lastGP.name,
        date: mainRace.endDate || mainRace.date,
        start: resultEntry?.result?.grid ?? null,
        finish: resultEntry?.result?.position ?? null,
    };
}