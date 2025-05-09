import React, { useContext } from 'react'
import { Context } from '../context/store'
import { Navigate, useLoaderData, useLocation } from 'react-router-dom'

function Contact() {
  
    const {loggedInUser,navigate} = useContext(Context)
    console.log(loggedInUser)
    const location = useLocation();
    if (loggedInUser === undefined) return <p>Loading...</p>;
    if(!loggedInUser){
        return <Navigate to="/login" state={{ from: location }} replace />
    }
  return (
    <div>
      <h1>contact</h1>
    </div>
  )
}

export default Contact
