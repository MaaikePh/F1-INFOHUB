import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'flag-icons/css/flag-icons.min.css';
import {BrowserRouter as Router} from 'react-router-dom';
import AuthContextProvider from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
        <Router>
            <AuthContextProvider>
                <App/>
            </AuthContextProvider>
        </Router>,
)