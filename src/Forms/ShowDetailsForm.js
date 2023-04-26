import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import { getDataFromDB } from '../Database/Data';
import { setSeats, setShowData,openModal } from '../Redux/ShowData';
import Option from '../Components/PickYourShow/Option';
import { useAuth } from '../Components/ContextApi/Auth';
import Modal from '../Components/Modal';
export default function ShowDetailsForm() {

    // Additional Functions
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useAuth();
    const homeSelectCity=useSelector((state)=>state.ShowDetails.selectedCity)

   
    const [data, setData] = useState([])
    const [cities, setCities] = useState([]);
    const [theatre, setTheatre] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);
    const [seats, setSeat] = useState(0);
    const [movies, setMovies] = useState([]);
    const [timings, setTimings] = useState([]);
    const [flag, setFlag] = useState(0);
    const [showDetails, setShowDetails] = useState({
        city: "",
        theatre: "",
        movie: "",
        timings: "",
        tickets: ""
    })


    const cityRef = useRef();
    const TheaterRef = useRef();
    const MovieRef = useRef();
    const TicketRef = useRef();
    const TimeRef = useRef();
    const NextBtnRef = useRef();

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
        setShowDetails(selectedTiming) 
    }

    // Get Number of Tickets
    const getNoOfTickets = (e) => {
        let selectNoOfTickets = { ...showDetails };
        selectNoOfTickets.tickets = e.target.value
        setShowDetails(selectNoOfTickets)
        dispatch(setSeats({ seats: seats, NoOfTickets: selectNoOfTickets }));
        TimeRef.current.disabled = false;
    }

    // Get the Selected Movie
    const getMovie = (e) => {
        let selectedMovie = { ...showDetails };
        selectedMovie.movie = e.target.value
        setShowDetails(selectedMovie)
        TicketRef.current.disabled = false;
    }

    // To Get Theatre Infromation 
    const getTheatre = (e) => {
        let selectedTheater = { ...showDetails };
        selectedTheater.theatre = e.target.value;
        if(e.target.value==='None')
        {
            alert("Please proivide Theatre ..");
            return;
        }
        setShowDetails(selectedTheater);
        MovieRef.current.disabled = false;
        setMovies(Object.keys(selectedCity[selectedTheater.theatre].Movies));
        const array = Object.values(selectedCity[selectedTheater.theatre]);
        setSeat(array[1]);
        setTimings(Object.keys(selectedCity[selectedTheater.theatre].Timings))
    }

    //To Get City And its Theatre Information     
    const getCity = (e) => {
        let selectedcity = { ...showDetails };
        selectedcity.city = e.target.value;
        if(e.target.value==='None')
        {
            alert("Please Select a City");
            return;
        }
        setShowDetails(selectedcity)
        TheaterRef.current.disabled = false;
        const foundTheatreDetails = data.find(obj => {
            return obj.key === selectedcity.city;
        });
        setSelectedCity(Object.values(foundTheatreDetails)[1])
        setTheatre(Object.keys(foundTheatreDetails.value));
    }

    const setHomeCity= (city)=>
    {
       console.log(city);
       let selectedcity = { ...showDetails };
       selectedcity.city =city;
       setShowDetails(selectedcity)
        TheaterRef.current.disabled = false;
        const foundTheatreDetails = data.find(obj => {
            return obj.key === selectedcity.city;
        });
        setSelectedCity(Object.values(foundTheatreDetails)[1])
        setTheatre(Object.keys(foundTheatreDetails.value));
    }

    // Getting Data from DB and setting into the state
    useEffect(() => {
        if (data.length) {
            
            if( homeSelectCity!=='None')
            {
                // console.log(homeSelectCity);

                setHomeCity(homeSelectCity);
            }
            setCities(data.map((city) => { return city.key }))
             
        }
        else {
            setData(getDataFromDB("Cities"))
        }
    }, [data]);

    return (
        <>
            <Modal title="Dear User," body="Please provide correct details.." />
            <form className='show-form' >
                {/* City Dropdown Feilds */}
                <div className='Selection-of-Cities Dropdowns'>

                    <label>
                        City :
                    </label>

                    <select ref={cityRef}  name="city" id="city" onChange={getCity}>

                        <Option Data={cities} type='city' selectedHomecity={homeSelectCity} />

                    </select>
                </div>

                {/* Theatre Dropdown Feilds */}
                <div className='Dropdowns'>

                    <label>
                        Theatre :
                    </label>

                    <select name="Theater" ref={TheaterRef} onChange={getTheatre} disabled id="Theater">

                        <Option Data={theatre} type='theatre' />

                    </select>
                </div>

                {/* Movies Dropdown Feilds */}
                <div className='Dropdowns'>

                    <label>
                        Movie :
                    </label>

                    <select name="Movie" ref={MovieRef} onChange={getMovie} disabled id="Movie">

                        <Option Data={movies} type='Movies' />

                    </select>
                </div>
                {/* Tickets Dropdown Feilds */}
                <div className='Dropdowns'>

                    <label>
                        Tickets :
                    </label>

                    <select name="Ticket" ref={TicketRef} onChange={getNoOfTickets} disabled id="Ticket">
                        <option value="None">None</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>

                {/* Timings Dropdown Feilds  */}
                <div className='Dropdowns'>

                    <label>
                        Time :
                    </label>
                    <select name="Time" ref={TimeRef} onChange={getShowTime} disabled id="Time">

                        <Option Data={timings} type='Timings' />

                    </select>
                </div>

                {/* Next Button  */}
                {/* <div>

                    <input type='submit' className='btn'  disabled onClick={NextPage} value='Next' placeholder='' />
                </div> */}

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
