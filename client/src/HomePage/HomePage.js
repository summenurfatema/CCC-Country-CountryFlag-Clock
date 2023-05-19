import React, { useEffect, useState } from 'react';
import CountryFlag from 'react-country-flag';
import './homepage.css'

function HomePage() {
  const [location, setLocation] = useState({});
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Get the user's current location using the browser's geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          getLocationInfo(latitude, longitude);
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const getLocationInfo = async (latitude, longitude) => {
    try {
      // Fetch the user's location data using a reverse geocoding API
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data = await response.json();
console.log(data);
      // Update the location state with the retrieved data
      setLocation({
        city: data.principalSubdivision,
        country: data.countryName,
        countryCode:data.countryCode,
        
      });
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  useEffect(() => {
    // Get the current time based on the user's timezone
    const userTime = new Date().toLocaleString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });

    // Format the time as hh:mm AM/PM
    const formattedTime = new Date(userTime).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    setCurrentTime(formattedTime);
  }, []);
//https://img.freepik.com/free-vector/abstract-black-circles-layers-dark-background-paper-cut_260559-214.jpg?size=626&ext=jpg&ga=GA1.1.1540219272.1675657721&semt=ais

  return (
    <div className='flex flex-col justify-center items-center space-y-2 pt-20 back-ground bg-cover bg-center relative h-screen' style={{ backgroundImage: `url('https://img.freepik.com/free-vector/abstract-black-circles-layers-dark-background-paper-cut_260559-214.jpg?size=626&ext=jpg&ga=GA1.1.1540219272.1675657721&semt=ais')` }}>
      <h1 className='font-semibold  text-2xl xl:text-5xl glow mb-0 xl:mb-4'>Current Location and Time</h1>
      {location.city && location.country && (
        <div className='flex  justify-between items-center space-x-4'>
          <p className='font-medium glow text-sm xl:text-2xl'>
            Location: {location.city}, {location.country}
          </p>
          {location.countryCode && (
            <p className='font-medium glow text-4xl xl:text-5xl'>
              <CountryFlag  countryCode={location.countryCode} svg className="flag-icon mr-5" />
              
            </p>
          )}
        </div>
      )}
      {currentTime && <p className='font-medium glow text-sm xl:text-2xl'>Current Time: {currentTime}</p>}
    </div>
  );
}

export default HomePage;