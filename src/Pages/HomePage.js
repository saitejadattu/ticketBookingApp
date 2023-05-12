/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBarClass, setSelectedCity } from '../Redux/ShowData';
import Homepage from '../Assests/HomePage.jpg';
import popcorn from '../Assests/popcorn.jpg';
import theatre from '../Assests/theatre.jpg';
import cooldrinks from '../Assests/cooldrinks.jpg';
import HyderabadLogo from '../Assests/Hyd.png';
import BangaloreLogo from '../Assests/bangaloreLogo.jpg';
import ChennaiLogo from '../Assests/chennai.png';
import KochiLogo from '../Assests/Kochi.jpg';
// import Avengers from '../Assests/Avengers.jpg';

export default function HomePage() {
  const navigate = useNavigate();
  // const barClass=useSelector((state)=>state.ShowDetails.barClass);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBarClass({ bar1: "bar", bar2: "bar", bar3: "bar" }));
  }, [])
  const pickShow = () => {
    navigate('pick-show');
  }

  const selectedCity = (city) => {
    dispatch(setSelectedCity(city));
    navigate('pick-show');
  }

  const navigateToPage = (route) => {
    // window.scrollTo(0, 0);
    navigate(route);
  }
  return (
    <div className='Home-page'>

      <div className='Cities-card'>
        <div className='hyderabad city'>
          <img src={HyderabadLogo} width='200px' height='200px' alt='Hyderabad' onClick={() => selectedCity('Hyderabad')} />
        </div>
        <div className='chennai city'>
          <img src={ChennaiLogo} width='200px' height='200px' alt='Chennai' onClick={() => selectedCity('Chennai')} />
        </div>
        <div className='Bangalore city'>
          <img src={BangaloreLogo} width='200px' height='200px' alt='Bangalore' onClick={() => selectedCity('Bangalore')} />
        </div>
        <div className='Kochi city'>
          <img src={KochiLogo} width='200px' height='200px' alt='Kochi' onClick={() => selectedCity('kochi')} />
        </div>
      </div>

      <div className='workflow'>
        <div>
          <h3>Pick your show </h3>
          <img src={popcorn} onClick={() => navigateToPage('/popcorn')} alt='popcorn' />
        </div>
        <div>
          <h3>Select the seats</h3>
          <img src={cooldrinks} onClick={() => navigateToPage('/cooldrinks')} alt='info' />
        </div>
        <div>
          <h3>Get your Ticket</h3>
          <img src={theatre} onClick={() => navigateToPage('/theatre')} alt='info' />
        </div>
      </div>
      <img onClick={pickShow} src={Homepage} className='Homepage-image' alt='Home Page ' />

    </div>
  )
}
