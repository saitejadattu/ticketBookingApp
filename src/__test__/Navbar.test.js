/* eslint-disable no-unreachable */
import { screen, render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ShowData from '../Redux/ShowData';
import { BrowserRouter } from "react-router-dom";
import Navbar from '../Components/Navbar';

const store = configureStore({
    reducer: {
        ShowDetails: ShowData
    }
})


const Component = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        </Provider>
    )
}


describe('testing Navbar Component', () => {
    test('testing Link elements are present or not', () => {
        render(<Component />);
        const menuItem = screen.getAllByRole('link');
        menuItem.forEach(element => {
            expect(element).toBeVisible();
        });

        expect(menuItem.length).toBe(8);
    })
})