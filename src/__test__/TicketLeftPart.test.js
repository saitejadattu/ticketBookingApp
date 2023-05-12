import { screen, render } from "@testing-library/react";
import TicketLeftPart from "../Components/Ticket/TicketLeftPart";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import ShowData from "../Redux/ShowData";

const store = configureStore({
  reducer: {
    ShowDetails: ShowData
  }
})

describe('Ticket Left Part', () => {
  test('Checking Ticket Left Part details correctly printed or not', () => {
    const view = render(<Provider store={store}><TicketLeftPart /></Provider>);
    const linkElement = screen.queryByText(/Cinema Ticket/i);
    const theater = screen.getByText(/theatre/i);
    const movie = screen.getByText(/movie/i);
    expect(linkElement).toBeInTheDocument();
    expect(theater).toBeInTheDocument();
    expect(movie).toBeInTheDocument();
  })
})