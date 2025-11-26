import './App.css'
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Homepage.jsx'
import Racekalender from './pages/Racekalender/Racekalender.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Inloggen from './pages/Authenticatie/Authenticatie.jsx';
import Detailpage from './pages/CoureurDetail/CoureurDetail.jsx';
import Navigation from './components/general/Navigation/Navigation.jsx';
import Footer from './components/general/Footer/Footer.jsx';
import PrivateRoute from './components/auth-components/PrivateRoute/PrivateRoute.jsx';
import ScrollToTop from './components/general/ScrollToTop/ScrollToTop.jsx';
import EditFavorites from './pages/EditFavorites/EditFavorites.jsx';

function App() {

    return (
        <>
            <Navigation/>
            <ScrollToTop/>

            <main>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/racekalender' element={<Racekalender/>}/>
                    <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
                    <Route path='/voorkeuren' element={<PrivateRoute><EditFavorites/></PrivateRoute>}/>
                    <Route path='/inloggen' element={<Inloggen/>}/>
                    <Route path='/coureur/:id' element={<Detailpage/>}/>
                </Routes>
            </main>


            <Footer/>
        </>
    )
}

export default App;