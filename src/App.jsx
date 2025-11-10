import './App.css'
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Homepage.jsx'
import Racekalender from './pages/Racekalender/Racekalender.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Inloggen from './pages/Authenticatie/Authenticatie.jsx';
import Detailpage from './pages/CoureurDetail/CoureurDetail.jsx';
import Navigation from './components/Navigation/Navigation.jsx';

function App() {

    return (
        <>
            <Navigation/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/racekalender' element={<Racekalender/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/inloggen' element={<Inloggen/>}/>
                <Route path='/coureur/:id' element={<Detailpage/>}/>
            </Routes>
        </>
    )
}

export default App