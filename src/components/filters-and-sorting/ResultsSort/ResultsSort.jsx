import './ResultsSort.css';
import {useForm} from 'react-hook-form';
import {useEffect} from 'react';

function ResultsSort({onSortChange}) {
    const {register, watch} = useForm({
        defaultValues: {
            sort: 'date-desc',
        }
    });

    const selectedSort = watch('sort')

    useEffect(() => {
        onSortChange(selectedSort);
    }, [selectedSort, onSortChange]);

    return (
        <div className='results-sort-form'>
            <label htmlFor='sort-filter' className='results-sort-label'>
                Sorteren op
            </label>

            <select
            id='sort-filter'
            {...register('sort')}
            className='results-sort-select'
            >
                <option value='date-desc'>Datum - nieuwste eerst</option>
                <option value='date-asc'>Datum - oudste eerst</option>

            </select>

        </div>
    )
}

export default ResultsSort;