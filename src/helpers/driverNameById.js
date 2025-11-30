const DRIVER_ID_MAP = {
    '85ff2ae2-e87d-476d-ae15-a6715dd826f2': 'Oscar Piastri',
    'ddd64b72-af61-4995-20e8-08d9161fe7c5': 'Lando Norris',
    '6b0537a9-c218-4077-21d1-08d9161fe7c5': 'Max Verstappen',
    '454112c8-fc48-4bab-21be-08d9161fe7c5': 'Yuki Tsunoda',
    '5d86760d-5842-4ca1-214d-08d9161fe7c5': 'George Russell',
    '966db4a2-daa2-4aaf-ab2f-95783adc599c': 'Kimi Antonelli',
    '475001fd-71ed-4f7e-2077-08d9161fe7c5': 'Charles Leclerc',
    'd5a0947b-fb07-472f-200c-08d9161fe7c5': 'Lewis Hamilton',
    '4b1e9f86-8c8a-4887-2031-08d9161fe7c5': 'Nico Hülkenberg',
    '37061ea2-a468-472b-927f-ce3ffd436d42': 'Gabriel Bortoleto',
    '36dccc49-4405-48b8-954f-a2e2d24d45b3': 'Isack Hadjar',
    '63e3ece6-0d7b-420e-bbb7-e3cde9a300a7': 'Liam Lawson',
    '8a99b5a0-8e1a-4bbc-2155-08d9161fe7c5': 'Carlos Sainz',
    'c0d3f714-9862-48da-1ebd-08d9161fe7c5': 'Alexander Albon',
    '9426b65f-de5d-4e18-2196-08d9161fe7c5': 'Lance Stroll',
    'e78d2503-7af4-4f96-1ec3-08d9161fe7c5': 'Fernando Alonso',
    '000fd83e-709a-4719-bf50-87e1f08cbb20': 'Franco Colapinto',
    'f9f291a5-c9de-432d-1fe1-08d9161fe7c5': 'Pierre Gasly',
    '7c13305f-e644-4cf9-bfd2-fdeb1c8a9e98': 'Oliver Bearman',
    'dd4c7365-725c-4263-20ec-08d9161fe7c5': 'Esteban Ocon'
};

export function getDriverNameById(id) {
    return DRIVER_ID_MAP[id] ?? 'Onbekend';
}