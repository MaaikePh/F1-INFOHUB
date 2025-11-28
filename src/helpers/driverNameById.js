
const DRIVER_ID_MAP = {
    '85ff2ae2-e87d-476d-ae15-a6715dd826f2': 'Oscar Piastri',
    'ddd64b72-af61-4995-20e8-08d9161fe7c5': 'Lando Norris',
    '6b0537a9-c218-4077-21d1-08d9161fe7c5': 'Max Verstappen',

    '5d86760d-5842-4ca1-214d-08d9161fe7c5': 'George Russell',
    '475001fd-71ed-4f7e-2077-08d9161fe7c5': 'Charles Leclerc',
    '966db4a2-daa2-4aaf-ab2f-95783adc599c': 'Kimi Antonelli',
    '4b1e9f86-8c8a-4887-2031-08d9161fe7c5': 'Nico Hülkenberg',
    '36dccc49-4405-48b8-954f-a2e2d24d45b3': 'Isack Hadjar',
    '8a99b5a0-8e1a-4bbc-2155-08d9161fe7c5': 'Carlos Sainz',
};

export function getDriverNameById(id) {
    return DRIVER_ID_MAP[id] ?? "Onbekend";
}