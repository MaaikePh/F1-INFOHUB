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
                <TeamSummary />
                <EditFavoriteButton/>
            </section>

            <section className='dashboard-driver-section'>
                <DriverSummary />
                <EditFavoriteButton/>
            </section>
            </div>
        </main>
    )
}

export default Dashboard;