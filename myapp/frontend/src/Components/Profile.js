import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { RiArrowLeftLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import profileImage from "./profile.jpg";
function Profile() {
  const [userProfile, setUserProfile] = useState({
    emp_id: "",
    emp_name: "",
    emp_email: "",
    emp_contact: "",
    dob: null,
    age: "",
    emp_address: "",
    emp_dept: "",
    emp_design: "",
    vehicleDetails: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showVehicleDetails, setShowVehicleDetails] = useState(false);
  useEffect(() => {
    fetch("http://localhost/myapp/backendnew/employeedata.php")
      .then((response) => response.json())
      .then((data) => {
        setUserProfile(data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  const [calculatedAge, setCalculatedAge] = useState(
    calculateAge(userProfile.dob)
  );

  useEffect(() => {
    setCalculatedAge(calculateAge(userProfile.dob));
  }, [userProfile.dob]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

  const handleAddVehicle = () => {
    setUserProfile({
      ...userProfile,
      vehicleDetails: [
        ...userProfile.vehicleDetails,
        {
          vehicleType: "Car",
          vehicleNumber: "",
        },
      ],
    });
  };

  const handleRemoveVehicle = (index) => {
    const updatedVehicleDetails = [...userProfile.vehicleDetails];
    updatedVehicleDetails.splice(index, 1);
    setUserProfile({
      ...userProfile,
      vehicleDetails: updatedVehicleDetails,
    });
  };

  const toggleVehicleDetails = () => {
    setShowVehicleDetails(!showVehicleDetails);
  };

const handleSave = () => {
  // Create an object with the updated user profile data
  const updatedProfileData = {
    emp_id: userProfile.emp_id,
    emp_email: userProfile.emp_email,
    emp_contact: userProfile.emp_contact,
    emp_address: userProfile.emp_address,
    emp_dept: userProfile.emp_dept,
    emp_design: userProfile.emp_design,
    Institute: userProfile.Institute,
  };

  fetch('http://localhost/myapp/backendnew/updateProfile.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProfileData),
  })
    .then((response) => {
      if (!response.ok) {
        // Handle non-OK responses by reading the HTML error message
        return response.text().then((errorMessage) => {
          throw new Error(`Server error: ${errorMessage}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log('Profile updated successfully:', data);
      setIsEditing(true);
    })
    .catch((error) => {
      console.error('Error updating profile:', error.message);
      // Display the error message to the user or handle it as needed.
    });
};

  
  
  return (
    <div className="profile-container">
      <div className="profile-header">
        <Link to="/home">
          <RiArrowLeftLine />
        </Link>
        <h2>My Profile</h2>
        {isEditing ? (
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
      <div className="profile-content">
        <div className="profile-image-container">
          <img src={profileImage} alt="Profile" className="profile-image" />
        </div>
        <div className="profile-info">
          <label>Employee ID:</label>
            <p>{userProfile.emp_id}</p>
          <label>Name:</label>
            <p>{userProfile.emp_name}</p>
          <label>Email:</label>
          {isEditing ? (
            <input
              type="text"
              name="email"
              value={userProfile.email}
              onChange={handleProfileChange}
            />
          ) : (
            <p>{userProfile.emp_email}</p>
          )}

          <label>Contact:</label>
          
{isEditing ? (
  <input
    type="text"
    name="contact"
    value={userProfile.emp_contact}
    onChange={handleProfileChange}
  />
) : (
  <p>{userProfile.emp_contact}</p>
)}
       <label>Date of Birth:</label>

  <p>
    {userProfile.dob
      ? new Date(userProfile.dob).toLocaleDateString("en-GB")
      : ""}
  </p>
          <label>Age:</label>
            <p>{calculatedAge}</p>

          <label>Address:</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={userProfile.emp_address}
              onChange={handleProfileChange}
            />
          ) : (
            <p>{userProfile.emp_address}</p>
          )}
          <label>Organization:</label>
            <p>{userProfile.Organization}</p>
            <label>Institute:</label>
          {isEditing ? (
            <input
              type="text"
              name="institute"
              value={userProfile.Institute}
              onChange={handleProfileChange}
            />
          ) : (
            <p>{userProfile.Institute}</p>
          )}
          <label>Department:</label>
          {isEditing ? (
            <input
              type="text"
              name="department"
              value={userProfile.emp_dept}
              onChange={handleProfileChange}
            />
          ) : (
            <p>{userProfile.emp_dept}</p>
          )}

          <label>Designation:</label>
          {isEditing ? (
            <input
              type="text"
              name="designation"
              value={userProfile.emp_desig}
              onChange={handleProfileChange}
            />
          ) : (
            <p>{userProfile.emp_desig}</p>
          )}

          {showVehicleDetails && (
            <div>
              {userProfile.vehicleDetails.map((vehicle, index) => (
                <div key={index} className="vehicle-details">
                  <h3>Vehicle Details</h3>
                  <label>Vehicle Type:</label>
                  {isEditing ? (
                    <select
                      name={`vehicleDetails[${index}].vehicleType`}
                      value={vehicle.vehicleType}
                      onChange={handleProfileChange}
                    >
                      <option value="Car">Car</option>
                      <option value="Two-wheeler">Two-wheeler</option>
                    </select>
                  ) : (
                    <p>{vehicle.vehicleType}</p>
                  )}

                  <label>Vehicle Number:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name={`vehicleDetails[${index}].vehicleNumber`}
                      value={vehicle.vehicleNumber}
                      onChange={handleProfileChange}
                    />
                  ) : (
                    <p>{vehicle.vehicleNumber}</p>
                  )}

                  {isEditing && (
                    <button
                      className="remove-vehicle-button"
                      onClick={() => handleRemoveVehicle(index)}
                    >
                      Remove Vehicle
                    </button>
                  )}
                </div>
              ))}

              {isEditing && (
                <button
                  className="add-vehicle-button"
                  onClick={handleAddVehicle}
                >
                  Add Vehicle
                </button>
              )}
            </div>
          )}
          <button
            className="toggle-vehicle-button"
            onClick={toggleVehicleDetails}
          >
            {showVehicleDetails
              ? "Hide Vehicle Details"
              : "Show Vehicle Details"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
