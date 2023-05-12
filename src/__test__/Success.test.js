
import { screen, render, fireEvent, logRoles } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ShowData from '../Redux/ShowData'
import { BrowserRouter } from "react-router-dom";
import Success from "../Pages/Success";
const store = configureStore({
    reducer: {
        ShowDetails: ShowData
    }
})


const Component = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Success />
            </BrowserRouter>
        </Provider>
    )
}


describe('testing success page', () => {
    test('testing success page content', () => {
        let view = render(<Component />);
        // logRoles(view.container);
        let successButton = screen.getByRole('button', { name: "click" });
        expect(successButton).toBeInTheDocument();
        expect(successButton).not.toBeDisabled();
        // fireEvent.click(successButton);
        // expect(successButton).toBeInTheDocument();
    })
})