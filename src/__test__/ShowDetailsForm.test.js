import { screen, render } from "@testing-library/react";
import ShowDetailsForm from "../Forms/ShowDetailsForm";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ShowData from "../Redux/ShowData";
import { BrowserRouter } from "react-router-dom";

const store = configureStore({
  reducer: {
    ShowDetails: ShowData
  }
})

const Component = () => {
  return (
    <BrowserRouter>
      <ShowDetailsForm />
    </BrowserRouter>
  )
}
describe('Show Form', () => {
  test.skip('show form Renders Correctly', () => {
    render(<Provider store={store}><Component /></Provider>);
    const City = screen.getByTitle('city');
    const theatre = screen.getByTitle('theatre');
    const movie = screen.getByTitle('movie');
    const ticket = screen.getByTitle('ticket');
    const timings = screen.getByTitle('timings');

    expect (City).toBeInTheDocument();
    expect (theatre).toBeInTheDocument();
    expect (movie).toBeInTheDocument();
    expect (ticket).toBeInTheDocument();
    expect (timings).toBeInTheDocument();
  });

  

})