import {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom"
import "./details.css"

function EmpDetails(){
    const [data,setData]=useState(null)
    const {empid}=useParams()

    useEffect(()=>{
        fetch("https://rest-api-json.onrender.com/Employee/"+empid)
        .then((res)=>{
             return res.json()
        })
        .then((resp)=>{
            console.log(resp)
            setData(resp)
        })
    },[])

    return(
        <div className="container-fluid" >
            <div className="card" style={{width: "25rem"}}>
             {data &&
            <div className="card-body">
            <h5 className="card-title">Emp ID: {data.id} </h5>
            <h5 className="card-title">Emp Name: {data.name} </h5>
            <h5 className="card-title">Emp City: {data.city} </h5>
            <h5 className="card-title">Emp Mobile: {data.mobile} </h5>
            <Link to="/" className="btn btn-danger">Back</Link>      
  </div>
}
</div>
        </div>
    )
}
export default EmpDetails;