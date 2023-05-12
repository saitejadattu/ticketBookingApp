import { screen, render, fireEvent, logRoles } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ShowData from '../Redux/ShowData'
import { BrowserRouter } from "react-router-dom";
import Ticket from "../Components/Ticket/Ticket";
import { RequireTicketAuth } from "../Components/ContextApi/RequireTicketAuth";
const store = configureStore({
    reducer: {
        ShowDetails: ShowData
    }
})


const Component = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Ticket>  </Ticket>
            </BrowserRouter>
        </Provider>
    )
}


describe('Checking the ticket is printed correctly or not', () => {
    test('Ticket Confirm button is present or not', () => {
        const view = render(<Component />);
        // logRoles(view.container);
        let ConfirmBtn = screen.getByRole('button', { name: "Confirm Booking" });
        expect(ConfirmBtn).toBeInTheDocument();
        expect(ConfirmBtn).not.toBeDisabled();

    })

    test('Checking whether ticket Information is printed as per store Data', () => {
        render(<Component />);
        let ticketInfo = screen.getByText('MOVIE 2D : Iron Man');
        expect(ticketInfo).toBeInTheDocument()
    })
    test('testing whether the componet loads left and right part of the ticket', () => {
        render(<Component />);
        let barcodes = screen.getAllByAltText(/BarCode of Ticket/i);
        expect(barcodes.length).toBe(2);
    })

    test('testing the confirm button',()=>
    {
        render(<Component />);
        let ConfirmBtn = screen.getByRole('button',{name:"Confirm Booking"});
        expect(ConfirmBtn).toBeInTheDocument();
        // fireEvent.click(ConfirmBtn);
        // expect(ConfirmBtn).not.toBeInTheDocument();

    })

})
