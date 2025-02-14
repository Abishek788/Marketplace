

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './find-mechanics.css';

// const FindMechanicsPage = () => {
//   // State to store the array of mechanics, loading status, and errors
//   const [mechanics, setMechanics] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // API endpoint to fetch the mechanics data
//   const API_URL = 'https://wqlgkion88.execute-api.us-east-1.amazonaws.com/dev';

//   useEffect(() => {
//     const fetchMechanics = async () => {
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         // Parse the API response
//         const result = await response.json();
//         // The API returns a nested JSON string; parse it to get the actual data.
//         const data = JSON.parse(result.body);
//         // Ensure that we always work with an array
//         setMechanics(Array.isArray(data) ? data : [data]);
//       } catch (err) {
//         console.error('Fetch error:', err);
//         setError('Error fetching data. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMechanics();
//   }, []);

//   // Header row (used in every state)
//   const renderHeader = () => (
//     <div className="header-row">
//       <h1>Available Mechanics</h1>
//       <Link to="/JoinMechanicPage" className="join-mechanic-btn">
//         <i className="fa fa-screwdriver" aria-hidden="true"></i>
//         Join as Mechanic
//       </Link>
//     </div>
//   );

//   // Render the loading state
//   if (loading) {
//     return (
//       <div className="find-mechanics-container">
//         {renderHeader()}
//         <div className="loading-spinner"></div>
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   // Render the error state
//   if (error) {
//     return (
//       <div className="find-mechanics-container">
//         {renderHeader()}
//         <p className="error">{error}</p>
//       </div>
//     );
//   }

//   // Render when there are no mechanics available
//   if (mechanics.length === 0) {
//     return (
//       <div className="find-mechanics-container">
//         {renderHeader()}
//         <p>No mechanics available at the moment.</p>
//       </div>
//     );
//   }

//   // Render the list of mechanic cards
//   return (
//     <div className="find-mechanics-container">
//       {renderHeader()}
//       <div className="mechanics-list">
//         {mechanics.map((mechanic) => (
//           <div className="mechanic-card" key={mechanic.id}>
//             {mechanic.image_url && (
//               <img 
//                 src={mechanic.image_url} 
//                 alt={mechanic.name || 'Mechanic'} 
//                 className="mechanic-image"
//               />
//             )}
//             <h2>{mechanic.name || 'Unknown Mechanic'}</h2>
//             <p><strong>Location:</strong> {mechanic.location || 'N/A'}</p>
//             <p><strong>Role:</strong> {mechanic.role || 'General Mechanic'}</p>
//             <p>
//               <strong>Experience:</strong>{' '}
//               {mechanic.experience ? `${mechanic.experience} years` : 'N/A'}
//             </p>
//             <button className="btn appointment-btn">Book Appointment</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FindMechanicsPage;import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './find-mechanics.css';

const FindMechanicsPage = () => {
  console.log('Rendering FindMechanicsPage component');

  // State to store the array of mechanics, loading status, and errors
  const [mechanics, setMechanics] = useState([]);
  console.log('Initial mechanics state:', mechanics);
  const [loading, setLoading] = useState(true);
  console.log('Initial loading state:', loading);
  const [error, setError] = useState(null);
  console.log('Initial error state:', error);

  // API endpoint to fetch the mechanics data
  const API_URL = 'https://wqlgkion88.execute-api.us-east-1.amazonaws.com/dev';
  console.log('API URL:', API_URL);

  useEffect(() => {
    console.log('useEffect: Component mounted, starting fetchMechanics');

    const fetchMechanics = async () => {
      console.log('fetchMechanics: Starting fetch process');
      try {
        const response = await fetch(API_URL);
        console.log('fetchMechanics: Response received', response);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse the API response and then the nested JSON string inside the "body" field
        const result = await response.json();
        console.log('fetchMechanics: Result from API:', result);

        const data = JSON.parse(result.body);
        console.log('fetchMechanics: Parsed data:', data);

        // Ensure that we always work with an array
        let mechanicsList;
        if (Array.isArray(data)) {
          mechanicsList = data;
          console.log('fetchMechanics: Data is an array:', mechanicsList);
        } else if (data.mechanics && Array.isArray(data.mechanics)) {
          mechanicsList = data.mechanics;
          console.log('fetchMechanics: Data contains a mechanics array:', mechanicsList);
        } else {
          mechanicsList = [data];
          console.log('fetchMechanics: Data is a single object, converted to array:', mechanicsList);
        }

        setMechanics(mechanicsList);
        console.log('fetchMechanics: Updated mechanics state:', mechanicsList);
      } catch (err) {
        console.error('fetchMechanics: Error fetching data:', err);
        setError('Error fetching data. Please try again later.');
        console.log('fetchMechanics: Updated error state:', err);
      } finally {
        setLoading(false);
        console.log('fetchMechanics: Updated loading state to false');
      }
    };

    fetchMechanics();
  }, [API_URL]);

  // Render the header row
  const renderHeader = () => {
    console.log('renderHeader: Rendering header');
    return (
      <div className="header-row">
        <h1>Available Mechanics</h1>
        <Link to="/JoinMechanicPage" className="join-mechanic-btn">
          <i className="fa fa-screwdriver" aria-hidden="true"></i>
          Join as Mechanic
        </Link>
      </div>
    );
  };

  // Render the loading state
  if (loading) {
    console.log('Rendering: Loading state');
    return (
      <div className="find-mechanics-container">
        {renderHeader()}
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Render the error state
  if (error) {
    console.log('Rendering: Error state', error);
    return (
      <div className="find-mechanics-container">
        {renderHeader()}
        <p className="error">{error}</p>
      </div>
    );
  }

  // Render when there are no mechanics available
  if (mechanics.length === 0) {
    console.log('Rendering: No mechanics available');
    return (
      <div className="find-mechanics-container">
        {renderHeader()}
        <p>No mechanics available at the moment.</p>
      </div>
    );
  }

  // Render the list of mechanic cards
  console.log('Rendering: Mechanics list', mechanics);
  return (
    <div className="find-mechanics-container">
      {renderHeader()}
      <div className="mechanics-list">
        {mechanics.map((mechanic, index) => {
          console.log('Rendering mechanic card:', mechanic);
          return (
            <div className="mechanic-card" key={mechanic.id ? mechanic.id : index}>
              {mechanic.image_url && (
                <img
                  src={mechanic.image_url}
                  alt={mechanic.name || 'Mechanic'}
                  className="mechanic-image"
                />
              )}
              <h2>{mechanic.name || 'Unknown Mechanic'}</h2>
              <p><strong>Location:</strong> {mechanic.location || 'N/A'}</p>
              <p><strong>Role:</strong> {mechanic.role || 'General Mechanic'}</p>
              <p>
                <strong>Experience:</strong> {mechanic.experience ? `${mechanic.experience} years` : 'N/A'}
              </p>
              <button className="btn appointment-btn">Book Appointment</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FindMechanicsPage;
