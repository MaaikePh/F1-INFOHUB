export function getMonthKey(datestring) {
    const date = new Date(datestring);

    return date.toLocaleString('en-US', {month: 'long'}).toLowerCase();
}