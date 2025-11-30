import './ResultsFilter.css';
import {useForm} from 'react-hook-form';
import {useEffect} from 'react';

function ResultsFilter({onFilterChange}) {
    const {register, watch} = useForm({
        defaultValues: {
            type: 'all'
        }
    });

    const selectedType = watch('type');

    useEffect(() => {
        onFilterChange(selectedType);
    }, [selectedType, onFilterChange]);

    return (
        <div className='results-filter-form'>
            <label htmlFor='type-filter' className='results-filter-label'>
                Filteren op
            </label>

            <select
                id='type-filter'
                {...register('type')}
                className='results-filter-select'
            >
                <option value='all'>Type resultaat</option>
                <option value='Race'>Race</option>
                <option value='Sprint'>Sprint</option>
            </select>

        </div>
    )
}

export default ResultsFilter;