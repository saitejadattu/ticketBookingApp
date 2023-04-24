// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout';
import PickShow from './Components/PickYourShow/PickShow';
import Seats from './Components/SelectingSeats/Seats';
import Ticket from './Components/Ticket/Ticket';
import NoPage from './Pages/NoPage';
import HomePage from './Pages/HomePage';
import Success from './Pages/Success';
import { AuthProvider } from './Components/ContextApi/Auth';
import { RequireSeatsAuth } from './Components/ContextApi/RequireSeatsAuth';
import { RequireTicketAuth } from './Components/ContextApi/RequireTicketAuth';
function App() {
  return (
    <div className='App'>
      <AuthProvider>
       <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Layout />}>
          <Route index  element={<HomePage />}/>
          <Route path='pick-show' element={<PickShow />} />
          <Route path="seats" element={ <RequireSeatsAuth><Seats /></RequireSeatsAuth> } />
          <Route path="Ticket" element={<RequireTicketAuth><Ticket /></RequireTicketAuth>} />
          <Route path="Success" element={<Success />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </div>
  );
}

export default App;
