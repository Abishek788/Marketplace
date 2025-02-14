// import React, { useState } from 'react';
// import './JoinMechanicPage.css';

// const JoinMechanicPage = () => {
//   // Form field states
//   const [photo, setPhoto] = useState(null);
//   const [name, setName] = useState('');
//   const [location, setLocation] = useState('');
//   const [role, setRole] = useState('');
//   const [experience, setExperience] = useState('');
//   const [description, setDescription] = useState('');

//   // Submission state
//   const [loading, setLoading] = useState(false);
//   const [popup, setPopup] = useState({ show: false, message: '', success: true });

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Build the form data
//     const formData = new FormData();
//     if (photo) formData.append('photo', photo);
//     formData.append('name', name);
//     formData.append('location', location);
//     formData.append('role', role);
//     formData.append('experience', experience);
//     formData.append('description', description);

//     try {
//       const response = await fetch('https://example.com/api/join-mechanic', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Submission failed');
//       }

//       setPopup({ show: true, message: 'Your application has been submitted successfully!', success: true });
//       // Reset form fields
//       setPhoto(null);
//       setName('');
//       setLocation('');
//       setRole('');
//       setExperience('');
//       setDescription('');
//     } catch (error) {
//       setPopup({ show: true, message: 'There was an error submitting your application. Please try again later.', success: false });
//     } finally {
//       setLoading(false);
//       // Auto-dismiss the popup after 3 seconds
//       setTimeout(() => {
//         setPopup({ show: false, message: '', success: true });
//       }, 3000);
//     }
//   };

//   return (
//     <div className="join-mechanic-page">
//       <div className="form-container">
//         <h1>Join as Mechanic</h1>
//         <form onSubmit={handleSubmit} className="join-mechanic-form">
//           <div className="form-group">
//             <label>Upload Photo</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setPhoto(e.target.files[0])}
//             />
//           </div>
//           <div className="form-group">
//             <label>Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Location</label>
//             <input
//               type="text"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Role</label>
//             <input
//               type="text"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Experience (Years)</label>
//             <input
//               type="number"
//               value={experience}
//               onChange={(e) => setExperience(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Description / Certifications</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows="5"
//               required
//             />
//           </div>
//           <button type="submit" className="btn submit-btn" disabled={loading}>
//             {loading ? 'Submitting...' : 'Submit Application'}
//           </button>
//         </form>
//       </div>
//       <div className="info-container">
//         <h2>Why Join Our Team?</h2>
//         <p>
//           Become part of our trusted network of mechanics and unlock a steady flow of work opportunities.
//           Enjoy secure transactions, transparent deals, and ongoing support as you grow your career with us.
//         </p>
//         <img
//           src="https://via.placeholder.com/400x300?text=Join+Our+Team"
//           alt="Join as Mechanic"
//         />
//       </div>
//       {popup.show && (
//         <div className={`popup ${popup.success ? 'success' : 'error'}`}>
//           {popup.message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default JoinMechanicPage;

import React, { useState } from "react";
import "./JoinMechanicPage.css";

const JoinMechanicPage = () => {
  // Form field states
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");

  // Submission state
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    success: true,
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🛠️ Form submission triggered...");
    setLoading(true);

    if (!photo) {
      console.log("❌ No photo selected.");
      setPopup({
        show: true,
        message: "⚠️ Please select an image.",
        success: false,
      });
      setLoading(false);
      return;
    }

    // Convert photo to Base64
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onload = async () => {
      console.log("📸 Image converted to Base64.");
      const base64Image = reader.result.split(",")[1]; // Remove metadata prefix

      // Build the nested request body as expected by the Lambda function
      const requestBody = {
        body: JSON.stringify({
          body: JSON.stringify({
            image_data: base64Image,
            image_name: photo.name,
            name,
            location,
            role,
            experience,
            description,
          }),
        }),
      };

      console.log("✅ Corrected Request Body:", requestBody);

      try {
        console.log("🌍 Sending request to API...");
        const response = await fetch(
          "https://ol0ppx8nnc.execute-api.us-east-1.amazonaws.com/dev",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody), // Final stringification before sending
          }
        );

        console.log("🔄 Response received:", response);
        const result = await response.json();
        console.log("📩 Response JSON:", result);

        if (!response.ok) {
          throw new Error(`Submission failed: ${result.error}`);
        }

        setPopup({
          show: true,
          message: "✅ Your application has been submitted successfully!",
          success: true,
        });
        console.log("🎉 Popup updated with success message.");

        // Reset form fields
        setPhoto(null);
        setName("");
        setLocation("");
        setRole("");
        setExperience("");
        setDescription("");
        console.log("🔄 Form fields reset.");
      } catch (error) {
        console.error("❌ Error submitting form:", error);
        setPopup({
          show: true,
          message:
            "⚠️ There was an error submitting your application. Please try again later.",
          success: false,
        });
      } finally {
        setLoading(false);
        console.log("⏳ Loading state set to false.");
        // Auto-dismiss the popup after 3 seconds
        setTimeout(() => {
          setPopup({ show: false, message: "", success: true });
          console.log("📢 Popup dismissed.");
        }, 3000);
      }
    };
  };

  return (
    <div className="join-mechanic-page">
      <div className="form-container">
        <h1>Join as Mechanic</h1>
        <form onSubmit={handleSubmit} className="join-mechanic-form">
          <div className="form-group">
            <label>Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setPhoto(e.target.files[0]);
                console.log("📸 Photo selected:", e.target.files[0]);
              }}
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Experience (Years)</label>
            <input
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description / Certifications</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              required
            />
          </div>
          <button type="submit" className="btn submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
      <div className="info-container">
        <h2>Why Join Our Team?</h2>
        <p>
          Become part of our trusted network of mechanics and unlock a steady
          flow of work opportunities. Enjoy secure transactions, transparent
          deals, and ongoing support as you grow your career with us.
        </p>
        <img
          src="https://via.placeholder.com/400x300?text=Join+Our+Team"
          alt="Join as Mechanic"
        />
      </div>
      {popup.show && (
        <div className={`popup ${popup.success ? "success" : "error"}`}>
          {popup.message}
        </div>
      )}
    </div>
  );
};

export default JoinMechanicPage;
