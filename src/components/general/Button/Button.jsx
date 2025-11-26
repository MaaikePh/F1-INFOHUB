import './Button.css';

function Button({type = "button", buttonStyle = 'primary', children, onClick, disabled, showArrow}) {
    return (
        <button
        type={type}
        className={`btn btn-${buttonStyle}`}
        onClick={onClick}
        disabled={disabled}
        >
            {children}

            {showArrow && (
                <img
                    src='/icons/arrow-button.svg'
                    alt=''
                    className='btn-arrow'
                />
            )}

        </button>
    )
}

export default Button;