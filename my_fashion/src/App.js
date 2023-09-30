import { Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AdmitPannel from './pages/AdmitPanel';
import CreateAccount from './pages/CreateAccount';
import { Home } from './pages/Home';
import Login from './pages/Login';
import Router  from './components/Router';

function App() {
  return (
    <div className="App">
     <Navbar />
     <Router/>
     {/* <AdmitPannel /> */}
    </div>
  );
}

export default App;
