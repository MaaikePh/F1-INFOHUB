export function getRaceStatus(startDate, endDate) {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < now) return 'completed';
    if (start <= now && now <= end) return 'ongoing';
    return 'upcoming';
}