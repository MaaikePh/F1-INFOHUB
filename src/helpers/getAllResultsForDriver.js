import { hyperaceGet } from './hyperace.js';
import { getRaceStatus } from './raceStatus.js';

export async function getAllResultsForDriver(driverId, signal) {
    if (!driverId) return [];

    const data = await hyperaceGet(`/v2/grands-prix?seasonYear=2025&pageSize=25`, signal);
    const grandsPrix = data.items;

    const resultsForDriver = [];

    for (const gp of grandsPrix) {
        const status = getRaceStatus(gp.startDate, gp.endDate);

        if (status === "upcoming") continue;
        if (!gp.races) continue;

        for (const race of gp.races) {
            const raceResults = await hyperaceGet(
                `/v2/grands-prix/${gp.id}/races/${race.id}/results`,
                signal
            );

            const raceList = raceResults.race || [];
            const qualiList =
                raceResults.standardQualifying ||
                raceResults.sprintQualifying ||
                [];

            const mainResult = raceList.find(r => r.driverId === driverId);
            if (mainResult) {
                resultsForDriver.push({
                    grandPrix: gp.name,
                    type: race.type === "SprintRace" ? "Sprint" : "Race",
                    position: mainResult.position,
                    date: gp.endDate
                });
            }

            const qualiResult = qualiList.find(q => q.driverId === driverId);
            if (qualiResult) {
                resultsForDriver.push({
                    grandPrix: gp.name,
                    type: "Qualificatie",
                    position: qualiResult.position,
                    date: gp.endDate
                });
            }
        }
    }

    resultsForDriver.sort((a, b) => new Date(b.date) - new Date(a.date));

    return resultsForDriver;
}