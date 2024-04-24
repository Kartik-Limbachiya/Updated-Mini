import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './AddEdit.css'
import fireDb from "../firebase";
import { toast } from 'react-toastify';

const initialState = {
    name: "",
    designation: "",
    company: "", 
    email: "",
    contact: "",
    location: "",
    pass_year:"",
    linkdin:""
}

const AddEdit = () =>  {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const { name, email, contact, designation, company, location, pass_year, linkdin } = state;


  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    fireDb.child("contacts").on("value", (snapshot) => {
        if(snapshot.val() != null){
            setData({ ...snapshot.val() });
        }
        else{
            setData({});
        }
    });

    return () => {
        setData({});
    };
  }, [id]);

  useEffect(() => {
    if(id){
      setState({...data[id]});
    }
    else{
      setState({...initialState});
    }

    return () => {
      setState({...initialState});
    }
  }, [id, data]);
  // Implementing handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !email || !contact || !location || !pass_year){
        toast.error("Please provide value in each input field");
    }
    else{
        if(!id){
          fireDb.child("contacts").push(state, (err) => {
              if(err){
                  toast.error(err);
              }
              else{
                  toast.success("Contact Added Successfully");
              }
          });
        }
        else{
          fireDb.child(`contacts/${id}`).set(state, (err) => {
              if(err){
                  toast.error(err);
              }
              else{
                  toast.success("Contact Updated successfully");
              }
          });
        }
        setTimeout(() => navigate("/"), 500); // waiting for 0.5 seconds after updating
    }
  }
  // Implementing handleInputChange function
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({ ...state, [name]: value});
  }
  return (
    <div style={{marginTop: "100px"}}>
        <form style={{margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center"}} onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type='text' id="name" name="name" placeholder='Your Name...' value={name || ""} onChange={handleInputChange}/>
            <label htmlFor="designation">Designation</label>
            <input type='text' id="designation" name="designation" placeholder='Your Designation...' value={designation || ""} onChange={handleInputChange}/>
            <label htmlFor="company">Company</label>
            <input type='text' id="company" name="company" placeholder='Your Company...' value={company || ""} onChange={handleInputChange}/>
            <label htmlFor="email">Email</label>
            <input type='email' id="email" name="email" placeholder='Your Email...' value={email || ""} onChange={handleInputChange}/>
            <label htmlFor="contact">Contact</label>
            <input type='number' id="contact" name="contact" placeholder='Your Contact No. ...' value={contact || ""} onChange={handleInputChange}/>
            <label htmlFor="contact">Pass Year</label>
            <input type='number' id="pass_year" name="pass_year" placeholder='Your Pass Year ...' value={pass_year || ""} onChange={handleInputChange}/>
            <label htmlFor="contact">Location</label>
            <input type='text' id="location" name="location" placeholder='Your Location ...' value={location || ""} onChange={handleInputChange}/>
            <label htmlFor="text">Linkdin</label>
            <input type='text' id="linkdin" name="linkdin" placeholder='Your Linkdin id ...' value={linkdin || ""} onChange={handleInputChange}/>
            <input type='submit' value={id ? "Update" : "Save"}/>
        </form>
    </div>
  )
}

export default AddEdit
