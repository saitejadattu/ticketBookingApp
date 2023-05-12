import { createSlice } from "@reduxjs/toolkit";


const DetailsSlice = createSlice({
    name: 'ShowDetails',
    initialState: { 
        show: { city: "Mars", theatre: "PPP", movie: "Iron Man", tickets: 4, timings: "10:00am" }, 
        theatre: { seats: 200, NoOfTickets: 3 }, 
        selectedSeats: ['A1', 'A2'], 
        barClass: { bar1: "bar", bar2: "bar", bar3: "bar" },
        modal:{class:"display-none"},
        selectedCity:"None",
     },
    reducers: {
        setShowData: (state, action) => {
            state.show = action.payload.showDetails;
        }
        ,
        setSeats: (state, action) => {
            state.theatre = action.payload;
        },
        setSelectedSeats: (state, action) => {
            state.selectedSeats = action.payload;
        },
        setBarClass: (state, action) => {
            state.barClass = action.payload;
        },

        setSelectedCity: (state, action)=>
        {
            state.selectedCity=action.payload;
        },
        openModal : (state,action)=>
        {
            state.modal={class:"modal"}
        },
        closeModal : (state,action)=>
        {
            state.modal={class:"display-none"}
        }
    }
});



export const { setShowData, setSeats, setSelectedSeats, setBarClass,setSelectedCity,openModal,closeModal } = DetailsSlice.actions
export default DetailsSlice.reducer

