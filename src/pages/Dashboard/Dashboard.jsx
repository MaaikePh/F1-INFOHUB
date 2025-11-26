import './Dashboard.css';
import TeamSummary from '../../components/Dashboard/TeamSummary/TeamSummary.jsx';
import DriverSummary from '../../components/Dashboard/DriverSummary/DriverSummary.jsx';
import EditFavoriteButton from '../../components/Dashboard/EditFavoriteButton/EditFavoriteButton.jsx';
import {useNavigate} from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className='dashboard-page'>
            <h1 className='title'>Persoonlijk Dashboard</h1>
            <div className='dashboard'>
                <section className='dashboard-team-section'>
                    <TeamSummary/>
                    <EditFavoriteButton
                        label='Favoriet team aanpassen'
                        onClick={() => navigate('/voorkeuren')}
                    />
                </section>

                <img
                    src='/icons/lijn-inlogpagina.svg'
                    alt=''
                    className='dashboard-divider'
                />

                <section className='dashboard-driver-section'>
                    <DriverSummary/>
                    <EditFavoriteButton
                        label='Favoriete coureur aanpassen'
                        onClick={() => navigate('/voorkeuren')}
                    />
                </section>
            </div>
        </div>
    )
}

export default Dashboard;