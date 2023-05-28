import React,{useState} from 'react'
import{Link, useNavigate} from 'react-router-dom'

export default function  () {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate()
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password:credentials.password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if(!data.success){
        alert("Enter valid credentials");
      }
      if(data.success){
        localStorage.setItem("userEmail",credentials.email)
        localStorage.setItem("authtoken",data.authtoken)
        console.log(localStorage.getItem("authtoken"))
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="exampleInputPassword1"
              onChange={onChange}
            />
          </div>
          
          <button type="submit" className="m-3 btn-primary">
            Submit
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger">
            I'm new user!!
          </Link>
        </form>
      </div>
    </div>
  )
}
