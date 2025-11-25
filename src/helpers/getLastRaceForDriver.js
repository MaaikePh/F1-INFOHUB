import testdata from '../constants/test-api-data.json';

export function getLastRaceForDriver(driverName) {
    if (!driverName) return null;

    const completedRaces = testdata.races
        .filter(race => race.results?.race?.some(res => res.driver === driverName))

    if (completedRaces.length === 0) return null;

    completedRaces.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

    const lastRace = completedRaces[0];

    const raceResult = lastRace.results.race.find(res => res.driver === driverName);
    const qualifyingResult = lastRace.results.qualifying?.find(q => q.driver === driverName);

    return {
        name: lastRace.name,
        date: lastRace.endDate,
        start: qualifyingResult?.position ?? '?',
        finish: raceResult?.position ?? '?',
    }
}