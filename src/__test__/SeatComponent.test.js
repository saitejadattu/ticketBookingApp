import { screen, render, fireEvent, logRoles } from "@testing-library/react";
import SeatComponent from "../Components/SelectingSeats/SeatComponent";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ShowData from "../Redux/ShowData";
import { BrowserRouter } from "react-router-dom";
import ForumSeats from '../Components/SelectingSeats/JsonData/ForumSeats.json';
import InoxSeats from '../Components/SelectingSeats/JsonData/InoxSeats.json'
const store = configureStore({
    reducer: {
        ShowDetails: ShowData
    }
})
let seatID = [];
let blockedSeats = ['A1', 'A2', 'B1', 'B2', 'B3', 'B4', 'B5', 'C5', 'C8', 'C0', 'F0', 'F5', 'F3', 'F9','D1','D2','D4','D5','D7','D8','D0'];
blockedSeats.sort();
const seatDesign = () => {
    for (let i = 0; i < ForumSeats.length; i++) {
      let Blocked = 1;
      for (let j = 0; j < blockedSeats.length; j++) {
        if (ForumSeats[i].seatId === blockedSeats[j]) {
          Blocked = 0;
          break;
        }
      }
      seatID.push({ SeatNo: ForumSeats[i].seatId, Blocked: Blocked ,seatPrice:ForumSeats[i].PRICE})

    }

  }
seatDesign()

const Component = () => {
    return (
        <BrowserRouter>
            <SeatComponent seatID={seatID} freezeState={freezeState} blockedSeats={['A1','A4']} setUserSeatSelection={[]} setFreezeState={[]} noOfSeats={noOfSeats} noOfTickets={3} noOfRows={5} />
        </BrowserRouter>
    )
}
const freezeState = ({ msg: 'Select and Freeze the seats', class: "color-red" });

const noOfSeats = 300;


describe('testing Seats Component', () => {
    test('testing the freeze button', () => {
        render(<Provider store={store}><Component /></Provider>);
        const freezeBtn = screen.getByText('Freeze Now');
        expect(freezeBtn).toBeInTheDocument();

    })
    describe('Change Button', () => {
        test('testing the Change button', () => {
            render(<Provider store={store}><Component /></Provider>);
            const changeBtn = screen.getByText('Change Seats');
            expect(changeBtn).toBeInTheDocument();
        })
    })

    test('testing whether the seats are clickable or not',()=>
    {
        let view = render(<Provider store={store} ><Component /></Provider>)
        const blockedCheckboxes = screen.getAllByPlaceholderText('Blocked seats');
        const changeBtn = screen.getByRole('button',{name:"Change Seats"});

        const enabledCheckboxes = screen.getAllByPlaceholderText('enabled seats');

        enabledCheckboxes.forEach(element => {
            expect(element).not.toBeDisabled();
            
        });

        blockedCheckboxes.forEach(element => {
            expect(element).toBeDisabled();
        });

    })



})