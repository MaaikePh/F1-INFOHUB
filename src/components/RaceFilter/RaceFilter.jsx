import './RaceFilter.css';
import {useForm} from 'react-hook-form';

function RaceFilter({onFilterChange}) {
    const {register, watch} = useForm({
        defaultValues: {
        month: 'all'
        }
    });

    const selectedMonth = watch('month');

    function handleMonthChange() {
        onFilterChange(selectedMonth);
    }

    return (
        <form className='race-filter-form'>
            <label htmlFor='month-filter' className='race-filter-label'>
                Filter op maand
            </label>

                <select
                    onChange={handleMonthChange}
                    id='month-filter'
                    {...register('month')}
                    className='race-filter-select'
                    >

                    <option value="all">Kies maand</option>
                    <option value="march">Maart</option>
                    <option value="april">April</option>
                    <option value="may">Mei</option>
                    <option value="june">Juni</option>
                    <option value="july">Juli</option>
                    <option value="august">Augustus</option>
                    <option value="september">September</option>
                    <option value="october">Oktober</option>
                    <option value="november">November</option>
                    <option value="december">December</option>
                </select>
        </form>
    )
}

export default RaceFilter;