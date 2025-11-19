const shortOptions = {
    month: 'long',
    day: 'numeric',
};

const longOptions = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
}

export function formatDutchDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString('nl-NL', shortOptions);
}

export function formatDutchRange(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    return {
        start: startDate.toLocaleDateString('nl-NL', shortOptions),
        end: endDate.toLocaleDateString('nl-NL', shortOptions)
    };
}

export function formatBirthDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString('nl-NL', longOptions);
}