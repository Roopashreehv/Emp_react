import { useState,useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"


function EmpEdit(){

    const[id,setId]=useState("")
    const[name,setName]=useState("")
    const[city,setCity]=useState("")
    const[mobile,setMobile]=useState("")
    const navigate=useNavigate("")

    const {empid}=useParams()

    useEffect(()=>{
        fetch("https://rest-api-json.onrender.com/Employee/"+ empid)
        .then((res)=>{
             return res.json()
        })
        .then((resp)=>{ 
           setId(resp.id)
           setName(resp.name)
           setCity(resp.city)
           setMobile(resp.mobile)
        })
    },[])
 

    const sendData=(e)=>{
        e.preventDefault()
        const data={id,name,city,mobile}
        fetch("https://rest-api-json.onrender.com/Employee/"+ empid,{
            method:"PUT",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(data)
        })
        .then(()=>{
            alert("Data Saved")
            navigate("/")
        })
        .catch((err)=>{
            alert("error" +err)
        })
    }

    return(
        <div className="container" style={{width:"500px"}}>
            <h2>Edit Employee Data</h2>
           <form onSubmit={sendData}>
  <div className="mb-3">
    <label className="form-label">ID</label>
    <input value={id} type="text" onChange={e=>setId(e.target.value)} disabled="disable" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Name</label>
    <input value={name}type="text" onChange={e=>setName(e.target.value)}  className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label className="form-label">City</label>
    <input value={city} type="text" onChange={e=>setCity(e.target.value)}  className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Mobile</label>
    <input value={mobile} type="number" onChange={e=>setMobile(e.target.value)} className="form-control" id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="btn btn-primary" style={{margin:"20px"}}>Submit</button>
  <Link to="/" className="btn btn-danger" >Back</Link>
</form>
        </div>
    )
}
export default EmpEdit;