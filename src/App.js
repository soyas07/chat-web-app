import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    );
}

export default App;
