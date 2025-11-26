import './EditFavoriteButton.css';

function EditFavoriteButton({label, onClick}) {
    return (
        <button
            type='button'
            className='edit-favorite-button'
            onClick={onClick}
        >
            <span className='edit-favorite-button-text'>
                {label}

                <img
                    src='/icons/arrow.svg'
                    alt=''
                    className='edit-favorite-button-arrow'
                />
            </span>

        </button>
    )
}

export default EditFavoriteButton;