import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { configureStore } from '@reduxjs/toolkit';
import ShowData from '../Redux/ShowData';
import { AuthProvider } from '../Components/ContextApi/Auth';
import { RequireSeatsAuth } from '../Components/ContextApi/RequireSeatsAuth';
import { RequireTicketAuth } from '../Components/ContextApi/RequireTicketAuth';
import Seats from '../Components/SelectingSeats/Seats';
import Ticket from '../Components/Ticket/Ticket';
import HomePage from '../Pages/HomePage';
import Success from '../Pages/Success';
import Layout from '../Components/Layout';
import Theatre from '../Pages/Theatre';
import NoPage from '../Pages/NoPage';
import PickShow from '../Components/PickYourShow/PickShow';
const store = configureStore({
  reducer: {
    ShowDetails: ShowData
  }
})

const Component = () =>
{
  return (
    <Provider store={store}>
        <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path='theatre' element={<Theatre />} />
              <Route path='pick-show' element={<PickShow />} />
              <Route path="seats" element={<RequireSeatsAuth><Seats /></RequireSeatsAuth>} />
              <Route path="Ticket" element={<RequireTicketAuth><Ticket /></RequireTicketAuth>} />
              <Route path="Success" element={<Success />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  )
}

describe('App Componet', () => {

  test("Rendering App Component", () => {
    render(<Provider store={store}><App /></Provider>);

  })

  test("testing the routing of pages", async () => {
    render(<Provider store={store}><App /></Provider>)
    const home = screen.getByRole('link', { name: "Logo" });
    const nopage = screen.getByAltText('popcorn');
    fireEvent.click(home);
    const homeData = screen.getByAltText('Hyderabad');
    expect(homeData).toBeInTheDocument();
    fireEvent.click(nopage);
    const nodata = screen.getByTestId('id');
    expect(nodata).toBeInTheDocument();

  });

})