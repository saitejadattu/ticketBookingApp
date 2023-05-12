/* eslint-disable no-unreachable */
import { screen, render, fireEvent } from "@testing-library/react";
import HomePage from "../Pages/HomePage";
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
            <HomePage />
        </BrowserRouter>
    )
}
describe('Homepage Testing', () => {
    test('testing whether cities Images are Loading or not', () => {
        render(<Provider store={store}> <Component /></Provider>)
        const imgElement = screen.getAllByRole('img');
        // To Load All Images 
        expect(imgElement.length).toBe(8);

    })

    test('testing whether the city images are loaded', () => {
        render(<Provider store={store}> <Component /></Provider>)
        const hyd = screen.getByAltText('Hyderabad');
        const bang = screen.getByAltText('Bangalore');
        const chennai = screen.getByAltText('Chennai');
        const kochi = screen.getByAltText('Kochi');
        expect(hyd).toBeTruthy();
        expect(bang).toBeTruthy();
        expect(chennai).toBeTruthy();
        expect(kochi).toBeTruthy();
    })


})