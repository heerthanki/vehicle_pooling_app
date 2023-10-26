import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';
function LoginPage() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      employeeId, // Send the employeeId to the backend
      password,
    };
    try {
      const response = await fetch('http://localhost/myapp/backendnew/employeedata.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
      console.log(password);
      if (data.error) {
        alert(data.error); 
      } else if (data.emp_id === employeeId && password === data.password) {
        navigate('/home'); 
      } else {
        alert('Invalid employee ID or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  return (
    <div className="container"> 
      <h2>Login</h2><br></br>
      <div className="login-box"> 
        <form className="form" onSubmit={handleLogin}>
          <div className="form-column"> 
          <label className="login-label" htmlFor="employeeId">Employee ID:</label>
<input
  className="login-input1" 
  type="text"
  value={employeeId}
  onChange={(e) => setEmployeeId(e.target.value)}
/>

         
            <label className="login-label" htmlFor="password">Password:</label>
            <input
              className="login-input2" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
