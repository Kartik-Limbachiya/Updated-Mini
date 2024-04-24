import React, { useState, useEffect } from 'react';
import fireDb from "../firebase";
import { useParams, Link } from 'react-router-dom';
import "./View.css"

const View = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  // using useEffect on specific id
  useEffect(() => {
    fireDb.child(`contacts/${id}`).get().then((snapshot) => {
      if (snapshot.exists()) {
        setUser({ ...snapshot.val() });
      }
      else {
        setUser({});
      }
    });
  }, [id]);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>User Contact Detail</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name: </strong>
          <span>{user.name}</span>
          <br />
          <br />
          <strong>Email: </strong>
          <span>{user.email}</span>
          <br />
          <br />
          <strong>Contact: </strong>
          <span>{user.contact}</span>
          <br />
          <br />
          <strong>Designation: </strong>
          <span>{user.designation}</span>
          <br />
          <br />
          <strong>Company: </strong>
          <span>{user.company}</span>
          <br />
          <br />
          <strong>Location: </strong>
          <span>{user.location}</span>
          <br />
          <br />
          <strong>Pass Year: </strong>
          <span>{user.pass_year}</span>
          <br />
          <br />
          <strong>Linkdin: </strong>
          <span>{user.linkdin}</span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default View;
