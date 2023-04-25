import { createSlice } from "@reduxjs/toolkit";


const DetailsSlice = createSlice({
    name: 'ShowDetails',
    initialState: { show: { city: "Mars", theatre: "PPP", movie: "Iron Man 4", tickets: 4, timings: "10:00am" }, theatre: { seats: 0, NoOfTickets: 0 }, selectedSeats: ['A1', 'A2'], barClass: { bar1: "bar", bar2: "bar", bar3: "bar" } },
    reducers: {

        setShowData: (state, action) => {
            state.show = action.payload;
        }
        ,
        setSeats: (state, action) => {
            state.theatre = action.payload;
        },
        setSelectedSeats: (state, action) => {
            state.selectedSeats = action.payload;
        },
        setBarClass: (state, action) => {
            state.barClass = action.payload
        }
    }
});



export const { setShowData, setSeats, setSelectedSeats, setBarClass } = DetailsSlice.actions
export default DetailsSlice.reducer

