/* eslint-disable no-unreachable */
import { screen, render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ShowData from '../Redux/ShowData'
import { BrowserRouter } from "react-router-dom";
import Layout from '../Components/Layout';
import App from '../App';

const store = configureStore({
    reducer: {
        ShowDetails: ShowData
    }
})


const Component = () => {
    return (
        <Provider store={store}>
            {/* <BrowserRouter> */}
            <App />
            {/* </BrowserRouter> */}
        </Provider>
    )
}


describe('testing Layout Component', () => {
    test('testing Link elements are present or not', () => {
        render(<Component />);
        const menuItem = screen.getAllByRole('link');
        menuItem.forEach(element => {
            expect(element).toBeVisible();
        });
        fireEvent.click(menuItem[0]);
        const homePage = screen.getByText('Get your Ticket');
        expect(homePage).toBeInTheDocument();
        // fireEvent.click(menuItem[1]);
        // const pickYourShow = screen.getByText('Pick your show');
        // expect(pickYourShow).toBeInTheDocument();

    })
})