

//http://localhost:3009/Employee

import {useEffect, useState} from "react";
import "./index.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function EmpList(){
    const [data,setData]=useState(null)
    const navigate=useNavigate()
    const [value,setValue]=useState("")
    const option=["name","city","mobile"]
    const [sort,setSort]=useState("")

    useEffect(()=>{
        fetch("https://rest-api-json.onrender.com/Employee")
        .then((res)=>{
             return res.json()
        })
        .then((resp)=>{
            console.log(resp)
            setData(resp)
        })
    },[])
 
    const deleteData = (id) => {
        if (window.confirm("Are you sure to delete the Entry")) {
            fetch("https://rest-api-json.onrender.com/Employee/" + id, {
                method: "DELETE" 
            })
                .then((s) => {
                    alert("Deleted  Successfully")
                    console.log(s)
                    window.location.reload()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const editData=(id)=>{
        navigate("/empedit/"+id)
    }
    const detailsData=(id)=>{
        navigate("/empdetails/"+id)
    }
    const updateUser=(e)=>{
        console.log(e.target.value)
        setValue(e.target.value)
    }
    const searchData=async(e)=>{
        e.preventDefault()
       
     return await axios.get(`https://rest-api-json.onrender.com/Employee?q=${value}`)
     .then((res)=>{
        console.log(res)
        setData(res.data)
        setValue("")
     })
    }
    const loadData=(e)=>{
        e.preventDefault()
        fetch("https://rest-api-json.onrender.com/Employee")
        .then((res)=>{
             return res.json()
        })
        .then((resp)=>{
            console.log(resp)
            setData(resp)
            setValue("")
        })
    }
    const sortData=async (e)=>{
        let value=e.target.value
        console.log(value)
        setSort(value)
        return await axios.get(`https://rest-api-json.onrender.com/Employee?_sort=${value}&_order=asc`)
        .then((res)=>{
            console.log(res)
            setData(res.data)
            setValue("")
        })
    }

    return(
        <div  className="container">
            <div className="card" style={{margintop:"10px"}}>
                <div style={{marginLeft:"10px"}} className="card-title">
                    <h1>Employee Management System</h1>
                </div>
            <div className="card-body">
        <Link  to="/form" className="btn btn-success" style={{marginBottom:"10px"}}>Add New(+)</Link>
        
        <form onSubmit={searchData}>
        <input value={value} onChange={updateUser}  type="text" placeholder="Filter Records" className="form-control" style={{marginBottom:"10px"}} id="exampleInputEmail1" aria-describedby="emailHelp"/>
        <button className="btn btn-primary" type="submit" style={{marginBottom:"10px"}} >Search</button>
        <button onClick={loadData} className="btn btn-danger" style={{marginLeft:"10px",marginBottom:"10px"}}>Reset</button>
        </form>
        <select value={sort} onChange={sortData} style={{marginTop:"10px",marginBottom:"10px"}}>
                    <option >--Select--</option>
                    {option.map((data)=>(
                         <option>{data}</option>
                    ))}
                </select>
        <table className="table table-bordred">
        <thead className="table-dark text-white">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>City</th>
                <th>Mobile</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {data?.map((item)=>(

            <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.city}</td>
                <td>{item.mobile}</td>
                <td >
                <a onClick={()=>deleteData(item.id)} className="btn btn-danger" >Delete</a>
                <a onClick={()=>editData(item.id)} className="btn btn-primary" style={{marginLeft:"10px"}}>Edit</a>
                <a onClick={()=>detailsData(item.id)} className="btn btn-success" style={{marginLeft:"10px"}}>Show Details</a>
                </td>
            </tr>
              ))}
        </tbody>
       </table>
       </div>
       </div>
        </div>
    )
}
export default EmpList;