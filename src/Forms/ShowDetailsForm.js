import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDataFromDB } from '../Database/Data';
import { setSeats,setShowData,setBarClass } from '../Redux/ShowData';
import Option from '../Components/PickYourShow/Option';
import { useAuth } from '../Components/ContextApi/Auth';
export default function ShowDetailsForm() {
    // let seats=0;
    // Additional Functions
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth=useAuth();
    // const barClass=useSelector((state)=>state.ShowDetails.barClass);
  

    const [data, setData] = useState([])
    const [cities, setCities] = useState([]);
    const [theatre, setTheatre] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);
    const [seats,setSeat]=useState(0);
    const [movies, setMovies] = useState([]);
    const [timings, setTimings] = useState([]);
    const [flag,setFlag]=useState(0);
    const [showDetails, setShowDetails] = useState({
        city: "",
        theatre: "",
        movie: "",
        timings: "",
        tickets: ""
    })

    const TheaterRef = useRef();
    const MovieRef = useRef();
    const TicketRef = useRef();
    const TimeRef = useRef();
    const NextBtnRef = useRef();


    // Moving To Next Page
    const NextPage = () => {
        dispatch(setShowData({showDetails}));
        dispatch(setBarClass({bar1:"bar",bar2:"bar bar-color",bar3:"bar"}));
        auth.navigateStatusTrue('seats');
        navigate('/seats',{replace:true});
    }

    // Get Timings 
    const getShowTime = (e) => {

        let selectedTiming = { ...showDetails };
        selectedTiming.timings = e.target.value;
        // flag=1;
        setFlag(1);
        setShowDetails(selectedTiming)
        // NextBtnRef.current.disabled = true;
    }

    // Get Number of Tickets
    const getNoOfTickets = (e) => {
        let selectNoOfTickets = { ...showDetails };
        selectNoOfTickets.tickets = e.target.value
        setShowDetails(selectNoOfTickets)
        // console.log(movies)
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
        selectedTheater.theatre = e.target.value
        setShowDetails(selectedTheater)
        MovieRef.current.disabled = false;
        setMovies(Object.keys(selectedCity[selectedTheater.theatre].Movies));
        const array=Object.values(selectedCity[selectedTheater.theatre]);
        setSeat(array[1]);
        setTimings(Object.keys(selectedCity[selectedTheater.theatre].Timings))
    }

    //To Get City And its Theatre Information     
    const getCity = (e) => {
        let selectedcity = { ...showDetails };
        selectedcity.city = e.target.value
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
            setCities(data.map((city) => { return city.key }))
        }
        else {
            setData(getDataFromDB("Cities"))
        }
    }, [data])
    return (
        <>
            <form className='show-form' >
                {/* City Dropdown Feilds */}
                <div className='Selection-of-Cities Dropdowns'>

                    <label>
                        City :
                    </label>

                    <select name="city" id="city" onChange={getCity}>

                        <Option Data={cities} type='city' />

                    </select>
                </div>

                {/* Theatre Dropdown Feilds */}
                <div className='Dropdowns'>

                    <label>
                        Theater :
                    </label>

                    <select name="Theater" ref={TheaterRef} onChange={getTheatre} disabled id="Theater">

                        <Option Data={theatre} type='theatre' />

                    </select>
                </div>

                {/* Movies Dropdown Feilds */}
                <div  className='Dropdowns'>

                    <label>
                        Movie :
                    </label>

                    <select name="Movie" ref={MovieRef} onChange={getMovie} disabled id="Movie">

                        <Option Data={movies} type='Movies' />

                    </select>
                </div>
                {/* Tickets Dropdown Feilds */}
                <div  className='Dropdowns'>
                    
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
                <div  className='Dropdowns'>

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
                        <button onClick={NextPage} ref={NextBtnRef}  className='btn show-details-btn' >Next</button>
                }
            
        </>
    )
}
