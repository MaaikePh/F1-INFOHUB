export function normalize(str) {
    if (!str) return '';

    return str
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[^a-z0-9]/g, '');
}