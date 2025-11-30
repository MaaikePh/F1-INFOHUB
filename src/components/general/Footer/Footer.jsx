import './Footer.css';

function Footer() {

    return (
        <footer className='footer'>
            <p>
                &copy; {new Date().getFullYear()} F1 InfoHub. Alle Rechten voorbehouden.
            </p>
        </footer>
    )
}

export default Footer;