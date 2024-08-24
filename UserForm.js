import React from 'react'
import Navebar from './Navebar'
import Sidebar from './Sidebar'
import axios from 'axios';
import ApiUrl from './ApiUrl';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';


function UserForm() {
  const navigate=useNavigate();
  const sendData=(values)=>{
    const params={
      name:values.name.value,
      username:values.email.value,
      password:values.password.value,
    };
    axios.post(`${ApiUrl}/user/create`,params).then((res)=>{
      console.log(res.data);
      if(res.data.status==="ok"){
        toast.success('user is created');
        navigate("/user")
      }else{
        toast.error('something went wrong')
      }
    })
    .catch((error)=>{
      console.log("Error:",error);
    });
  }
  return (
  <>
  <Navebar/>
  <div className='container-fluid'>
    <div className='row'>
     <div className='col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 ' >
      <Sidebar/>
     </div>
     <div className='col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 wani' >
     <form  class="row g-3  mt-5 p-5" onSubmit={(e)=>{
      e.preventDefault();
      sendData(e.target);
     }} >
            <div class="col-12">
    <label for="inputAddress" class="form-label fw-bold fs-5">Name</label>
    <input type="text" class="form-control"  name="name" placeholder="1234 Main St"/>
  </div>
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label fw-bold fs-5">Username</label>
    <input type="email" class="form-control" name="email"/>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label fw-bold fs-5">Password</label>
    <input type="password" class="form-control"  name="password"/>
  </div>
 
 
  <div class="col-12">
    <button type="submit" class="btn btn-primary w-100bvcv fw-bold w-100 mt-3 fs-5">Submit</button>
  </div>
</form>
</div>
    </div>
    </div>




  
  
  
  </>
  )
}

export default UserForm