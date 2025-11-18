const shortOptions = {
    month: 'long',
    day: 'numeric',
};

export function formatDuchDate(dateString) {
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