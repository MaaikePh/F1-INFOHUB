import './Dashboard.css';
import TeamSummary from '../../components/Dashboard/TeamSummary/TeamSummary.jsx';
import DriverSummary from '../../components/Dashboard/DriverSummary/DriverSummary.jsx';
import EditFavoriteButton from '../../components/Dashboard/EditFavoriteButton/EditFavoriteButton.jsx';

function Dashboard() {
    return (
        <main className='dashboard-page'>
            <h1 className='title'>Persoonlijk Dashboard</h1>
            <div className='dashboard'>
                <section className='dashboard-team-section'>
                    <TeamSummary/>
                    <EditFavoriteButton
                        label='Favoriet team aanpassen'
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
                    />
                </section>
            </div>
        </main>
    )
}

export default Dashboard;