import './Homepage.css';
import testdata from '/src/constants/test-api-data.json';
import TeamCard from '../../components/TeamCard/TeamCard.jsx';
import teams from '../../constants/teams.js';

function Homepage() {
    return (
        <main>
            <section className='all-teams-container'>
                {teams.map(team => (
                    <TeamCard
                    teamName={team.name}
                    teamKey={team.key}
                    />
                ))}

            </section>

            <h1 className="title">
                F1 coureurs {testdata.season}
            </h1>

            <section className='all-drivers-container'>
                <p>-</p>
            </section>
        </main>
    )
}

export default Homepage;