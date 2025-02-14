// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './browse-cars.css';

// const BrowseCarsPage = () => {
//     // State to store the array of cars, loading status, and errors
//     const [cars, setCars] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // API endpoint to fetch the car data
//     const API_URL = 'https://z6v8cj54xi.execute-api.us-east-1.amazonaws.com/dev';

//     useEffect(() => {
//         const fetchCars = async () => {
//             try {
//                 const response = await fetch(API_URL);
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 // Parse the API response
//                 const result = await response.json();
//                 const data = JSON.parse(result.body);
//                 // Ensure that we always work with an array
//                 setCars(Array.isArray(data) ? data : [data]);
//             } catch (err) {
//                 console.error('Fetch error:', err);
//                 setError('Error fetching data. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCars();
//     }, []);

//     // Render the loading state
//     if (loading) {
//         return (
//             <div className="browse-cars-container">
//                 <div className="header-row">
//                     <h1>Cars Marketplace</h1>
//                     <Link to="/SellCarPage" className="sell-trade-btn">List Your Car</Link>
//                 </div>
//                 <div className="loading-spinner"></div>
//                 <p>Loading...</p>
//             </div>
//         );
//     }

//     // Render the error state
//     if (error) {
//         return (
//             <div className="browse-cars-container">
//                 <div className="header-row">
//                     <h1>Cars Marketplace</h1>
//                     <Link to="/SellCarPage" className="sell-trade-btn">List Your Car</Link>
//                 </div>
//                 <p className="error">{error}</p>
//             </div>
//         );
//     }

//     // Render when there are no cars available
//     if (cars.length === 0) {
//         return (
//             <div className="browse-cars-container">
//                 <div className="header-row">
//                     <h1>Cars Marketplace</h1>
//                     <Link to="/SellCarPage" className="sell-trade-btn">List Your Car</Link>
//                 </div>
//                 <p>No cars available at the moment.</p>
//             </div>
//         );
//     }

//     // Render the list of car cards
//     return (
//         <div className="browse-cars-container">
//             <div className="header-row">
//                 <h1>Cars Marketplace</h1>
//                 <Link to="/SellCarPage" className="sell-trade-btn">List Your Car</Link>
//             </div>
//             <div className="car-list">
//                 {cars.map((car) => (
//                     <div className="car-card" key={car.id}>
//                         <h2>{car.Carname || 'Unknown Model'}</h2>
//                         <p><strong>ID:</strong> {car.id}</p>
//                         <p><strong>Location:</strong> {car.Location || 'N/A'}</p>
//                         <p><strong>Price:</strong> ${car.Price || 'N/A'}</p>
//                         <p><strong>Year:</strong> {car.year || 'N/A'}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default BrowseCarsPage;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './browse-cars.css';

const BrowseCarsPage = () => {
  // State to store the array of cars, loading status, and errors
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API endpoint to fetch the car data
  const API_URL = 'https://2pen20hh3j.execute-api.us-east-1.amazonaws.com/dev';

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Parse the API response and then the nested JSON string inside the "body" field
        const result = await response.json();
        const data = JSON.parse(result.body);
        // Ensure that we always work with an array
        setCars(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Render the header row
  const renderHeader = () => (
    <div className="header-row">
      <h1>Cars Marketplace</h1>
      <Link to="/SellCarPage" className="sell-trade-btn">
        List Your Car
      </Link>
    </div>
  );

  // Render the loading state
  if (loading) {
    return (
      <div className="browse-cars-container">
        {renderHeader()}
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Render the error state
  if (error) {
    return (
      <div className="browse-cars-container">
        {renderHeader()}
        <p className="error">{error}</p>
      </div>
    );
  }

  // Render when there are no cars available
  if (cars.length === 0) {
    return (
      <div className="browse-cars-container">
        {renderHeader()}
        <p>No cars available at the moment.</p>
      </div>
    );
  }

  // Render the list of car cards
  return (
    <div className="browse-cars-container">
      {renderHeader()}
      <div className="car-list">
        {cars.map((car) => (
          <div className="car-card" key={car.id}>
            {car.image_url && (
              <img
                src={car.image_url}
                alt={car.car_name || 'Car Image'}
                className="car-image"
              />
            )}
            <h2>{car.car_name || 'Unknown Model'}</h2>
            <p><strong>Location:</strong> {car.location || 'N/A'}</p>
            <p><strong>Make:</strong> {car.make || 'N/A'}</p>
            <p><strong>Model:</strong> {car.model || 'N/A'}</p>
            <p><strong>Mileage:</strong> {car.mileage || 'N/A'}</p>
            {car.description && <p><strong>Description:</strong> {car.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseCarsPage;
