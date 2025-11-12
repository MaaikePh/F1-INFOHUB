import './Homepage.css';
import testdata from '/src/constants/test-api-data.json';

function Homepage() {
    return (
        <main>
            <section>

            </section>
            <section>
                <h1 className="title">
                    F1 coureurs {testdata.season}
                </h1>
            </section>
        </main>
    )
}

export default Homepage;