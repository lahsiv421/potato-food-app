import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import  Modal  from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './contextreducer';
export default function Navbar(props) {
  const [cartView,setCartView] = useState(false);

  const Navigate = useNavigate();
  const handlLogout = ()=>{  
    localStorage.removeItem("authtoken");
    Navigate("/login")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/">Potato</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">   
          <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
        </li>
        {(localStorage.getItem("authtoken"))?
           <li className="nav-item">   
           <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
         </li>
      :"" }
      </ul> 
      {(!localStorage.getItem("authtoken"))?
      <div className='d-flex'>

          <Link className="btn bg-white text-success mx-1" aria-current="page" to="/Login">Login</Link>

          <Link className="btn bg-white text-success mx-1" aria-current="page" to="/createuser">SignUp</Link>

      </div>
      :
      <div >
      <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>
        Mycart  
        <Badge pill bg = "danger"> 1</Badge>
        </div>
      {cartView? <Modal onClose = {()=> setCartView(false)}><Cart></Cart></Modal>:""}
      <div className='btn bg-white text-danger mx-2' onClick={handlLogout}>
        Logout  
        </div>
        
        
      </div>
      }
        
    </div>
  </div>
</nav>
    </div>
  )
}
