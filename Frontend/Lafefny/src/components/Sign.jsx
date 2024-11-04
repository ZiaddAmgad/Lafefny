import React, { useState } from 'react';
import { signUp, signIn } from '../services/signService';
import { useNavigate } from 'react-router-dom';
import '../styles/sign.css';

function Sign() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState('Tourist');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    dateOfBirth: '',
    mobileNumber: '',
    nationality: '',
    job: '',
    role: 'Tourist',
    termsAccepted:false,
  });
  const [showTerms, setShowTerms] = useState(false); // State to control the terms modal
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      termsAccepted: !prevData.termsAccepted,
    }));
  };

  const handleSignUp = () => {
    setIsSignUp(true);
  };

  const handleSignIn = () => {
    setIsSignUp(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const updatedFormData = {
      ...formData,
      role: userType,
    };

    try {
      if (isSignUp) {
        
    if (!formData.termsAccepted) {
      alert("You must accept the terms and conditions to sign up.");
      return;
    }
        const signUpResponse = await signUp(updatedFormData);
        
    if (!formData.termsAccepted) {
      alert("You must accept the terms and conditions to sign up.");
      return;
    }
        alert('Sign up successful! You can now sign in.');
        setIsSignUp(false);

      } else {
        const signInResponse = await signIn(formData.email, formData.password);
        const userRole = signInResponse.role;
        localStorage.setItem('currentUserName', signInResponse.username);
        localStorage.setItem('userID', signInResponse.id);
        
        // Redirect based on the user role
        switch(userRole) {
          case 'Tourist':
            navigate('/touristHome');
            break;
          case 'Seller':
            navigate('/sellerHome');
            break;
          case 'TourGuide':
            navigate('/tourGuideHome');
            break;
          case 'Advertiser':
            navigate('/advertiserHome');
            break;
          case 'Admin':
            navigate('/adminHome');
            break;
          default:
            alert('Invalid role detected');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert(error);
    }
  };

  const toggleTermsModal = () => {
    setShowTerms(!showTerms);
  };

  return (
    <div className="sign">
      <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
      <form onSubmit={handleSubmit}>
        {isSignUp ? (
          <>
            <div>
              <label>User Type: </label>
              <select name="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
                <option value="Tourist">Tourist</option>
                <option value="TourGuide">Tour Guide</option>
                <option value="Advertiser">Advertiser</option>
                <option value="Seller">Seller</option>
              </select>
            </div>

            {/* Common fields */}
            <div>
              <label>Username: </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Email: </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Password: </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Additional fields for Tourist */}
            {userType === 'Tourist' && (
              <>
                <div>
                  <label>Date of Birth: </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Mobile Number: </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Nationality: </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Job: </label>
                  <input
                    type="text"
                    name="job"
                    value={formData.job}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) =>
                  setFormData({ ...formData, termsAccepted: e.target.checked })
                }
              />
              <label style={{ marginLeft: '8px' }}>
                I accept the terms and conditions
              </label>
              <button type="button" onClick={toggleTermsModal} style={{ marginLeft: '10px' }}>
                View Terms
              </button>
            </div>
            <button type="submit">Sign Up</button>
          </>
        ) : (
          <>
            <div>
              <label>Email: </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Password: </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Sign In</button>
          </>
        )}
      </form>

      <div>
        {isSignUp ? (
          <p>
            Already have an account? <button onClick={handleSignIn}>Sign In</button>
          </p>
        ) : (
          <p>
            Don't have an account? <button onClick={handleSignUp}>Sign Up</button>
          </p>
        )}
      </div>

      {/* Terms and Conditions Modal */}
      {showTerms && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleTermsModal}>&times;</span>
            <h2>Terms and Conditions</h2>
            <ol>
              <li><strong>Booking Confirmation:</strong> Your booking will be confirmed once you receive a confirmation email from us.</li>
              <li><strong>Payment:</strong> Full payment must be made at the time of booking unless stated otherwise.</li>
              <li><strong>Cancellation Policy:</strong> Cancellations made within 48 hours of the trip will incur a 100% cancellation fee.</li>
              <li><strong>Changes to Bookings:</strong> Any changes to bookings must be requested via email and are subject to availability.</li>
              <li><strong>Travel Insurance:</strong> We recommend that all travelers obtain comprehensive travel insurance.</li>
              <li><strong>Conduct:</strong> All guests are expected to behave respectfully towards other guests and staff.</li>
              <li><strong>Liability:</strong> Our company is not liable for any injuries, losses, or damages incurred during your trip.</li>
              <li><strong>Governing Law:</strong> These terms are governed by the laws of [Your Country/Region].</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sign;
