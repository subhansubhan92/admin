import React, { useEffect, useState } from 'react'
import Navebar from './Navebar'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import axios from 'axios';
import ApiUrl from './ApiUrl';
import { toast } from 'react-toastify';
import { Modal } from 'antd';

function User() {
  const [category,setCategory]=useState([]);
  const [forId,setForId]=useState([]);
  const [preVal,setPreVal]=useState([]);

  useEffect(()=>{
    axios.get(`${ApiUrl}/user/getAll`).then((res)=>{
      setCategory(res.data.data);
    }).catch((error)=>{
      toast.warning(`please check your internet connection`);
    })
  },[]);
  console.log(category,"=======================");
 const sendData =(values)=>{
    const params ={
      id:forId,
      name: values.name.value,
      username:values.email.value,
      password:values.password.value,
    };
    axios.put(`${ApiUrl}/user/update/${forId}`,params).then((res)=>{
      console.log(res.data);
      if(res.data.status==="ok"){
        toast.success('update is created');
        axios.get(`${ApiUrl}/user/getAll`).then((res)=>{
          setCategory(res.data.data);  
     }).catch((error)=>{
      toast.warning(`please check your interest connection`);
     })
      }else{
        toast.error('somthing went wrong');
      }
    })
  .catch((error)=>{
    console.error("Error:",error);
  });}

  // delete
  const onDeleteStudent = (id) =>{
    console.log('==========================',id)
  
    Modal.confirm({
      title:"Are you sure you want to delete?",
      onOk:()=>{
      
        axios.delete(`${ApiUrl}/user/delete/${id}`).then((res)=>{
          if(res.data.status==="ok"){
  
  
  toast.success("user deletd")
  
  axios.get(`${ApiUrl}/user/getAll`).then((res)=>{
    setCategory(res.data.data);  
}).catch((Error)=>{
    console.log('please check your internet connection');
  })
  
          }
        }).catch((Error)=>{
          console.log('please check your internet connection');
        })
  
  
  
  
      }
      })
    }

  return (
   <>
   <Navebar/>
   <div className='container-fluid '>
    <div className='row'>
     <div className='col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 ' >
      <Sidebar/>
     </div>
     <div className='col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 wani' >
      <div className='d-flex justify-content-end'>
     <Link to='/alluser'><button class="button btn btn-primary ms-5 mt-5 me-5 text-end fs-5 text-center rounded" style={{width:"150px"}}>All User</button></Link>
     </div>
<div className='p-4 ' style={{marginTop:"50px"}}>
<table class="table  table-striped  table-hover" style={{border:"1px solid lightgray"}}>
  <thead>
    <tr>
      
      <th scope="col">id</th>
     
      <th scope="col">Name</th>
      <th scope="col">Username</th>
      <th scope="col">Password</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {category?.map((item,index)=>(
      <tr>
        
        <th>{index+1}</th>
       
        <td>{item.name}</td>
        <td>{item.username}</td>
        <td>{item.password}</td>
        <td><span><i class="fa-solid fa-pen me-3 "          onClick={()=>{

setForId(item?.id)
axios.get(`${ApiUrl}/user/get/${item?.id}`).then((res)=>{
  setPreVal(res.data.data);  
}).catch((error)=>{
toast.warning(`please check your interest connection`);
})
        }}   style={{color:"green"}} data-bs-toggle="modal" data-bs-target="#exampleModal"/></span><span> <i class="fa-solid fa-trash" style={{color:"blue"}}    onClick={()=>{

          onDeleteStudent(item?.id)
          
                  }}/></span></td>
      </tr>
    ))}
  </tbody>
</table>
</div>
</div>
    </div>
    </div>   
    {/*  */}
    <div class="modal fade"  id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form  class="row g-3" onSubmit={(e)=>{
              e.preventDefault();
              sendData(e.target);
            }}>
            <div class="col-12">
    <label for="inputAddress" class="form-label">Name</label>
    <input type="text" class="form-control" name="name" defaultValue={preVal.name} placeholder="1234 Main St"/>
  </div>
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Username</label>
    <input type="email" class="form-control" defaultValue={preVal.username} name="email"/>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Password</label>
    <input type="password" class="form-control" defaultValue={preVal.password} name="password"/>
  </div>
 
 
  <div class="col-12">
    <button type="submit" class="btn btn-primary w-100bvcv ">Submit</button>
  </div>
</form>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
   </>
  )
}

export default User