const FLAG_BY_KEYWORD = {
    australian: 'au',
    chinese: 'cn',
    japanese: 'jp',
    bahrain: 'bh',
    'saudi arabian': 'sa',
    miami: 'us',
    'emilia romagna': 'it',
    monaco: 'mc',
    spanish: 'es',
    canadian: 'ca',
    austrian: 'at',
    british: 'gb',
    belgian: 'be',
    hungarian: 'hu',
    dutch: 'nl',
    italian: 'it',
    azerbaijan: 'az',
    singapore: 'sg',
    'united states': 'us',
    mexico: 'mx',
    'são paulo': 'br',
    'sao paulo': 'br',
    'las vegas': 'us',
    qatar: 'qa',
    'abu dhabi': 'ae',
};

export function getFlagCodeForGrandPrix(name) {
    if (!name) return undefined;

    const lower = name.toLowerCase();

    for (const [keyword, flag] of Object.entries(FLAG_BY_KEYWORD)) {
        if (lower.includes(keyword)) {
            return flag;
        }
    }

    return undefined;
}
