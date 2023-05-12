/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDataFromDB } from '../Database/Data';
import { setSeats, setShowData, openModal } from '../Redux/ShowData';
import Option from '../Components/PickYourShow/Option';
import { useAuth } from '../Components/ContextApi/Auth';
import Modal from '../Components/Modal';
import databaseData from '../Components/PickYourShow/json/databaseData.json'
export default function ShowDetailsForm() {

    // Additional Functions
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useAuth();
    const initialState = {
        city: [],
        selectedCity: [],
        theatre: [],
        movie: [],
        timings: [],
        seats: 0
    };
    const homeSelectCity = useSelector((state) => state.ShowDetails.selectedCity)

    // Reducer function 
    const reducer = (state, action) => {
        switch (action.type) {
            case "city":
                return { ...state, city: state.city = action.payload };
            case "selectedCity":
                return { ...state, selectedCity: state.selectedCity = action.payload };
            case "movie":
                return { ...state, movie: state.movie = action.payload };
            case "theatre":
                return { ...state, theatre: state.theatre = action.payload };
            case "seats":
                return { ...state, seats: state.seats = action.payload };
            case "timings":
                return { ...state, timings: state.timings = action.payload };
            default: console.log("None");
        }
    }


    const [showForm, dispatcher] = useReducer(reducer, initialState);
    const [data, setData] = useState([])
    const [flag, setFlag] = useState(0);
    const [alertMsg, setAlertMsg] = useState({ title: 'Dear User', body: 'Please provide correct details...' });

    const [showDetails, setShowDetails] = useState({
        city: "",
        theatre: "",
        movie: "",
        tickets: "",
        timings: ""
    })


    const cityRef = useRef();
    const TheaterRef = useRef();
    const MovieRef = useRef();
    const TicketRef = useRef();
    const TimeRef = useRef();
    const NextBtnRef = useRef();

    // Checking the Details of the form
    const checkShowDetails = () => {
        if (showDetails.city === 'None') {
            setFlag(0);
            return false;
        }
        else if (showDetails.theatre === 'None') {
            setFlag(0);
            return false;
        }
        else if (showDetails.movie === 'None') {
            setFlag(0);
            return false;
        }
        else if (showDetails.tickets === 'None') {
            setFlag(0);
            return false;
        }
        else if (showDetails.timings === 'None') {
            setFlag(0);
            return false;
        }
        else {
            return true;
        }
    }

    // Moving To Next Page
    const NextPage = () => {

        let check = checkShowDetails();
        if (!check) {
            dispatch(openModal());
            setAlertMsg({ title: "Dear User", body: "Please Provide Correct Details.." });
            return;
        }
        dispatch(setShowData({ showDetails }));
        auth.navigateStatusTrue('seats');
        navigate('/seats', { replace: true });
    }

    // Get Timings 
    const getShowTime = (e) => {

        let selectedTiming = { ...showDetails };
        selectedTiming.timings = e.target.value;
        setFlag(1);
        setShowDetails(selectedTiming);
    }

    // Get Number of Tickets
    const getNoOfTickets = (e) => {
        let selectNoOfTickets = { ...showDetails };
        selectNoOfTickets.tickets = e.target.value
        setShowDetails(selectNoOfTickets)
        dispatch(setSeats({ seats: showForm.seats, NoOfTickets: selectNoOfTickets.tickets }));
        TimeRef.current.disabled = false;
        TimeRef.current.value = 'None';
        setFlag(0);
    }

    // Get the Selected Movie
    const getMovie = (e) => {
        let selectedMovie = { ...showDetails };
        selectedMovie.movie = e.target.value
        setShowDetails(selectedMovie)
        TicketRef.current.disabled = false;
        TicketRef.current.value = 'None';
        TimeRef.current.value = 'None';
        TimeRef.current.disabled = true;
        setFlag(0);
    }

    // To Get Theatre Infromation 
    const getTheatre = (e) => {
        let selectedTheater = { ...showDetails };
        selectedTheater.theatre = e.target.value;
        if (e.target.value === 'None') {
            dispatch(openModal());
            setAlertMsg({ title: "Dear User", body: "Select Valid Theatre.." });
            MovieRef.current.disabled = true;
            MovieRef.current.value = 'None';
            TicketRef.current.value = 'None';
            TimeRef.current.value = 'None';
            TicketRef.current.disabled = true
            TimeRef.current.disabled = true;
            setFlag(0);
            return;
        }

        setShowDetails(selectedTheater);
        MovieRef.current.disabled = false;
        MovieRef.current.value = 'None';
        TicketRef.current.value = 'None';
        TimeRef.current.value = 'None';
        TicketRef.current.disabled = true
        TimeRef.current.disabled = true;
        setFlag(0);
        dispatcher({ type: "movie", payload: Object.keys(showForm.selectedCity[selectedTheater.theatre].Movies) });
        dispatcher({ type: "timings", payload: Object.keys(showForm.selectedCity[selectedTheater.theatre].Timings) })
        const array = Object.values(showForm.selectedCity[selectedTheater.theatre]);
        dispatcher({ type: "seats", payload: array[1] });
    }

    //To Get City And its Theatre Information     
    const getCity = (e) => {
        let selectedcity = { ...showDetails };
        selectedcity.city = e.target.value;
        if (e.target.value === 'None') {
            dispatch(openModal());
            setAlertMsg({ title: "Dear User", body: "Select Valid City.." });
            TheaterRef.current.disabled = true;
            selectedcity.city = 'None';
            TheaterRef.current.value = 'None';
            MovieRef.current.value = 'None';
            MovieRef.current.disabled = true;
            TicketRef.current.value = 'None';
            TicketRef.current.disabled = true;
            TimeRef.current.value = 'None';
            TimeRef.current.disabled = true;
            setFlag(0);
            return;
        }
        setShowDetails(selectedcity)
        TheaterRef.current.disabled = false;
        TheaterRef.current.value = 'None';
        MovieRef.current.value = 'None';
        MovieRef.current.disabled = true;
        TicketRef.current.value = 'None';
        TicketRef.current.disabled = true;
        TimeRef.current.value = 'None';
        TimeRef.current.disabled = true;
        const foundTheatreDetails = data.find(obj => {
            return obj.key === selectedcity.city;
        });
        setFlag(0);
        dispatcher({ type: "selectedCity", payload: Object.values(foundTheatreDetails)[1] })
        // setSelectedCity(Object.values(foundTheatreDetails)[1])
        dispatcher({ type: "theatre", payload: Object.keys(foundTheatreDetails.value) });

        // setTheatre(Object.keys(foundTheatreDetails.value));
    }

    const setHomeCity = (city) => {
        let selectedcity = { ...showDetails };
        selectedcity.city = city;
        setShowDetails(selectedcity)
        TheaterRef.current.disabled = false;
        const foundTheatreDetails = data.find(obj => {
            return obj.key === selectedcity.city;
        });
        dispatcher({ type: "selectedCity", payload: Object.values(foundTheatreDetails)[1] })
        dispatcher({ type: "theatre", payload: Object.keys(foundTheatreDetails.value) });
    }

    // Getting Data from DB and setting into the state
    useEffect(() => {
        if (data.length) {
            if (homeSelectCity !== 'None') {
                setHomeCity(homeSelectCity);
            }
            dispatcher({ type: "city", payload: data.map((city) => { return city.key }) })
        }
        else {
            setData(getDataFromDB("Cities"));
            // setData(databaseData);
        }
    }, [data]);

   

    return (
        
        <>

            {
                data.length!== 0
                ?  <> </>
                : 
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            }
            <Modal title={alertMsg.title} body={alertMsg.body} />
            <form className='show-form' >
                {/* City Dropdown Feilds */}
                <div className='Selection-of-Cities Dropdowns'>

                    <label title='city'>
                        City :
                    </label>

                    <select ref={cityRef} name="city" id="city" onChange={getCity}>

                        <Option Data={showForm.city} type='city' selectedHomecity={homeSelectCity} />

                    </select>
                </div>

                {/* Theatre Dropdown Feilds */}
                <div className='Dropdowns'>

                    <label title='theatre'>
                        Theatre :
                    </label>

                    <select name="Theater" ref={TheaterRef} onChange={getTheatre} disabled id="Theater">

                        <Option Data={showForm.theatre} type='theatre' />

                    </select>
                </div>

                {/* Movies Dropdown Feilds */}
                <div className='Dropdowns'>

                    <label title='movie'>
                        Movie :
                    </label>

                    <select name="Movie" ref={MovieRef} onChange={getMovie} disabled id="Movie">

                        <Option Data={showForm.movie} type='Movies' />

                    </select>
                </div>
                {/* Tickets Dropdown Feilds */}
                <div className='Dropdowns'>

                    <label title='ticket'>
                        Tickets :
                    </label>

                    <select name="Ticket" ref={TicketRef} onChange={getNoOfTickets} disabled id="Ticket">
                        <option value="None" selected disabled hidden>None</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>

                {/* Timings Dropdown Feilds  */}
                <div className='Dropdowns'>

                    <label title='timings'>
                        Time :
                    </label>
                    <select name="Time" ref={TimeRef} onChange={getShowTime} disabled id="Time">

                        <Option Data={showForm.timings} type='Timings' />

                    </select>
                </div>

            </form>
            {/* Next Button  */}
            {
                !flag ?
                    <></>
                    :
                    <button onClick={NextPage} ref={NextBtnRef} className='btn show-details-btn' >Next</button>
            }

        </>
    )
}
