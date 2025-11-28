export function isTokenValid(token) {
    if (!token) return false;

    try {
        const payloadBase64 = token.split('.')[1];
        if (!payloadBase64) return false;

        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);

        if (!payload.exp) return false;

        const nowInSeconds = Math.floor(Date.now() / 1000);
        return payload.exp > nowInSeconds;

    } catch (e) {
        console.error('Token kon niet gevalideerd worden:', e);
        return false;
    }
}