

import React, { useState } from 'react';
import './SellCarPage.css';

const SellCarPage = () => {
  console.log("🚀 Rendering SellCarPage component...");

  // Form fields
  const [carPhoto, setCarPhoto] = useState(null);
  const [carName, setCarName] = useState('');
  const [location, setLocation] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [mileage, setMileage] = useState('');
  const [description, setDescription] = useState('');

  // Submission state
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: '', success: true });

  console.log("📌 Current State:", { carPhoto, carName, location, make, model, mileage, description, loading });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🛠️ Form submission triggered...");

    setLoading(true);
    console.log("⏳ Setting loading state to true...");

    if (!carPhoto) {
      console.log("❌ No car photo selected.");
      setPopup({ show: true, message: '⚠️ Please select an image.', success: false });
      setLoading(false);
      return;
    }

    // Convert image to Base64
    const reader = new FileReader();
    reader.readAsDataURL(carPhoto);
    reader.onload = async () => {
      console.log("📸 Image converted to Base64.");
      const base64Image = reader.result.split(",")[1]; // Remove metadata prefix

      // Correctly format the request body as expected by the Lambda function
      const requestBody = {
        body: JSON.stringify({  // First level of stringification
          body: JSON.stringify({  // Second level of stringification
            image_data: base64Image,
            image_name: carPhoto.name,
            car_name: carName,
            location,
            make,
            model,
            mileage,
            description
          })
        })
      };

      console.log("✅ Corrected Request Body:", requestBody);

      try {
        console.log("🌍 Sending request to API...");
        const response = await fetch("https://cmhth0624c.execute-api.us-east-1.amazonaws.com/dev", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody) // Final stringification before sending
        });

        console.log("🔄 Response received:", response);
        const result = await response.json();
        console.log("📩 Response JSON:", result);

        if (!response.ok) {
          throw new Error(`Submission failed: ${result.error}`);
        }

        setPopup({ show: true, message: '✅ Your car has been submitted successfully!', success: true });
        console.log("🎉 Popup updated with success message.");

        // Reset form fields
        setCarPhoto(null);
        setCarName('');
        setLocation('');
        setMake('');
        setModel('');
        setMileage('');
        setDescription('');
        console.log("🔄 Form fields reset.");
      } catch (error) {
        console.error("❌ Error submitting form:", error);
        setPopup({ show: true, message: '⚠️ There was an error submitting your car. Please try again later.', success: false });
      } finally {
        setLoading(false);
        console.log("⏳ Loading state set to false.");

        // Auto-dismiss popup after 3 seconds
        setTimeout(() => {
          setPopup({ show: false, message: '', success: true });
          console.log("📢 Popup dismissed.");
        }, 3000);
      }
    };
  };

  return (
    <div className="sell-car-page">
      <div className="form-container">
        <h1>Sell Your Car</h1>
        <form onSubmit={handleSubmit} className="sell-car-form">
          <div className="form-group">
            <label>Car Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setCarPhoto(e.target.files[0]);
                console.log("📸 Car photo selected:", e.target.files[0]);
              }}
            />
          </div>
          <div className="form-group">
            <label>Name of the Car</label>
            <input type="text" value={carName} onChange={(e) => setCarName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Make</label>
            <input type="text" value={make} onChange={(e) => setMake(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Model</label>
            <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Mileage</label>
            <input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="5" required />
          </div>
          <button type="submit" className="btn submit-btn" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>
      {popup.show && <div className={`popup ${popup.success ? 'success' : 'error'}`}>{popup.message}</div>}
    </div>
  );
};

export default SellCarPage;
